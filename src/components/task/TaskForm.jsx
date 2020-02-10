import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/task/taskContext';

const TaskForm = () => {

  const [ newTask, setNewTask ] = useState({
    name: '',
  })

  const { name } = newTask

  // Project state
  const projectsContext = useContext(ProjectContext)
  const { project } = projectsContext

  // Task state
  const tasksContext =  useContext(TaskContext)
  const { actualtask, taskerror, addTask, validateTask, getTasks,  editTask } = tasksContext

  // Effect to detect if you want to edit a task 
  useEffect(() => {
    if(actualtask !== null){
      setNewTask(actualtask)
      return
    }
    setNewTask({
      name: ''
    })
  }, [actualtask])//eslint-disable-line

  if (!project){
    return null
  } 

  // Array destructuring to obtain the actual project
  const [actualProject]  = project

  const handleSubmit = e => {

    e.preventDefault()
    
    // Validate form
    if(name.trim() === ''){
      validateTask()
      return
    }

    if(actualtask === null){
      // Add new task to the state
      newTask.project = actualProject._id
      addTask(newTask)
    } else {
      // Edit actual task
      editTask(newTask)
    }
    // Get, filter and set the task of the project
    getTasks(actualProject._id);
    // Reset form
    setNewTask({
      name: '',
    })
  }

  const handleChange = e => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Task name"
            name="name"
            value={name}
            onChange={handleChange}/>
        </div>

        <div className="input-container">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value={actualtask ? 'Edit task' : 'Add task'}
          />
        </div>
      </form>
     
      { taskerror ? <p className="message error">The name is mandatory</p>: null}
    </div>
  );
};

export default TaskForm;