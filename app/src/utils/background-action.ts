import Geolocation from '@react-native-community/geolocation';
import BackgroundService from 'react-native-background-actions';
import {taskPosition} from '../components/GoogleMaps/useCalculatePolygon';

export const BASIC_DEFAULT_OPTIONS = {
  taskName: 'Background Action',
  taskTitle: 'Background Action Title',
  taskDesc: 'Background Action Description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ffffff',
  linkingURI: 'scheme://host/path',
  parameters: {
    delay: 1000 * 10,
  },
};

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: true,
  enableBackgroundLocationUpdates: true,
});

async function sleep(time: any) {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      resolve();
    }, time),
  );
}

async function task() {
  console.log('Background Action');

  Geolocation.getCurrentPosition(
    async position => {
      await taskPosition(position);
    },
    error => {
      console.log(error);
    },
  );
}

export async function taskBackgroundAction(taskData: any) {
  const {delay} = taskData;
  await new Promise(async () => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      task();
      await sleep(delay);
    }
  });
}

export async function stopBackgroundAction() {
  await BackgroundService.stop();
}

export async function toggleBackgroundAction() {
  try {
    let playing = BackgroundService.isRunning();
    if (!playing) {
      await BackgroundService.start(
        taskBackgroundAction,
        BASIC_DEFAULT_OPTIONS,
      );
    } else {
      await BackgroundService.stop();
    }
  } catch (error) {
    console.log(error);
  }
}
