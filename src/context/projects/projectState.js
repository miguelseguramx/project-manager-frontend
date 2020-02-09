import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../../types';
import axiosClient from '../../config/axios'

const ProjectState = props => {
  const initialState = {
    projects: [], 
    form: false,
    errorform: false,
    project: null,
    message: null,
  }
  // const projects = [
  //   { name: 'MERN task', id: 1},
  //   { name: 'Pomodoro', id: 2},
  //   { name: 'Ciiar', id: 3},
  // ]

  // Dispacth para ejecutar las acciones
  const [ state, dispatch ] = useReducer(projectReducer, initialState)

  // Serie de funciones para el crud or actions on REDUX
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // Get projects from the data base
  const getProjects = async () => {
    try {
      const response = await axiosClient.get('/api/projects')
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects,
      })
    } catch (error) {
      const alert = {
        msg: 'There was a mistake',
        category: 'alerta-error',
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      })
    }
  }

  // Add a new project
  const addProject = async project => {

    try {
      const response = await axiosClient.post('/api/projects', project)
      // Set project into the state
      dispatch({
        type: ADD_PROJECT,
        payload: response.data
      })
    } catch (error) {
      const alert = {
        msg: 'There was a mistake',
        category: 'alerta-error',
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      })
    }
    
  }

  // Validae the form
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    })
  }

  // Select actual project
  const actualProject = id => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: id
    })
  }
  
  // Delete actual project
  const deleteProject = async id => {
    try {
      await axiosClient.delete(`/api/projects/${id}`)
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      })
    } catch (error) {
      const alert = {
        msg: 'There was a mistake',
        category: 'alerta-error',
      }
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      })
    }
    
  }

  return (
    <projectContext.Provider 
      value={{
      // State
        projects: state.projects,
        form: state.form,
        errorform: state.errorform,
        project: state.project,
        message: state.message,
      // Functions 
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  )
}

export default ProjectState
