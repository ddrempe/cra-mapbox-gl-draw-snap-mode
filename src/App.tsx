import { useMemo, useRef } from "react";

import MapboxDraw, {
  DrawCreateEvent,
  DrawUpdateEvent,
} from "@mapbox/mapbox-gl-draw";
import maplibregl from "maplibre-gl";
import Map, { MapRef } from "react-map-gl";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";

export default function App() {
  const mapRef = useRef<MapRef>(null);

  const mapboxDraw = useMemo(() => new MapboxDraw(), []);

  const handleOnDrawControlCreate = (event: DrawCreateEvent) => {
    console.log(event);
  };

  const handleOnDrawControlUpdate = (event: DrawUpdateEvent) => {
    console.log(event);
  };

  return (
    <Map
      ref={mapRef}
      style={{ height: "100vh" }}
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=LiH20XNxcFiTXyT4fgjM"
      onLoad={() => {
        mapRef.current?.addControl(mapboxDraw);
        const map = mapRef.current?.getMap();
        if (map) {
          map.on("draw.create", handleOnDrawControlCreate);
          map.on("draw.update", handleOnDrawControlUpdate);
        }
      }}
    />
  );
}
