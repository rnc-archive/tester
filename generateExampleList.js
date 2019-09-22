const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const exampleListFile = fs.readFileSync('./exampleList.js', 'utf-8');

const getExampleFilePath = name => {
  return path.join(__dirname, 'node_modules', name, 'example/App');
};

const exampleExists = Object.entries(packageJson.dependencies).filter(
  ([key, value]) =>
    ['ts', 'tsx', 'js', 'jsx']
      .map(ext =>
        path.join(__dirname, 'node_modules', key, `example/App.${ext}`),
      )
      .map(path => fs.existsSync(path))
      .some(found => found),
);

const exampleConfigs = exampleExists.map(([name]) => {
  const libPackageJson = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'node_modules', name, 'package.json'),
      'utf-8',
    ),
  );

  return `{
      name: '${name}',
      version: '${libPackageJson.version}',
      screen: require('${getExampleFilePath(name)}'),
    }`;
});

const template = `//GENERATED
    ${exampleConfigs.join(',')},
    //END_GENERATED`;

const result = exampleListFile.replace(
  /\/\/GENERATED.*END_GENERATED/gms,
  template,
);

fs.writeFileSync('./exampleList.js', result);
