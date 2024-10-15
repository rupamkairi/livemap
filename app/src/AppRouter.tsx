import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AgentsScreen from './Screens/Agents';
import OfficesScreen from './Screens/Offices';
import TrackersScreen from './Screens/Trackers';
import {SocketConnector} from './utils/socket-connector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from './stores';
import {agentSlice} from './stores/agent.slice';

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  useEffect(() => {
    const active = SocketConnector.socket.active;
    if (!active) return;

    (async () => {
      const _agentId = await AsyncStorage.getItem('agentId');
      const _trackAgentId = await AsyncStorage.getItem('trackAgentId');
      store.dispatch(agentSlice.actions.setAgentId(_agentId));
      store.dispatch(agentSlice.actions.setTrackAgentId(_trackAgentId));
      SocketConnector.createRoom();
    })();

    // SocketConnector.joinRoom();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Trackers">
      <Tab.Screen name="Trackers" component={TrackersScreen} />
      <Tab.Screen name="Agents" component={AgentsScreen} />
      <Tab.Screen name="Offices" component={OfficesScreen} />
    </Tab.Navigator>
    // <>
    //   {/* <LocationsRouter /> */}
    // </>
  );
}
