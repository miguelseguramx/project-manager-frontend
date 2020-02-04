import React, { useContext }  from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/task/taskContext';

const Task = ({ task }) => {
  const tasksContext = useContext(TaskContext)
  const { deleteTask, getTasks, changeTaskState, saveActualTask } = tasksContext

  const projectsContext = useContext(ProjectContext)
  const { project } = projectsContext
  
  // Array destructuring
  // project = [{id: 1, name: '234'}]
  const [ actualProject ] = project // project[0].id

  const handleDelete = id => {
    deleteTask(id)
    getTasks(actualProject.id)
  }

  const handleTaskChange = task => {
    if(task.state){
      task.state = false
    } else {
      task.state = true
    }
    changeTaskState(task)
  }

  const handleTaskEdit = task => {
    saveActualTask(task)
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.state 
        ? 
          (
            <button
              type="button"
              className="completo"
              onClick={() => handleTaskChange(task)}
            >Completo</button>
          )
        :
          (
            <button
              type="button"
              className="incompleto"
              onClick={() => handleTaskChange(task)}
            >Incompleto</button>
          )
        }
        </div>
        <div className="acciones">
          <button
            type="button"
            className="btn btn-primario"
            onClick={() => handleTaskEdit(task)}
          >Editar</button>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => handleDelete(task.id)}
          >Eliminar</button>
        </div>
    </li>
  );
};

export default Task;