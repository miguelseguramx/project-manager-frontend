import React from 'react';

const TopBar = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Hola <span>Juan Pablo</span></p>
      <nav className="nav-principal">
        <a href="#!">Log out</a>
      </nav>
    </header>
  );
};

export default TopBar;