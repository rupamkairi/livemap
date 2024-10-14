import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getAgentPositions} from '../../utils/api-calls';
import MapPositionTimeline from '../../components/GoogleMaps/MapPositionTimeline';
import Geolocation from '@react-native-community/geolocation';

export default function AgentTimeline() {
  const [positions, setPositions] = useState();

  useEffect(() => {
    (async () => {
      const data = await getAgentPositions();
      if (!data?.length) {
        return;
      }

      // console.log(JSON.stringify(data, null, 2));
      const _positions = data.map(el => ({
        timestamp: el.timestamp,
        ...el.meta.position.coords,
      }));

      setPositions(_positions);
    })();
  }, []);

  useEffect(() => {
    if (!positions) return;

    // rather than using the API, we can use the Geolocation.watchPosition
    const watchID = Geolocation.watchPosition(
      async position => {
        console.log('Watch Position updated. (on Agent Page)');
        const _position = {
          timestamp: position.timestamp,
          ...position.coords,
        };
        // console.log(positions[0], _position);
        setPositions([...positions, _position]);
      },
      error => console.log('watchPosition Error', error),
    );

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [positions]);

  return (
    <View>
      <View>
        <MapPositionTimeline positions={positions} />
      </View>
    </View>
  );
}
