import React, {useState} from "react";

function PlantCard({plant, onUpdateStock}) {
  const [inStock, setInStock] = useState(plant.inStock);

const handleStockToggle = () => { // Defines a constant function called handleStockToggle
    const newInStockStatus = !inStock; // 1. Calculates the new stock status
    setInStock(newInStockStatus);      // 2. Updates the component's local state
    onUpdateStock(plant.id, newInStockStatus); // 3. Notifies a parent component 
  };

  return (
    <li className="card" data-testid="plant-item">
      <img
        src={plant.image}
        alt={plant.name}
        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
      />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      
        <button
         className={inStock ? "primary" : ""}
         onClick={handleStockToggle}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>      
    </li>
  );
}

export default PlantCard;