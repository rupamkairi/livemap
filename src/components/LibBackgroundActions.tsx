import Geolocation from '@react-native-community/geolocation';
import {Button, Linking, Platform, View} from 'react-native';
import BackgroundJob from 'react-native-background-actions';

const sleep = (time: any) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), time));

const taskRandom = async (taskData: any) => {
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
    );
  }
  await new Promise(async () => {
    // For loop with a delay
    const {delay} = taskData;
    console.log(BackgroundJob.isRunning(), delay);
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      console.log('Ran -> ', i);
      Geolocation.getCurrentPosition(async position => {
        console.log('getCurrentPosition', position);
        const pos = position.coords.latitude + ', ' + position.coords.longitude;
        await BackgroundJob.updateNotification({
          taskDesc: 'Ran -> ' + i + ' : ' + pos,
        });
      });
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 5000,
  },
};

function handleOpenURL(evt: any) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

export default function LibBackgroundActions() {
  let playing = BackgroundJob.isRunning();
  const toggleBackground = async () => {
    playing = !playing;
    if (playing) {
      try {
        console.log('Trying to start background service');
        await BackgroundJob.start(taskRandom, options);
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundJob.stop();
    }
  };

  return (
    <View>
      <Button title="Toggle Background Job" onPress={toggleBackground}></Button>
    </View>
  );
}
