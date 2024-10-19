import BackgroundService from 'react-native-background-actions';
import {store} from '../../stores';
import {backgroundStates} from '../../stores/background-states';

async function sleep(time: any) {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      resolve();
    }, time),
  );
}

async function taskManager() {
  console.log('taskManager');
  // setRandomDelay();
}

// function setRandomDelay() {
//   const random = Math.ceil(Math.random() * 10);
//   console.log(`Next run after ${random} seconds.`);
//   const options = store.getState().backgroundStates.backgroundActionOptions;
//   options.parameters.delay = random * 1000;
//   store.dispatch(backgroundStates.actions.setBackgroundActionOptions(options));
// }

export async function taskBackgroundAction(taskData: any) {
  console.log(taskData);
  await new Promise(async () => {
    for (let i = 0; BackgroundService.isRunning; i++) {
      taskManager();
      const options = store.getState().backgroundStates.backgroundActionOptions;
      console.log(
        `Background Task ${i} at ${new Date().toLocaleTimeString()}, next after ${
          options.parameters.delay
        }.`,
      );
      await sleep(options.parameters.delay);
    }
  });
}
