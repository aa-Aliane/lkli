import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { geoJSON } from "leaflet";

const MapComponent = ({ data }: any) => {
  const map = useMap();
  const geoJsonLayer = geoJSON(data);

  return (
    <div className="map">
      <MapContainer
        center={[0, 0]}
        zoom={0}
        style={{ width: "100%", height: "100vh" }}
        whenReady={() => {
          geoJsonLayer.addTo(map);
        }}
      >
        <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
