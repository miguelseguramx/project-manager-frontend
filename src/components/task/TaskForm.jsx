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
  const { taskerror, addTask, actualtask, validateTask, getTasks, editTask } = tasksContext

  // Effect to detect if you want to edit a task 
  useEffect(() => {
    if(actualtask !== null){
      setNewTask(actualtask)
      return
    }
    setNewTask({
      name: ''
    })
  }, [actualtask])

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
      newTask.projectId = actualProject.id
      newTask.state = false
      addTask(newTask)
    } else {
      // Edit actual task
      editTask(newTask)
    }

    

    // Get, filter and set the task of the project
    getTasks(actualProject.id);

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
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name"
            name="name"
            value={name}
            onChange={handleChange}/>
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={actualtask ? 'Edit task' : 'Add task'}
          />
        </div>
      </form>
     
      { taskerror ? <p className="mensaje error">The name is mandatory</p>: null}
    </div>
  );
};

export default TaskForm;