import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/task/taskContext';

const Project = ({ project }) => {

  // Gte the state to set the actual project
  const projectsContext = useContext(ProjectContext)
  const { actualProject } = projectsContext

  // Set the tasks for the actual project
  const tasksContext = useContext(TaskContext)
  const { getTasks } = tasksContext

  const addActualProject = id => {
    actualProject(id)
    getTasks(id)
  }

  return (
    <li>
      <button
        type="btn"
        className="btn btn-blank"
        onClick={() => addActualProject(project.id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;