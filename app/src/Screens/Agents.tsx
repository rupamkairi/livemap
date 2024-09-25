import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import AgentTimeline from '../components/Agents/AgentTimeline';

export default function AgentsScreen() {
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
        <Card.Title title="Agent Timeline" subtitle="" />
        <Card.Content>
          <AgentTimeline />
        </Card.Content>
      </Card>
    </View>
  );
}
