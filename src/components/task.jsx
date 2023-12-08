import React from 'react';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import TaskItem from './TaskItem';
import { db } from '../firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#ffdec7] to-[#fff6f0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}

const Task = () => {
  const [taskItems, setTaskItems] = useState([])
  const [input, setInput] = useState('')

  const createTaskItem = async (e) => {
    e.preventDefault(e)
    if(input === '')
    {
      alert('Please enter a valid task')
      return
    }
    await addDoc(collection(db, 'taskItems'), {
      text: input,
      completed: false
    })
    setInput('')
  }

  useEffect(() => {
    const q = query(collection(db, 'taskItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskItemsArr = [];
      querySnapshot.forEach((doc) => {
        taskItemsArr.push({...doc.data(), id: doc.id})
      });
      setTaskItems(taskItemsArr)
    });
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
        <h3 className={style.heading}>Car Maintenance</h3>
        <form onSubmit={createTaskItem} className={style.form}>
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
            {taskItems.map((taskItem, index) => (
            <TaskItem 
                key={index} 
                task={taskItem} 
                toggleComplete={toggleComplete}
                deleteTask={deleteTaskItem}
            />
            ))}
        </ul>
        {taskItems.length < 1 ? null : <p className={style.count}>{`You have ${taskItems.length} tasks`}</p>}
    </div>
  );
}

export default Task;