import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

  // Obtain the state of the form from the projectState.provider
  const projectsContext = useContext(projectContext)
  const { form, errorform, showForm, addProject, showError } = projectsContext

  // State for the project
  const [ project, setProject ] = useState({
    name: '',
  })

  const { name } = project

  const onChange = e => {
    setProject({
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    // Validate the form
    if (name === ''){
      showError()
      return
    }

    addProject(project)
    setProject({
      name: '',
    })
  }

  return (
    <Fragment>
      { form ? 
        (
          <form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmit} >
            <input
              type="text"
              className="input-text"
              placeholder="Project Name"
              name="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="submit"
              className="btn btn-block btn-primario"
              value="Add project"
            />
          </form>
        ) 
        :
        (
          <button
            className="btn btn-block btn-primario"
            onClick={() => showForm()}
          >
            New project
          </button>
        )
      }
      
      { errorform ? <p className="mensaje error">The name of the project is mandatory</p> : null }
    </Fragment>
  );
};

export default NewProject;