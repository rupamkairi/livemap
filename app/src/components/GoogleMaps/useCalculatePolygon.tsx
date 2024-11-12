import AsyncStorage from '@react-native-async-storage/async-storage';

type LatLng = {
  latitude: number;
  longitude: number;
};

export function calculatePointInsidePolygon(point: LatLng, polygon: LatLng[]) {
  let x = point.latitude;
  let y = point.longitude;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xLat = polygon[i].latitude;
    let yLat = polygon[i].longitude;
    let xLon = polygon[j].latitude;
    let yLon = polygon[j].longitude;

    let intersect =
      yLat > y !== yLon > y &&
      x < ((xLon - xLat) * (y - yLat)) / (yLon - yLat) + xLat;
    if (intersect) inside = !inside;
  }

  return inside;
}

export async function setLastPosition(position) {
  if (position.coords) {
    await AsyncStorage.setItem(
      'lastPosition',
      JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    );
  }
}

export async function getLastPosition() {
  const data = await AsyncStorage.getItem('lastPosition');
  if (!data) return null;
  return JSON.parse(data);
}

export function distanceCoordinates(prev, curr) {
  const lon1 = (prev.longitude * Math.PI) / 180;
  const lon2 = (curr.longitude * Math.PI) / 180;
  const lat1 = (prev.latitude * Math.PI) / 180;
  const lat2 = (curr.latitude * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Earth radii in meters
  let r = 6371000;

  const d = c * r;
  console.log('Distance is', d, 'm');
  return d;
}

export async function taskPosition(position) {
  try {
    const prev = await getLastPosition();
    if (!prev) {
      await setLastPosition(position);
    }
    // console.log(prev);
    const curr = position.coords;
    const distance = distanceCoordinates(prev, curr);
    if (distance > 5) {
      console.log('substantial movement');
      await setLastPosition(position);
    } else {
      console.log('No substantial movement');
    }
  } catch (error) {
    console.log('distance error', error);
  }
}
