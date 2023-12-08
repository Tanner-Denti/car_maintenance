import React from 'react';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import TaskItem from './TaskItem';
import { db } from '../firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, getDocs} from 'firebase/firestore';

const style = {
  container: `bg-slate-100 max-w-[75%] w-full mx-auto min-h-screen rounded-md shadow-xl flex pt-10 justify-center`,
  functionalContainer: `max-w-[1080px] w-full rounded-md p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-left p-2`,
  select: `border p-2 rounded mr-2`
}

const Task = () => {
  const [taskItems, setTaskItems] = useState([])
  const [input, setInput] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [vehicles, setVehicles] = useState([]);

  const createTaskItem = async (e) => {
    e.preventDefault(e)
    if(input === '')
    {
      alert('Please enter a valid task')
      return
    }
    await addDoc(collection(db, 'taskItems'), {
      text: input,
      completed: false,
      vehicleId: selectedVehicleId
    })
    setInput('')
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        const vehiclesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVehicles(vehiclesArray);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    const q = query(collection(db, 'taskItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskItemsArr = [];
      querySnapshot.forEach((doc) => {
        taskItemsArr.push({...doc.data(), id: doc.id})
      });
      setTaskItems(taskItemsArr)
    });

    fetchVehicles()
    return () => unsubscribe()
  }, [])

  const toggleComplete = async (taskItem) => {
    await updateDoc(doc(db, 'taskItems', taskItem.id), {
      completed: !taskItem.completed
    })
  }

  const deleteTaskItem = async (id) => {
    await deleteDoc(doc(db, 'taskItems', id))
  }

  return (
    <div className={style.container}>
      <div className={style.functionalContainer}>
        <h3 className={style.heading}>Car Maintenance Tasks</h3>
          <form onSubmit={createTaskItem} className={style.form}>
            <select 
              value={selectedVehicleId} 
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className={style.select}
            >
              <option value="">Select a Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.make} {vehicle.model} {vehicle.year}</option>
              ))}
            </select>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className={style.input} 
                type="text" 
                placeholder="Enter New Task"
            />
            <button className={style.button}><FaPlus size={30}/></button>
          </form>
          <ul>
              {taskItems
                .filter(taskItem => selectedVehicleId === '' || taskItem.vehicleId === selectedVehicleId)
                .map((taskItem, index) => (
                <TaskItem 
                    key={index} 
                    taskItem={taskItem} 
                    toggleComplete={toggleComplete}
                    deleteTaskItem={deleteTaskItem}
                />
              ))}
          </ul>
          {taskItems.length < 1 ? null : <p className={style.count}>{`You have ${taskItems.filter(taskItem => selectedVehicleId === '' || taskItem.vehicleId === selectedVehicleId).length} tasks`}</p>}
        </div>
    </div>
  );
}

export default Task;