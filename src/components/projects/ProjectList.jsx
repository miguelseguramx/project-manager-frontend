import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/projectContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProjectList = () => {
  
  // Obtain the projects from the projectState.provider
  const projectsContext = useContext(ProjectContext)
  const { projects, getProjects } = projectsContext

  // Get project when the component is render
  useEffect(() => {
    getProjects()
  }, [])
  
  if(projects.lenght === 0) return <p>No projects, start by creating one</p>
  
  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition
            key={project.id}
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