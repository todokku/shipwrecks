import React, { useEffect } from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { Ship } from "../models/";
import MemoMarker from "./MemoMarker";
const options = {
  imagePath: "images/markerclusterer/m",
  minimumClusterSize: 3,
};

interface Props {
  ships: Ship[];
}

const MapContent: React.FC<Props> = ({ ships }) => {
  return (
    <MarkerClusterer options={options}>
      {(clusterer: Clusterer) => (
        <Markers ships={ships} clusterer={clusterer} />
      )}
    </MarkerClusterer>
  );
};

const Markers = ({
  ships,
  clusterer,
}: {
  ships: Ship[];
  clusterer: Clusterer;
}) => {
  useEffect(() => {
    clusterer.repaint();
  });
  const defaultMarkerIcon = {
    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 5,
    strokeWeight: 1,
    fillColor: "white",
    fillOpacity: 1,
    labelOrigin: new google.maps.Point(0, 2),
  };
  const favouriteMarkerIcon = {
    ...defaultMarkerIcon,
    fillColor: "orange",
  };

  const onClick = ({ latLng: { lat, lng } }: google.maps.MouseEvent) => {
    const clickedShip = ships.find(
      (ship) => ship.latitude === lat() && ship.longitude === lng()
    );

    clickedShip.select();
  };

  const isLast = (index: number) => index === ships.length - 1;
  return (
    <>
      {ships.map((ship, index) => {
        const icon = ship.favorite ? favouriteMarkerIcon : defaultMarkerIcon;

        return (
          <MemoMarker
            key={ship.name}
            name={ship.name}
            position={{ lat: ship.latitude, lng: ship.longitude }}
            clusterer={clusterer}
            icon={icon}
            noClustererRedraw={!isLast(index)}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};

export default MapContent;
