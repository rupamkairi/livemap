import Geolocation from '@react-native-community/geolocation';

export function startWatch() {
  try {
    Geolocation.requestAuthorization(
      () => {},
      error => {
        console.log('Error while requesting', error);
      },
    );

    const watchID = Geolocation.watchPosition(
      async position => {
        console.log('Watch Position updated.');
      },
      error => console.log('watchPosition Error', error),
    );
  } catch (error) {
    console.log('startWatch', error);
  }
}

export function stopWatch() {
  subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
  setSubscriptionId(null);
}
