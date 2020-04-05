import React, { useState } from "react";
import { Ship } from "./Ship.types";
import favouriteStore from "./favouriteStore";
import MapLoader from "./map/MapLoader";
import ShipwreckDetails from "./shipwreckdetails/ShipwreckDetails";
import { NONE } from "./app";

interface Props {
  shipwrecks: Ship[];
  selectedShipwreckId: number;
  setSelectedShipwreckId: (id: number) => void;
}

const MainContent: React.FC<Props> = ({
  shipwrecks,
  selectedShipwreckId,
  setSelectedShipwreckId,
}) => {
  const [favourites, setFavourites] = useState(favouriteStore.getAll());

  const handleMarkerClick = (id: number) => setSelectedShipwreckId(id);
  const handleCloseButtonClick = () => setSelectedShipwreckId(NONE);

  const handleFavouriteButtonClick = () => {
    const shipwreckName = shipwrecks[selectedShipwreckId].name;
    if (favouriteStore.has(shipwreckName)) {
      favouriteStore.remove(shipwreckName);
    } else {
      favouriteStore.add(shipwreckName);
    }

    setFavourites(favouriteStore.getAll());
  };

  const shipName =
    selectedShipwreckId !== NONE ? shipwrecks[selectedShipwreckId].name : "";

  return (
    <>
      {selectedShipwreckId !== NONE && (
        <ShipwreckDetails
          shipName={shipName}
          isFavourite={favourites.includes(shipName)}
          handleCloseButtonClick={handleCloseButtonClick}
          handleFavouriteButtonClick={handleFavouriteButtonClick}
        />
      )}
      <MapLoader
        shipwrecks={shipwrecks}
        favourites={favourites}
        isVisible={selectedShipwreckId === NONE}
        handleMarkerClick={handleMarkerClick}
      />
    </>
  );
};

export default MainContent;