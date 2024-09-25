import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import UpdateOfficeFence from '../components/Offices/UpdateOfficeFence';

export default function OfficesScreen() {
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
        <Card.Title title="Office Fences" subtitle="" />
        <Card.Content>
          <UpdateOfficeFence />
        </Card.Content>
      </Card>
    </View>
  );
}
