import React from 'react';

const style = {
  card: `bg-white p-4 rounded-lg shadow-md mb-4`,
  title: `text-lg font-semibold`,
  detail: `text-sm`
};

const VehicleCard = ({ vehicle }) => {
  return (
    <div className={style.card}>
      <div className={style.title}>{vehicle.make} {vehicle.model}</div>
      <div className={style.detail}>Year: {vehicle.year}</div>
      {/* Add more vehicle details here as needed */}
    </div>
  );
};

export default VehicleCard;