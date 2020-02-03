import React, { Fragment, useState } from 'react';

const NewProject = () => {

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
    e.preventdefault()
    
  }

  return (
    <Fragment>
      <button className="btn btn-block btn-primario">
        New project
      </button>

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
          type="text"
          className="btn btn-block btn-primario"
          value="Add project"
        />
      </form>
    </Fragment>
  );
};

export default NewProject;