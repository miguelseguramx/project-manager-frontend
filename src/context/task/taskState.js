import React, { useReducer } from 'react';
import uuid from 'uuid'
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { 
  GET_TASKS,
  ADD_TASK,
  VALIDATE_TASK_FORM,
  DELETE_TASK,
  CHANGE_TASK_STATE,
  ACTUAL_TASK,
  EDIT_TASK,
} from '../../types/index';

const TaskState = props => {
  const initialState = {
    tasks: [
      {name: 'Hola1', projectId: 1, id: 1, state: true},
      {name: 'Hola1', projectId: 1, id: 2, state: false},
      {name: 'Hola1', projectId: 1, id: 3, state: false},
      {name: 'Hola2', projectId: 2, id: 5, state: false},
      {name: 'Hola2', projectId: 2, id: 4, state: false},
      {name: 'Hola2', projectId: 2, id: 42, state: false},
      {name: 'Hola3', projectId: 3, id: 6, state: false},
      {name: 'Hola3', projectId: 3, id: 62, state: false},
    ],
    projecttasks: null,
    taskerror: false,
    actualtask: null,
  }
  
  // Dispacth para ejecutar las acciones
  const [state, dispatch] = useReducer(TaskReducer, initialState)

  // Actions
  
  const getTasks = projectId => {
    dispatch({
      type: GET_TASKS,
      payload: projectId,
    })
  }

  const addTask = task =>{
    task.id = uuid.v4()
    dispatch({
      type: ADD_TASK,
      payload: task
    })
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK_FORM,
    })
  }


  const deleteTask = id => {
    dispatch({
      type: DELETE_TASK,
      payload: id
    })
  }

  const changeTaskState = task => {
    dispatch({
      type:   CHANGE_TASK_STATE,
      payload: task
    })
  }

  // Extract a task to edit it
  const saveActualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  const editTask = task => {
    dispatch({
      type: EDIT_TASK,
      payload: task
    })
  }

  return(
    <TaskContext.Provider
      value={{
      // State
        tasks: state.tasks,
        projecttasks: state.projecttasks,
        taskerror: state.taskerror,
        actualtask: state.actualtask,
      // Tasks
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        changeTaskState,
        saveActualTask,
        editTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState