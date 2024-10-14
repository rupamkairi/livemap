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
import {Provider} from 'react-redux';
import {store} from './src/stores';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
