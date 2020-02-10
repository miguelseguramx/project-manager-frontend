import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import TaskForm from '../task/TaskForm';
import TaskList from '../task/TaskList';

import AuthContext from '../../context/auth/authContext';

const Projects = () => {

  // Extract the information
  const authContext = useContext(AuthContext)
  const { userRegistered } = authContext

  useEffect(() => {
    userRegistered()
  }, [])//eslint-disable-line

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="principal-section">
        <TopBar />
        <main>
          <TaskForm />
          <div className="task-container">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;