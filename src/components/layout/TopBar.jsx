import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const TopBar = () => {

  // Extract the information
  const authContext = useContext(AuthContext)
  const { userRegistered, user, logoutFunction} = authContext

  useEffect(() => {
    userRegistered()
  }, []) //eslint-disable-line

  return (
    <header className="app-header">
      { user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p>: null}    
      <nav className="nav-principal">
        <button 
          className="btn btn-blank cerrar-sesion"
          onClick={() => logoutFunction()}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default TopBar;