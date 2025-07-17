import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({plants, onAddPlant, onUpdateStock, searchTerm, setSearchTerm}) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={plants} onUpdateStock={onUpdateStock} />
    </main>
  );
}

export default PlantPage;
