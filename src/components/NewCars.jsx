import React, { useState, useEffect} from 'react';
import { collection, addDoc, deleteDoc, query, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import VehicleCard from './VehicleCard';

const style = {
    container: `bg-slate-100 max-w-[75%] w-full mx-auto min-h-screen rounded-md shadow-xl flex pt-10`,
    formContainer: `w-2/4 flex flex-col`, 
    listContainer: `w-2/4 flex flex-col mr-20`, 
    heading: `text-3xl font-bold text-center mb-6`,
    form: `max-w-md mx-auto`,
    input: `border p-2 w-full text-xl mb-2`,
    button: `w-full bg-blue-500 text-white p-2 rounded`,
    ul: `mt-0`
};

const NewCars = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicles, setVehicles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!make || !model || !year) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'vehicles'), { make, model, year });
      setMake('');
      setModel('');
      setYear('');
    } catch (error) {
      console.error('Error adding vehicle: ', error);
      alert('Error adding vehicle');
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'vehicles'));
    const updateVehicles = onSnapshot(q, (querySnapshot) => {
      let vehiclesArr = [];
      querySnapshot.forEach((doc) => {
        vehiclesArr.push({...doc.data(), id: doc.id})
      });
      setVehicles(vehiclesArr)
    });
    return () => updateVehicles()
  }, [])

  const deleteVehicle = async (id) => {
    await deleteDoc(doc(db, 'vehicles', id))
  }

  return (
    <div className={style.container}>
        <div className={style.formContainer}>
            <h1 className={style.heading}>Add New Car</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <input 
                className={style.input}
                type="text" 
                placeholder="Make" 
                value={make}
                onChange={(e) => setMake(e.target.value)}
                />
                <input 
                className={style.input}
                type="text" 
                placeholder="Model" 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                />
                <input 
                className={style.input}
                type="number" 
                placeholder="Year" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                />
                <button 
                className={style.button}
                type="submit"
                >
                Add Vehicle
                </button>
            </form>
        </div>
        <div className={style.listContainer}>
            <h2 className={style.heading}>Your Cars</h2>
            <ul className={style.ul}>
                {vehicles.map(vehicle => (
                    <VehicleCard 
                        key={vehicle.id} 
                        vehicle={vehicle} 
                        deleteVehicle={deleteVehicle}
                    />
                ))}
            </ul>
        </div>
    </div>
  );
};

export default NewCars;