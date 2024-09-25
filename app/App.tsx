/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import AppRouter from './src/AppRouter';
import {NavigationContainer} from '@react-navigation/native';
import './src/gesture-handler';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}

export default App;
