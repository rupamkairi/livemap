import {Button, Text} from 'react-native-paper';
import {toggleBackgroundAction} from '../../utils/background-action';
import {toggleGeoLocationWatch} from '../../utils/geoloaction-watch';

export default function SingleComponent() {
  return (
    <>
      <Text>App</Text>
      <Button
        onPress={() => {
          toggleGeoLocationWatch();
        }}>
        Use GeoLocationWatch
      </Button>
      <Button
        onPress={() => {
          toggleBackgroundAction();
        }}>
        Use BackgroundAction
      </Button>
    </>
  );
}
