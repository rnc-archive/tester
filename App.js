import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import exampleList from './exampleList';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const examples = exampleList();

function HomeScreen({navigation}) {
  return (
    <ScrollView>
      {examples.map(({name, version}) => (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate(name)}>
            <Text>Package: {name}</Text>
            <Text>Version: {version}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const AppNavigator = createStackNavigator(
  examples.reduce(
    (acc, {name, screen}) => {
      console.log({screen});
      acc[name] = {
        screen: screen.default,
      };
      return acc;
    },
    {
      Home: {
        screen: HomeScreen,
      },
    },
  ),
);

const App = createAppContainer(AppNavigator);

export default App;
