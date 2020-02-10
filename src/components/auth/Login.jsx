import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  // Extract the values from the context 
  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  const authContext = useContext(AuthContext)
  const {auth, message, loginFunction } = authContext

  // If the user islready registered or can take out
  useEffect(() => {
    if(auth){
      props.history.push('/projects')
    }
    if(message){
      showAlert(message.msg, message.category)
    }
  }, [message, auth, props.history]) //eslint-disable-line

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

    // Validate the email and the password
    if(email.trim() === '' || password.trim() === '' ){
      showAlert('All fields are required', 'alert-error')
      return
    }

    loginFunction({ email, password })
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
        <h1>Log in</h1>
        <form action="" onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Login"
            />
          </div>
        </form>
        <Link to={'/new-account'} className="link-account">
          You don't have an account? Register
        </Link> 
      </div>
    </div>
  );
};

export default Login;