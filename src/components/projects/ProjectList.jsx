import React from 'react';
import Project from './Project';

const ProjectList = () => {

  const projects = [
    {name: 'MERN task', id: 12314},
    {name: 'Pomodoro', id: 98798},
    {name: 'Ciiar', id: 56968},
  ]

  return (
    <ul className="listado-proyectos">
      {projects.map(project => (
        <Project project={project} key={project.id}/>
      ))}
    </ul>
  );
};

export default ProjectList;