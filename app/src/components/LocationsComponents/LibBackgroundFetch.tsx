import {View} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

const events = [
  {
    taskId: 'com.foo.customtask',
    isHeadless: true,
    timestamp: '',
  },
];

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed),
    stopOnTerminate: false,
    enableHeadless: true,
    startOnBoot: true,
  },
  async taskId => {
    console.log(`onEvent taskId: ${taskId}`);
    BackgroundFetch.finish(taskId);
  },
  async taskId => {
    console.log(`onTimeout taskId: ${taskId}`);
    BackgroundFetch.finish(taskId);
  },
);

BackgroundFetch.scheduleTask({
  taskId: 'customtask',
  delay: 5000,
  periodic: true,
  stopOnTerminate: false,
});

export default function LibBackgroundFetch() {
  // console.log('LibBackgroundFetch');
  return <View></View>;
}
