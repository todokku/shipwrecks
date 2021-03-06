import React from "react";
import { Ship } from "../models/";
import ShipwreckControls from "./ShipwreckControls";

interface Props {
  ship: Ship | undefined;
}

const getWikipediaUrl = (ship: Ship | undefined) => {
  if (!ship) {
    return undefined;
  }

  const wikipediaPage = ship.name.replace(/ /g, "_");
  return `https://en.wikipedia.org/wiki/${wikipediaPage}?printable=yes`;
};

const ShipwreckDetails: React.FC<Props> = ({ ship }) => {
  return (
    <div className="mainContent" style={{ display: ship ? "block" : "none" }}>
      {ship && <ShipwreckControls ship={ship} />}
      <iframe id="wikipediaFrame" frameBorder="0" src={getWikipediaUrl(ship)} />
    </div>
  );
};

export default ShipwreckDetails;
