import React, {  } from 'react';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import TaskForm from '../task/TaskForm';
import TaskList from '../task/TaskList';

const Projects = () => {

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <TopBar />
        <main>
          <TaskForm />
          <div className="contenedor-tareas">
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;