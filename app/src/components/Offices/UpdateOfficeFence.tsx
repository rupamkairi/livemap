import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import MapPolygonEditor from '../GoogleMaps/MapPolygonEditor';
import {useState} from 'react';
import {getOfficeFence, patchOfficeFence} from '../../api-utils';

export default function UpdateOfficeFence() {
  const [polygon, setPolygon] = useState();

  useEffect(() => {
    (async () => {
      const data = await getOfficeFence();
      setPolygon(data.polygon);
    })();
  }, []);

  return (
    <View>
      <View>
        <MapPolygonEditor
          polygon={polygon}
          onConfirm={value => {
            setPolygon(value);
          }}
        />
      </View>
      <Button
        title="Update"
        onPress={() => {
          console.log('Click');
          patchOfficeFence({polygon});
        }}
      />
    </View>
  );
}
