import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LibGoogleMap from '../components/GoogleMaps/LibGoogleMap';
import CurrentLocation from '../components/LocationsComponents/CurrentLocation';
import LibBackgroundActions from '../components/LocationsComponents/LibBackgroundActions';
import WatchLocation from '../components/LocationsComponents/WatchLocation';
import UpdateOfficeFence from './Offices/UpdateOfficeFence';
import AgentTimeline from './Agents/AgentTimeline';

export default function LocationsRouter() {
  return (
    <ScrollView style={router.container}>
      <View style={router.card}>
        <CurrentLocation />
      </View>

      <View style={router.card}>
        <WatchLocation />
      </View>

      <View style={router.card}>
        <LibBackgroundActions />
      </View>

      <View style={router.card}>
        <View style={{minHeight: 360}}>
          <LibGoogleMap />
        </View>
      </View>

      <View style={router.card}>
        <UpdateOfficeFence />
      </View>

      <View style={router.card}>
        <AgentTimeline />
      </View>
    </ScrollView>
  );
}

const router = StyleSheet.create({
  container: {},
  card: {
    margin: 8,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
  },
});
