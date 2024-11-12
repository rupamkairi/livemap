import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import Screen from './Screens/Screen';
import {SocketConnector} from './utils/socket-connector';

const Tab = createBottomTabNavigator();

export default function SingleAppRouter() {
  useEffect(() => {
    const active = SocketConnector.socket.active;
    if (!active) return;

    // (async () => {
    //   const _agentId = await AsyncStorage.getItem('agentId');
    //   const _trackAgentId = await AsyncStorage.getItem('trackAgentId');
    //   store.dispatch(agentSlice.actions.setAgentId(_agentId));
    //   store.dispatch(agentSlice.actions.setTrackAgentId(_trackAgentId));
    //   SocketConnector.createRoom();
    // })();

    // SocketConnector.joinRoom();
  }, []);

  return (
    <Tab.Navigator initialRouteName="App">
      <Tab.Screen name="App" component={Screen} />
    </Tab.Navigator>
    // <>
    //   {/* <LocationsRouter /> */}
    // </>
  );
}
