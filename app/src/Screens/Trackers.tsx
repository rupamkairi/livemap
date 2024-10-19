import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card} from 'react-native-paper';
import AgentsSwitch from '../components/Agents/AgentSwitch';
import CurrentLocation from '../components/LocationsComponents/CurrentLocation';
import LibBackgroundActions from '../components/LocationsComponents/LibBackgroundActions';
import WatchLocation from '../components/LocationsComponents/WatchLocation';
import BackgroundActionsManager from '../components/LocationsComponents/BackgroundActionsManager';
import Break from '../components/UI/Break';

export default function TrackersScreen() {
  return (
    <ScrollView>
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
          <Card.Title title="Agent Switch" subtitle="" />
          <Card.Content>
            <AgentsSwitch />
          </Card.Content>
        </Card>
        <Card>
          <Card.Title
            title="Watch Location (as Location changes)."
            subtitle=""
          />
          <Card.Content>
            <WatchLocation />
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="Background Action" subtitle="" />
          <Card.Content>
            <LibBackgroundActions />
            <Break />
            <BackgroundActionsManager />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}
