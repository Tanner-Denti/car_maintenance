import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';

const NewCars = () => {
  // Example state for vehicles. Replace this with actual data fetching logic.
  const [vehicles, setVehicles] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019 },
    // Add more vehicle objects here
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">New Cars</h1>
      <div>
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default NewCars;