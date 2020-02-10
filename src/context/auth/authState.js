import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
  REGISTER_SUCCESS, 
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GET_USER
} from '../../types/index';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    user: null,
    message: null,
    loading: true,
  }

  const [ state, dispatch ] = useReducer(authReducer, initialState)
  
  // Actions 
  const userRegister = async data => {
    try {
      const response = await axiosClient.post('/api/users', data)
      // console.log(response.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      })

      // Get the user 
      userRegistered()
    } catch (error) {
      // console.log(error.response);
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error'
      }
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      })
    }
  }

  const userRegistered = async data => {
    const token = localStorage.getItem('token')
    if(token){
      tokenAuth(token)
    }

    try {
      const response = await axiosClient.get('/api/auth')
      // console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data
      })
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error'
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      })
    }
  }

  // Login
  const loginFunction = async data => {
    try {
      const answer = await axiosClient.post('/api/auth', data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: answer.data
      })

      // Get the user 
      userRegistered()
    } catch (error) {
      // console.log(error.response);
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error'
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alert
      })
    }
  }

  // Logout
  const logoutFunction = () => {
    dispatch({
      type: LOGOUT,
    })
  }

  return(
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
        loading: state.loading,
        userRegister,
        userRegistered,
        loginFunction,
        logoutFunction
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;