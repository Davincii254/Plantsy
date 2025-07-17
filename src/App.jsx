import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PlantPage from "./components/PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/plants')
      .then(r => r.json())
      .then(data => {
        setPlants(data);
      })
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);

    fetch('http://localhost:3000/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant),
    })
    .then((r) => r.json())
    .then((newPlantFromServer) => {
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === newPlant.id ? newPlantFromServer : plant
        )
      );
    })
    .catch((error) => {
      console.error("Error adding new plant:", error);
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== newPlant.id));
    });
  };

  const handleUpdateStock = (plantId, newInStockStatus) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === plantId ? { ...plant, inStock: newInStockStatus } : plant
    );
    setPlants(updatedPlants);

    fetch(`http://localhost:3000/plants/${plantId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inStock: newInStockStatus })
    })
    .then(r => r.json())
    .then((updatedPlantFromServer) => {
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === updatedPlantFromServer.id ? updatedPlantFromServer : plant
        )
      );
    })
    .catch((error) => {
      console.error("Error updating plant stock:", error);
    });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      {/* PlantPage is now rendered directly, no routing involved */}
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        onUpdateStock={handleUpdateStock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;