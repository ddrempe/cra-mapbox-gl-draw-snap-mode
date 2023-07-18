import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { MapRef } from "react-map-gl";
import "./index.css";

import { useRef } from "react";

export default function App() {
  const mapRef = useRef<MapRef>(null);

  return (
    <Map
      ref={mapRef}
      style={{ height: "100vh" }}
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=LiH20XNxcFiTXyT4fgjM"
    />
  );
}
