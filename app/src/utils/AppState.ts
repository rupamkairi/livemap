import {AppState} from 'react-native';
import {
  stopGeoLocationWatch,
  toggleGeoLocationWatch,
} from './geoloaction-watch';
import {
  stopBackgroundAction,
  toggleBackgroundAction,
} from './background-action';

export function RegisterAppStateChange() {
  AppState.addEventListener('change', state => {
    console.log('AppState Change', state);

    if (state === 'active') {
      console.log('Active');
      stopBackgroundAction();
      toggleGeoLocationWatch();
    } else if (state === 'background' || state === 'inactive') {
      console.log('Background');
      stopGeoLocationWatch();
      toggleBackgroundAction();
    }
  });
}
