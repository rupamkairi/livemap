import {differenceInMilliseconds, endOfMinute} from 'date-fns';
import React from 'react';
import {View} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import {Button, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {backgroundStates} from '../../stores/background-states';
import {taskBackgroundAction} from './background-actions-manager';

function calculateEndOfMinute() {
  const now = new Date();
  const distance = differenceInMilliseconds(endOfMinute(now), now);
  console.log(distance);
}

export default function BackgroundActionsManager() {
  const options = useSelector(
    backgroundStates.selectors.selectBackgroundActionOptions,
  );

  return (
    <View>
      <Text>Background Actions Manager</Text>

      <Button
        onPress={() => {
          let playing = BackgroundService.isRunning();
          if (!playing) {
            try {
              // options.parameters.delay = 5000;
              BackgroundService.start(taskBackgroundAction, options);
            } catch (error) {}
          } else {
            BackgroundService.stop();
          }
          playing = !playing;
        }}>
        Toggle Basic Default (1m)
      </Button>

      <Button onPress={() => {}}>Emit</Button>
      <Button
        onPress={() => {
          console.log(BackgroundService.isRunning());
          console.log(BackgroundService.eventNames());
        }}>
        Is Running
      </Button>
      <Button
        onPress={() => {
          calculateEndOfMinute();
        }}>
        Distance
      </Button>
    </View>
  );
}
