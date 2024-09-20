import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Polygon } from "./Polygon";

// googlebay
const google_center = { lat: 37.4220936, lng: -122.083922 };
// appleinfiniteloop
const apple_center = { lat: 37.33182, lng: -122.03118 };

const center = apple_center;

export default function MapPolygonEditor({
  polygon: propPolygon,
  onConfirmPolygon,
  onClear,
}: any) {
  const [polygon, setPolygon] = useState<{ lat: number; lng: number }[]>();

  // useEffect(() => {
  //   setPolygon(propPolygon);
  // }, [propPolygon]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
              <Map
                style={{ width: "100%", height: "50vh" }}
                // defaultCenter={{ lat: 37.4220936, lng: -122.083922 }}
                defaultCenter={center}
                defaultZoom={16}
                gestureHandling={"greedy"}
                disableDefaultUI={false}
                onClick={(event) => {
                  if (!polygon) setPolygon([event.detail.latLng!]);
                  else setPolygon([...polygon, event.detail.latLng!]);
                }}
              >
                <Marker position={google_center} />
                <Marker position={apple_center} />
                {/* {polygon?.map((point, key) => (
                  <Marker key={key} position={point} />
                ))} */}

                {polygon && (
                  <Polygon
                    zIndex={1}
                    paths={polygon}
                    onClick={(event) => {
                      if (!event.latLng) return;
                      const latlng = {
                        lat: event.latLng?.lat(),
                        lng: event.latLng?.lng(),
                      };
                      setPolygon([...polygon, latlng]);
                    }}
                  />
                )}

                {propPolygon && (
                  <Polygon
                    zIndex={2}
                    fillColor={"#00FF00"}
                    strokeColor={"#00FF00"}
                    paths={propPolygon}
                    onClick={(event) => {
                      // if (!event.latLng) return;
                      // const latlng = {
                      //   lat: event.latLng?.lat(),
                      //   lng: event.latLng?.lng(),
                      // };
                      // setPolygon([...polygon, latlng]);
                    }}
                  />
                )}

                {/* <MapControl position={ControlPosition.TOP_CENTER}>
                    <UndoRedoControl drawingManager={drawingManager} />
                  </MapControl> */}
              </Map>
            </APIProvider>
          </div>
          <div className="col-span-1 p-4">
            <p>{polygon?.length} Points Selected.</p>
            <br />
            <div className="card-actions justify-end">
              <button
                className="btn"
                onClick={() => {
                  setPolygon(undefined);
                  if (onClear) onClear();
                }}
              >
                Clear
              </button>
              <button
                className="btn"
                onClick={() => {
                  if (polygon) onConfirmPolygon(polygon);
                }}
              >
                Confirm Polygon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
