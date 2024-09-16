import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BackgroundJob from 'react-native-background-actions';
import {emulatorPolygon} from '../GoogleMaps/LibGoogleMap';
import {calculatePointInsidePolygon} from '../GoogleMaps/useCalculatePolygon';

const ACTION_DELAY_DEFAULT = 5000;

const sleep = (time: any) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), time));

const taskBackgroundLocation = async (taskData: any) => {
  await new Promise(async () => {
    const {delay} = taskData;
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      Geolocation.getCurrentPosition(async position => {
        const pos = position.coords.latitude + ', ' + position.coords.longitude;

        let res = calculatePointInsidePolygon(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          emulatorPolygon,
        )
          ? 'Inside'
          : 'Outside';

        const description = `Ran ${i}, Position ${pos}, Result ${res}`;
        console.log(description);
        await BackgroundJob.updateNotification({taskDesc: description});
      });
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Background Location Action',
  taskTitle: 'Background Location',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: ACTION_DELAY_DEFAULT,
  },
};

function handleOpenURL(evt: any) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

export default function LibBackgroundActions() {
  const [actionDelay, setActionDelay] = useState(ACTION_DELAY_DEFAULT);

  let playing = BackgroundJob.isRunning();
  const toggleBackground = async () => {
    playing = !playing;
    if (playing) {
      try {
        options.parameters.delay = actionDelay;
        await BackgroundJob.start(taskBackgroundLocation, options);
        Alert.alert(
          `Starting ${options.taskTitle}.`,
          `Action delay set to ${actionDelay / 1000} seconds`,
        );
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      Alert.alert(`Stopping ${options.taskTitle}.`);
      console.log('Stop background service');
      await BackgroundJob.stop();
    }
  };

  return (
    <View>
      <Text style={{fontSize: 16}}>Background Action (in seconds)</Text>
      <View style={component.settingsItem}>
        <Text>Action delay in seconds (min. 5)</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="in seconds"
          value={(actionDelay / 1000).toString()}
          onChangeText={text => {
            if (text === '') {
              text = '5';
            } else if (isNaN(+text)) {
              text = '5';
            } else {
              text = +text < 5 ? '5' : text;
            }

            setActionDelay(+text * 1000);
          }}
          style={component.settingsItemInput}
        />
      </View>
      <View>
        <Button
          title="Toggle Background Job"
          onPress={toggleBackground}></Button>
      </View>
      <Text style={{color: 'red'}}>
        ** If it is running minimise the app & you should see a Sticky
        Notification.
      </Text>
      <PlatformWarning />
    </View>
  );
}

function PlatformWarning() {
  if (Platform.OS === 'ios') {
    return (
      <Text style={{color: 'red'}}>
        ** This task will not keep your app alive in the background by itself,
        use other library like react-native-track-player that use audio,
        geolocalization, etc. to keep your app alive in the background while you
        excute the JS from this library.
      </Text>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <Text style={{color: 'orange'}}>
        ** Make sure to Enable the Background Location Permission from the "App
        Info", then "Permissions", then "Location", then select "All the time".
      </Text>
    );
  }

  return null;
}

const component = StyleSheet.create({
  settingsItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 8,
  },
  settingsItemInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
});
