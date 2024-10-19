/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';

AppRegistry.registerComponent(appName, () => App);

BackgroundFetch.registerHeadlessTask(async event => {
  console.log(
    '[BackgroundFetch HeadlessTask] Register',
    event.taskId,
    event.timeout,
  );
  if (event.timeout) {
    BackgroundFetch.finish(event.taskId);
    return;
  }

  await Event.create(event.taskId, true);
  BackgroundFetch.finish(event.taskId);
});
