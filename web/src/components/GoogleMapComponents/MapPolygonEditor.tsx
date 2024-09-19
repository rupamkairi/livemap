import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MapPolygonEditor() {
  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "50vh" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
}
