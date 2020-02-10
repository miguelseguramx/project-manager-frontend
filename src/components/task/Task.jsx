import React, { useContext }  from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/task/taskContext';

const Task = ({ task }) => {
  const tasksContext = useContext(TaskContext)
  const { deleteTask, getTasks, editTask, saveActualTask } = tasksContext

  const projectsContext = useContext(ProjectContext)
  const { project } = projectsContext
  
  // Array destructuring
  // project = [{id: 1, name: '234'}]
  const [ actualProject ] = project // project[0].id

  const handleDelete = id => {
    deleteTask(id, actualProject._id)
    getTasks(actualProject._id)
  }

  const handleTaskChange = task => {
    if(task.state){
      task.state = false
    } else {
      task.state = true
    }
    editTask(task)
  }

  const handleTaskEdit = task => {
    saveActualTask(task)
  }

  return (
    <li className="task shadow">
      <p>{task.name}</p>
      <div className="state">
        {task.state 
        ? 
          (
            <button
              type="button"
              className="completed"
              onClick={() => handleTaskChange(task)}
            >Completed</button>
          )
        :
          (
            <button
              type="button"
              className="incompleted"
              onClick={() => handleTaskChange(task)}
            >Incomplete</button>
          )
        }
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleTaskEdit(task)}
          >Edit</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleDelete(task._id)}
          >Delete</button>
        </div>
    </li>
  );
};

export default Task;