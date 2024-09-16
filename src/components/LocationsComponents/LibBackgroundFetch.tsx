import {useEffect, useState} from 'react';
import {Alert, Button, ScrollView, Switch, Text, View} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import Event from '../../Event';

export default function LibBackgroundFetch() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState(-1);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    initBackgroundFetch();
    loadEvents();
  }, []);

  const initBackgroundFetch = async () => {
    const status: number = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      async (taskId: string) => {
        console.log('[BackgroundFetch] taskId', taskId);
        // Create an Event record.
        const event = await Event.create(taskId, false);
        // Update state.
        setEvents(prev => [...prev, event]);
        // Finish.
        BackgroundFetch.finish(taskId);
      },
      (taskId: string) => {
        // Oh No!  Our task took too long to complete and the OS has signalled
        // that this task must be finished immediately.
        console.log('[Fetch] TIMEOUT taskId:', taskId);
        BackgroundFetch.finish(taskId);
      },
    );
    setStatus(status);
    setEnabled(true);
  };

  const loadEvents = () => {
    Event?.all()
      ?.then((data: any) => {
        setEvents(data);
      })
      ?.catch((error: any) => {
        Alert.alert('Error', 'Failed to load data from AsyncStorage: ' + error);
      });
  };

  const onClickToggleEnabled = (value: boolean) => {
    setEnabled(value);

    if (value) {
      BackgroundFetch.start();
    } else {
      BackgroundFetch.stop();
    }
  };

  const onClickStatus = () => {
    BackgroundFetch.status().then((status: number) => {
      let statusConst = '';
      switch (status) {
        case BackgroundFetch.STATUS_AVAILABLE:
          statusConst = 'STATUS_AVAILABLE';
          break;
        case BackgroundFetch.STATUS_DENIED:
          statusConst = 'STATUS_DENIED';
          break;
        case BackgroundFetch.STATUS_RESTRICTED:
          statusConst = 'STATUS_RESTRICTED';
          break;
      }
      Alert.alert('BackgroundFetch.status()', `${statusConst} (${status})`);
    });
  };

  const onClickScheduleTask = () => {
    BackgroundFetch.scheduleTask({
      taskId: 'com.transistorsoft.customtask',
      delay: 5000,
      forceAlarmManager: true,
    })
      .then(() => {
        Alert.alert('scheduleTask', 'Scheduled task with delay: 5000ms');
      })
      .catch(error => {
        Alert.alert('scheduleTask ERROR', error);
      });
  };

  const onClickClear = () => {
    Event?.destroyAll();
    setEvents([]);
  };

  const renderEvents = () => {
    if (!events.length) {
      return <Text>Waiting for BackgroundFetch events...</Text>;
    }
    return events
      .slice()
      .reverse()
      .map(event => (
        <View key={event?.key}>
          <Text>TaskID {event?.taskId}</Text>
          <Text>Headless {event?.isHeadless ? '[Headless]' : ''}</Text>
          <Text>{event?.timestamp}</Text>
        </View>
      ));
  };

  return (
    <View>
      <View>
        <Text>BGFetch Demo</Text>
        <Switch value={enabled} onValueChange={onClickToggleEnabled} />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {renderEvents()}
      </ScrollView>
      <View>
        <Button title={'status: ' + status} onPress={onClickStatus} />
        <Button title="scheduleTask" onPress={onClickScheduleTask} />
        <Button title="clear" onPress={onClickClear} />
      </View>
    </View>
  );
}
