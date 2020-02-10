import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { 
  GET_TASKS,
  ADD_TASK,
  VALIDATE_TASK_FORM,
  DELETE_TASK,
  ACTUAL_TASK,
  EDIT_TASK,
  TASK_ERROR
} from '../../types/index';
import axiosClient from '../../config/axios';

const TaskState = props => {
  const initialState = {
    projecttasks: [],
    taskerror: false,
    actualtask: null,
  }
  
  // Dispacth para ejecutar las actions
  const [state, dispatch] = useReducer(TaskReducer, initialState)

  // Actions
  
  const getTasks = async project => {
    try {
      const response = await axiosClient.get('/api/tasks', { params: { project } })
      // console.log(response);
      
      dispatch({
        type: GET_TASKS,
        payload: response.data.tasks,
      })
    } catch (error) {
      // console.log(error.response);
      const alert = {
        msg: 'There was a mistake',
        category: 'alert-error',
      }
      dispatch({
        type: TASK_ERROR,
        payload: alert,
      })
    }
    
  }

  const addTask = async task =>{
    // console.log(task)
    try {
      const response = await axiosClient.post('/api/tasks', task) 
      // console.log(response)
      dispatch({
        type: ADD_TASK,
        payload: response.data.task
      })
    } catch (error) {
      // console.log(error);
      
      const alert = {
        msg: 'There was a mistake',
        category: 'alert-error',
      }
      dispatch({
        type: TASK_ERROR,
        payload: alert,
      })
    }
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK_FORM,
    })
  }


  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, {params: {project}})
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } catch (error) {
      const alert = {
        msg: 'There was a mistake',
        category: 'alert-error',
      }
      dispatch({
        type: TASK_ERROR,
        payload: alert,
      })
    }
    
  }

  const editTask = async task => {
    try {
      const response = await axiosClient.put(`/api/tasks/${task._id}`, task)
      // console.log(response);
      
      dispatch({
        type: EDIT_TASK,
        payload: response.data.task
      })
    } catch (error) {
      const alert = {
        msg: 'There was a mistake',
        category: 'alert-error',
      }
      dispatch({
        type: TASK_ERROR,
        payload: alert,
      })
    }
      
  }

  // const changeTaskState = task => {
  //   dispatch({
  //     type:   CHANGE_TASK_STATE,
  //     payload: task
  //   })
  // }

  // Extract a task to edit it
  const saveActualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  return(
    <TaskContext.Provider
      value={{
      // State
        projecttasks: state.projecttasks,
        taskerror: state.taskerror,
        actualtask: state.actualtask,
      // Tasks
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveActualTask,
        editTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState