import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
  };

const TaskItem = ({ taskItem, toggleComplete, deleteTaskItem }) => {
    return (
        <li className={taskItem.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                <input 
                    onChange={() => toggleComplete(taskItem)} 
                    type='checkbox' 
                    checked={taskItem.completed ? 'checked' : ''}/>
                <p onClick={() => toggleComplete(taskItem)} className={taskItem.completed ? style.textComplete : style.text}>
                    {taskItem.text}
                </p>
            </div>
            <button onClick={() => deleteTaskItem(taskItem.id)}>{<FaRegTrashAlt/>}</button>
        </li>
    )
}

export default TaskItem;