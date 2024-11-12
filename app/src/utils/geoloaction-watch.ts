import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {taskPosition} from '../components/GoogleMaps/useCalculatePolygon';
// import {store} from '../stores';
// import {setWatchId} from '../stores/agent.slice';
// import {trackingSlice} from '../stores/tracking.slice';
// import {postTrackingPosition} from './api-calls';

export let watchId: number;

async function task({position}) {
  let _watchId = await AsyncStorage.getItem('watchId');
  console.log('GeoLocation Watch', _watchId);

  await taskPosition(position);
}

export async function startGeoLocationWatch() {
  console.log('startWatch');

  try {
    Geolocation.requestAuthorization(
      () => {},
      error => {
        console.log('Error while requesting', error);
      },
    );

    let _watchId = await AsyncStorage.getItem('watchId');
    Geolocation.clearWatch(+_watchId! as number);

    watchId = Geolocation.watchPosition(
      async position => {
        task({position});

        // const _position = {
        //   timestamp: position.timestamp,
        //   ...position.coords,
        // };
        // store.dispatch(
        //   trackingSlice.actions.appendPositions({position: _position}),
        // );

        // await postTrackingPosition(position);
      },
      error => console.log('watchPosition Error', error),
    );

    await AsyncStorage.setItem('watchId', watchId.toString());
    // console.log({watchId});
    // store.dispatch(setWatchId(watchId));
  } catch (error) {
    console.log('startWatch', error);
  }
}

export async function stopGeoLocationWatch() {
  console.log('stopWatch');

  let _watchId = await AsyncStorage.getItem('watchId');
  Geolocation.clearWatch(+_watchId! as number);
  await AsyncStorage.removeItem('watchId');

  // if (!store.getState().agent.watchId) return;
  // Geolocation.clearWatch(store.getState().agent.watchId! as number);
  // store.dispatch(setWatchId(null));
}

export async function toggleGeoLocationWatch() {
  try {
    let _watchId = await AsyncStorage.getItem('watchId');
    console.log({_watchId});
    if (!_watchId) {
      startGeoLocationWatch();
    } else {
      stopGeoLocationWatch();
    }
  } catch (error) {
    console.log(error);
  }
}
