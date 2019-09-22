const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');

const exampleListFile = fs.readFileSync('./exampleList.js', 'utf-8');

const getExampleFilePath = name => {
  return path.join(__dirname, 'node_modules', name, 'example/App.js');
};

const exampleExists = Object.entries(packageJson.dependencies).filter(
  ([key, value]) => {
    return fs.existsSync(getExampleFilePath(key));
  },
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
      screen: require('${getExampleFilePath(name)}')
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
