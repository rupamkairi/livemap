/* eslint-disable complexity */
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { GoogleMapsContext, useMapsLibrary } from "@vis.gl/react-google-maps";

import type { Ref } from "react";

type PolygonEventProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onDrag?: (e: google.maps.MapMouseEvent) => void;
  onDragStart?: (e: google.maps.MapMouseEvent) => void;
  onDragEnd?: (e: google.maps.MapMouseEvent) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
};

type PolygonCustomProps = {
  encodedPaths?: string[];
  paths: google.maps.LatLngLiteral[][] | google.maps.LatLng[] | any[];
};

export type PolygonProps = google.maps.PolygonOptions &
  PolygonEventProps &
  PolygonCustomProps;

export type PolygonRef = Ref<google.maps.Polygon | null>;

function usePolygon(props: PolygonProps) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    encodedPaths,
    paths,
    ...polygonOptions
  } = props;
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const geometryLibrary = useMapsLibrary("geometry");

  const polygon = useRef(new google.maps.Polygon()).current;
  useMemo(() => {
    polygon.setOptions(polygonOptions);
  }, [polygon, polygonOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // update the path with the encodedPath
  useMemo(() => {
    // console.log("how is encodedPaths", encodedPaths);
    // if (!encodedPaths || !geometryLibrary) return;
    // const paths = encodedPaths.map((path) => {
    //   // console.log("how is path", path);
    //   const latlng = geometryLibrary.encoding.decodePath(path);
    //   console.log(latlng);
    //   return latlng;
    // });

    polygon.setPaths(paths);
  }, [polygon, paths, encodedPaths, geometryLibrary]);

  useEffect(() => {
    if (!map) {
      if (map === undefined)
        console.error("<Polygon> has to be inside a Map component.");

      return;
    }

    polygon.setMap(map);

    return () => {
      polygon.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (!polygon) return;

    const gme = google.maps.event;
    [
      ["click", "onClick"],
      ["drag", "onDrag"],
      ["dragstart", "onDragStart"],
      ["dragend", "onDragEnd"],
      ["mouseover", "onMouseOver"],
      ["mouseout", "onMouseOut"],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polygon, eventName, (e: google.maps.MapMouseEvent) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polygon);
    };
  }, [polygon]);

  return polygon;
}

export const Polygon = forwardRef((props: PolygonProps, ref: PolygonRef) => {
  const polygon = usePolygon(props);

  useImperativeHandle(ref, () => polygon, []);

  return null;
});
