import React, { useReducer } from 'react';
import uuid from 'uuid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from '../../types';

const ProjectState = props => {
  const initialState = {
    projects: [], 
    form: false,
    errorform: false,
    project: null,
  }

  const projects = [
    { name: 'MERN task', id: 1},
    { name: 'Pomodoro', id: 2},
    { name: 'Ciiar', id: 3},
  ]

  // Dispacth para ejecutar las acciones
  const [ state, dispatch ] = useReducer(projectReducer, initialState)

  // Serie de funciones para el crud or actions on REDUX
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    })
  }

  // Get projects from the data base
  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: projects,
    })
  }

  // Add a new project
  const addProject = project => {
    project.id = uuid.v4()
    dispatch({
      type: ADD_PROJECT,
      payload: project
    })
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
  const deleteProject = id => {
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    })
  }

  return (
    <projectContext.Provider 
      value={{
      // State
        projects: state.projects,
        form: state.form,
        errorform: state.errorform,
        project: state.project,
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
