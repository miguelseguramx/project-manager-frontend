import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  // State to login
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    // Validate the form

  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Log in</h1>
        <form action="" onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Ej. mianse@hotmail.com"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="button"
              className="btn btn-primario btn-block"
              value="Login"
            />
          </div>
        </form>
        <Link to={'/new-account'} className="enlace-cuenta">
          You don't have an account? Register
        </Link> 
      </div>
    </div>
  );
};

export default Login;