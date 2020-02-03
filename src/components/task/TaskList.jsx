import React from 'react';
import Task from './Task';

const TaskList = () => {

  const tasks = [
    {name: 'MERN task', id:23 ,state: true},
    {name: 'Pomodoro', id:24 ,state: false},
    {name: 'Ciiar', id:29 ,state: true},
  ]

  return (
    <>
      <h2>Project: Pomodoro</h2>
      <ul className="listado-tareas">
        {tasks.length === 0 
          ? (<li className="tarea">There's not task</li>)
          : tasks.map(task => (
            <Task task={task} key={task.id}/>
          ))
        }
      </ul>
      <button 
        type="button"
        className="btn btn-eliminar"
      >Eliminar proyecto &times;</button>
    </>
  );
};

export default TaskList;