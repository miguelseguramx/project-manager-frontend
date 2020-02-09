import React, { useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({ component: Component, ...props }) => {
  
  const authContext = useContext(AuthContext)
  const { auth, loading, userRegistered } = authContext

  useEffect(() => {
    userRegistered()
  }, [])//eslint-disable-line

  return (
    <Route { ...props } render={ props => !auth && !loading ? (
      <Redirect to="/" />
    ) : (
      <Component {...props}/>
    ) }>
    </Route>
  );
};

export default PrivateRoute;
