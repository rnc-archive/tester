# React Native tester

The purpose of this tester app is to facilitate testing of React Native libraries within a single easy to upgrade tester app. The examples for each of the libraries come out of the library repositories and are automatically parsed by the tester app. A simple menu is used to list all the included libraries and on select will navigate to the library example page.

## How to include your library

Typically install your library as a Github dependency, because most libraries do not include example code in the published bundle. ```yarn add your-lib@org/package#tag-or-branch```. If your library requires additional steps pre-publish before it would be usable to a consuming app, run those manually.

Each dependency that has an App.js under `node_modules/<package>/example/App.js` will be included as a menu item. Autolinking is used to include the native code in the tester app. The example code is included based on the availability of the App.ts example entry file. Any native modifications to make the library function, such as permissions, need to be added to the tester app.

### Types

This app assumes the example code has no types and is in plain javascript that would work in a barebones `react-native init` app. The idea is that no type system is required by consumers and corresponding examples should not assume a type system is used by a library consumer.

## How to use to test your library

The main purpose of this tester app is to quickly check if a library works against current and past versions of RN. This library will be upgraded with new RN release candidates coming out and every old version will be tagged, allowing you to set this example app to an older version easily by checking out the older tag.

Your libraries version can be easily controlled by setting the Github dependency to a specific library version tag or branch.

The combination of the two above methods allows you to easily test across the compatibility matrix between React Native and your library.

## Internals

This app retrieves the example code by checking for the App.js file under example and using a local script to generate the content of the examples list in `exampleList.js`. This steps happens in post install on `yarn` or `npm i`.
