import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FastScreen from './src/Component/FastScreen';
import { Provider } from 'react-redux';
import { ConfigureStore } from './store';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={ConfigureStore()}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FastScreen" component={FastScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
// npm i redux react-redux redux-thunk