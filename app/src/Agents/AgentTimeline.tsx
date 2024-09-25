import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getAgentPositions} from '../api-utils';
import MapPositionTimeline from '../components/GoogleMaps/MapPositionTimeline';

export default function AgentTimeline() {
  const [positions, setPositions] = useState();

  useEffect(() => {
    (async () => {
      const data = await getAgentPositions();
      if (!data?.length) return;

      const _positions = data.map(el => ({
        timestamp: el.timestamp,
        latitude: el.meta.position.coords.latitude,
        longitude: el.meta.position.coords.longitude,
        accuracy: el.meta.position.coords.accuracy,
      }));

      console.log(JSON.stringify(_positions, null, 2), 'get call ');
      setPositions(_positions);
    })();
  }, []);

  return (
    <View>
      <View>
        <MapPositionTimeline positions={positions} />
      </View>
    </View>
  );
}
