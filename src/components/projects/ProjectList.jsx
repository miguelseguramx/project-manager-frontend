import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/projectContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext'

const ProjectList = () => {
  
  // Obtain the projects from the projectState.provider
  const projectsContext = useContext(ProjectContext)
  const { projects, getProjects, message } = projectsContext
  
  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  // Get project when the component is render
  useEffect(() => {

    // If there is a mistake
    if(message){
      showAlert(message.msg, message.category)
    }
    getProjects()
  }, [message]) //eslint-disable-line
  
  if(projects.lenght === 0) return <p>No projects, start by creating one</p>
  
  return (
    <ul className="listado-proyectos">
       { 
        alert ? (
          <div className={`alerta ${alert.category}`}>
            {alert.msg}
          </div>
        ) : null
      }
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="proyecto"
          >
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectList;