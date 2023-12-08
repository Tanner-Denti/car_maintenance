import React from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  card: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  title: `text-lg font-semibold`,
  detail: `text-sm`,
  button: `cursor-pointer flex items-center`,
  row: `flex`
};

const VehicleCard = ({ vehicle, deleteVehicle}) => {
  return (
    <li className={style.card}>
        <div className={style.row}>
            <div className={style.title}>{vehicle.make} {vehicle.model} {vehicle.year}</div>
        </div>
        <button className={style.button} onClick={() => deleteVehicle(vehicle.id)}>{<FaRegTrashAlt/>}</button>
    </li>
  );
};

export default VehicleCard;