/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import './src/gesture-handler';
import SingleAppRouter from './src/SingleAppRouter';
import {store} from './src/stores';
import {RegisterAppStateChange} from './src/utils/AppState';

RegisterAppStateChange();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AppRouter /> */}
        <SingleAppRouter />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
