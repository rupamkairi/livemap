import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import CurrentLocation from '../components/LocationsComponents/CurrentLocation';
import WatchLocation from '../components/LocationsComponents/WatchLocation';
import LibBackgroundActions from '../components/LocationsComponents/LibBackgroundActions';

export default function TrackersScreen() {
  return (
    <View
      style={{
        paddingTop: 8,
        paddingHorizontal: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
      <Card>
        <Card.Title title="Current Location" subtitle="" />
        <Card.Content>
          <CurrentLocation />
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="Watch Location (as Location changes)." subtitle="" />
        <Card.Content>
          <WatchLocation />
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="Background Action" subtitle="" />
        <Card.Content>
          <LibBackgroundActions />
        </Card.Content>
      </Card>
    </View>
  );
}
