import {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

export default function LibBackgroundGeolocation() {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState('');

  BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM,
    distanceFilter: 10,
    stopTimeout: 5,
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
    startOnBoot: true, // <-- Auto start tracking when device is powered-up.
    // HTTP / SQLite config
    url: 'http://yourserver.com/locations',
    batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
    autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
    headers: {
      'X-FOO': 'bar',
    },
    params: {
      auth_token: 'maybe_your_server_authenticates_via_token_YES?',
    },
  })
    .then(state => {
      setEnabled(state.enabled);
      console.log(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
    })
    .catch(error => {
      console.log('- BackgroundGeolocation is errored', error);
    });

  useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation('');
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    console.log('Background Enabled');

    return () => {};
  }, [enabled]);

  return (
    <View style={{alignItems: 'center'}}>
      <Text>Click to enable BackgroundGeolocation</Text>
      <Switch value={enabled} onValueChange={setEnabled} />
      <Text style={{fontFamily: 'monospace', fontSize: 12}}>{location}</Text>
    </View>
  );
}
