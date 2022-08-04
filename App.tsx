import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import Asteroid_Screen from './components/Asteroid_Screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name=" "
          component={HomeScreen}
          options={{headerStyle: {backgroundColor: '#4169e1'}}}
        />
        <Stack.Screen
          name="Asteroid_Screen"
          component={Asteroid_Screen}
          options={{headerStyle: {backgroundColor: '#4169e1'}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
