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
    return <h2>Select a project</h2>
  } 

  // Array destructuring
  // project = [{id: 1, name: '234'}]
  const [ actualProject ] = project // project[0].id

  return (
    <>
      <h2>Project: {actualProject.name}</h2>
      <ul className="task-list">
        {tasks.length === 0 
          ? (<li className="task">There's not task</li>)
          : ( 
          <TransitionGroup>
            {tasks.map(task => (
              <CSSTransition
                key={task._id}
                timeout={200}
                classNames="task"
              >
                <Task task={task} key={task._id} />
              </CSSTransition>
            ))}
          </TransitionGroup>)
        }
      </ul>
      <button 
        type="button"
        className="btn btn-delete"
        onClick={() => deleteProject(actualProject._id)}
      >Delete project</button>
    </>
  );
};

export default TaskList;