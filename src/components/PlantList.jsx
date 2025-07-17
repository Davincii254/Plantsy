import React from "react";
import PlantCard from "./PlantCard";

// PlantList is a functional component that receives 'plants' and 'onUpdateStock' as props.
// It uses array destructuring in its parameter list to easily access these props.
function PlantList({plants, onUpdateStock}) {
  return (
    // Renders an unordered list with the class "cards"
    <ul className="cards">
      {/*
        Maps over the 'plants' array received from the parent component (App.jsx).
        For each 'plant' object in the array, it renders a PlantCard component.
      */}
      {plants.map((plant) => (
          // PlantCard component rendered for each plant
          // 'key' prop is crucial for React's list rendering optimization and avoiding warnings.
          // 'plant' prop passes the individual plant object to PlantCard.
          // 'onUpdateStock' prop passes the function down to PlantCard so it can update the parent's state.
          <PlantCard key={plant.id} plant={plant} onUpdateStock={onUpdateStock} />
        ))}
    </ul>
  );
}

export default PlantList;