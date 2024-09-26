type LatLng = {
  latitude: number;
  longitude: number;
};

export function computePointInsidePolygon(point: LatLng, polygon: LatLng[]) {
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
