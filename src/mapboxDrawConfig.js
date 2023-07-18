import MapboxDraw from "@mapbox/mapbox-gl-draw";

import {
  SnapLineMode,
  SnapModeDrawStyles,
  SnapPointMode,
  SnapPolygonMode,
} from "mapbox-gl-draw-snap-mode";

export const mapboxDrawConfig = {
  modes: {
    ...MapboxDraw.modes,
    draw_point: SnapPointMode,
    draw_polygon: SnapPolygonMode,
    draw_line_string: SnapLineMode,
  },
  // Styling guides
  styles: SnapModeDrawStyles,
  userProperties: true,
  // Config snapping features
  snap: true,
  snapOptions: {
    snapPx: 15, // defaults to 15
    snapToMidPoints: true, // defaults to false
    snapVertexPriorityDistance: 0.0025, // defaults to 1.25
  },
  guides: false,
};
