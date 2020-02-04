import React, { useContext } from 'react';
import Task from './Task';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/task/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = () => {

  // Project state
  const projectsContext = useContext(ProjectContext)
  const { project, deleteProject } = projectsContext
  
  // Task from the project
  const tasksContext = useContext(TaskContext)
  const { projecttasks } = tasksContext
  const tasks = projecttasks

  if (!project){
    return <h2>Selecciona un proyecto</h2>
  } 

  // Array destructuring
  // project = [{id: 1, name: '234'}]
  const [ actualProject ] = project // project[0].id

  return (
    <>
      <h2>Project: {actualProject.name}</h2>
      <ul className="listado-tareas">
        {tasks.length === 0 
          ? (<li className="tarea">There's not task</li>)
          : ( 
          <TransitionGroup>
            {tasks.map(task => (
              <CSSTransition
                key={task.id}
                timeout={200}
                classNames="tarea"
              >
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>)
        }
      </ul>
      <button 
        type="button"
        className="btn btn-eliminar"
        onClick={() => deleteProject(actualProject.id)}
      >Eliminar proyecto &times;</button>
    </>
  );
};

export default TaskList;