import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = props => {

  // Extract the values from the context 
  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext)
  const {auth, message, userRegister } = authContext

  // If the user is already registered or can take out
  useEffect(() => {
    if(auth){
      props.history.push('/projects')
    }
    if(message){
      showAlert(message.msg, message.category)
    }
  }, [message, auth, props.history ]) //eslint-disable-line

  // State to save user
  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = user

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    // Validate the form, the password, and confirm password
    if(name.trim() === '' || 
      email.trim() === '' || 
      password.trim() === '' || 
      confirmPassword.trim() === ''){
      showAlert('All fields are required', 'alerta-error')
      return
    }
    
    if(password.length < 8){
      showAlert('The password must be at least 8 characters', 'alerta-error')
      return
    }

    if(password !== confirmPassword){
      showAlert('Passwords are not the same', 'alerta-error')
      return
    }
    
    userRegister({
      name, email, password
    })
    
  }

  return (
    <div className="form-usuario">
      { 
        alert ? (
          <div className={`alerta ${alert.category}`}>
            {alert.msg}
          </div>
        ) : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Register</h1>
        <form action="" onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Miguel Segura"
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*******"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Register"
            />
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Login
        </Link> 
      </div>
    </div>
  );
};

export default NewAccount;