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
      showAlert('All fields are required', 'alert-error')
      return
    }
    
    if(password.length < 8){
      showAlert('The password must be at least 8 characters', 'alert-error')
      return
    }

    if(password !== confirmPassword){
      showAlert('Passwords are not the same', 'alert-error')
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
          <div className={`alert ${alert.category}`}>
            {alert.msg}
          </div>
        ) : null
      }
      <div className="form-container shadow-dark">
        <h1>Register</h1>
        <form action="" onSubmit={onSubmit}>
          <div className="form-camp">
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
          <div className="form-camp">
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
          <div className="form-camp">
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
          <div className="form-camp">
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
          <div className="form-camp">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Register"
            />
          </div>
        </form>
        <Link to={'/'} className="link-account">
          Login
        </Link> 
      </div>
    </div>
  );
};

export default NewAccount;