import React from 'react';
// import LocationsRouter from './components/LocationsRouter';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {testApi} from './api-utils';
import OfficesScreen from './Screens/Offices';
import TrackersScreen from './Screens/Trackers';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AgentsScreen from './Screens/Agents';

const Tab = createBottomTabNavigator();

export default function AppRouter() {
  // useEffect(() => {
  //   testApi();
  // }, []);

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
