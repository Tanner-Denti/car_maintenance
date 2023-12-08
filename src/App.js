import React from 'react';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import Task from './components/task';
import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#ffdec7] to-[#fff6f0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({...doc.data(), id: doc.id})
      });
      setTasks(tasksArr)
    });
    return () => unsubscribe()
  }, [])



  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Car Maintenance</h3>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder="Enter New Task"></input>
          <button className={style.button}><FaPlus size={30}/></button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <Task key={index} task={task}/>
          ))}
        </ul>
        <p className={style.count}>You have two tasks</p>
      </div>
    </div>
  );
}

export default App;
