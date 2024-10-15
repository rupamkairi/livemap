import Geolocation from '@react-native-community/geolocation';
import {store} from '../stores';
import {setWatchId} from '../stores/agent.slice';
import {trackingSlice} from '../stores/tracking.slice';
import {postTrackingPosition} from './api-calls';

export function startWatch() {
  try {
    Geolocation.requestAuthorization(
      () => {},
      error => {
        console.log('Error while requesting', error);
      },
    );

    const watchId = Geolocation.watchPosition(
      async position => {
        console.log('Watch Position updated.');

        const _position = {
          timestamp: position.timestamp,
          ...position.coords,
        };
        store.dispatch(
          trackingSlice.actions.appendPositions({position: _position}),
        );

        await postTrackingPosition(position);
      },
      error => console.log('watchPosition Error', error),
    );

    console.log({watchId});
    store.dispatch(setWatchId(watchId));
  } catch (error) {
    console.log('startWatch', error);
  }
}

export function stopWatch() {
  if (!store.getState().agent.watchId) return;

  Geolocation.clearWatch(store.getState().agent.watchId! as number);
  store.dispatch(setWatchId(null));
}
