import React, { useEffect } from "react";
import { useRegionMutation } from "./region.queries";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Distance } from "../../../advanced/distance";

const position = { lat: 47.2380222, lng: 6.0243622 };

const Region = () => {
  const { data, mutate: getRegion, status } = useRegionMutation();

  useEffect(() => {
    getRegion(1);

    if (status === "error") {
      console.log(data);
    }
  }, []);

  return (
    <div className="map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <div className="distance-container">
        <Distance distance={0} handleChangeDistance={() => {}} />
      </div>
    </div>
  );
};

export default Region;
