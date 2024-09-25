import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getAgentPositions} from '../../api-utils';
import MapPositionTimeline from '../../components/GoogleMaps/MapPositionTimeline';

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

  return (
    <View>
      <View>
        <MapPositionTimeline positions={positions} />
      </View>
    </View>
  );
}
