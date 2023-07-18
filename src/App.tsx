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
import { mapboxDrawConfig } from "./mapboxDrawConfig";

export default function App() {
  class extendDrawBarCheckboxes {
    checkboxes: any;
    onRemoveOrig: any;
    map: any;
    _container: HTMLDivElement | undefined;
    elContainer: any;
    constructor(opt: any) {
      let ctrl = this;
      ctrl.checkboxes = opt.checkboxes || [];
      ctrl.onRemoveOrig = opt.draw.onRemove;
    }
    onAdd(map: any) {
      let ctrl = this;
      ctrl.map = map;
      ctrl._container = document.createElement("div");
      ctrl._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
      ctrl.elContainer = ctrl._container;
      ctrl.checkboxes.forEach((b: any) => {
        ctrl.addCheckbox(b);
      });
      return ctrl._container;
    }
    onRemove(map: any) {
      let ctrl = this;
      ctrl.checkboxes.forEach((b: any) => {
        ctrl.removeButton(b);
      });
      ctrl.onRemoveOrig(map);
    }
    addCheckbox(opt: any) {
      let ctrl = this;
      const elCheckbox = document.createElement("input");
      elCheckbox.setAttribute("type", "checkbox");
      elCheckbox.setAttribute("title", opt.title);
      elCheckbox.checked = opt.initialState === "checked";
      elCheckbox.className = "mapbox-gl-draw_ctrl-draw-btn";
      if (opt.classes instanceof Array) {
        opt.classes.forEach((c: any) => {
          elCheckbox.classList.add(c);
        });
      }
      elCheckbox.addEventListener(opt.on, opt.action);
      ctrl.elContainer.appendChild(elCheckbox);
      opt.elCheckbox = elCheckbox;
    }
    removeButton(opt: any) {
      opt.elCheckbox.removeEventListener(opt.on, opt.action);
      opt.elCheckbox.remove();
    }
  }

  const mapRef = useRef<MapRef>(null);

  const mapboxDraw = useMemo(() => new MapboxDraw(mapboxDrawConfig), []);
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
        const SnapOptionsBar = new extendDrawBarCheckboxes({
          draw: mapboxDraw,
          checkboxes: [
            {
              on: "change",
              action: (e: any) => {
                // @ts-ignore
                mapboxDraw.options.snap = e.target.checked;
              },
              classes: ["snap_mode", "snap"],
              title: "Snap when Draw",
              initialState: "checked",
            },
            {
              on: "change",
              action: (e: any) => {
                // @ts-ignore
                mapboxDraw.options.guides = e.target.checked;
              },
              classes: ["snap_mode", "grid"],
              title: "Show Guides",
            },
          ],
        });

        mapRef.current?.addControl(mapboxDraw);
        mapRef.current?.addControl(SnapOptionsBar);

        const map = mapRef.current?.getMap();
        if (map) {
          map.on("draw.create", handleOnDrawControlCreate);
          map.on("draw.update", handleOnDrawControlUpdate);
        }
      }}
    />
  );
}
