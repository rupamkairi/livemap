import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LibGoogleMap from '../components/GoogleMaps/LibGoogleMap';
import CurrentLocation from '../components/LocationsComponents/CurrentLocation';
import LibBackgroundActions from '../components/LocationsComponents/LibBackgroundActions';
import WatchLocation from '../components/LocationsComponents/WatchLocation';

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
