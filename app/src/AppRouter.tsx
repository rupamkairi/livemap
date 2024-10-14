import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AgentsScreen from './Screens/Agents';
import OfficesScreen from './Screens/Offices';
import TrackersScreen from './Screens/Trackers';
import {SocketConnector} from './utils/socket-connector';

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  useEffect(() => {
    console.log('AppRouter');
    const active = SocketConnector.socket.active;
    console.log({active});
    if (!active) return;

    // SocketConnector.createRoom();
    SocketConnector.joinRoom();
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
