import React, { useState } from 'react';

const TaskForm = () => {
  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task name"
            name="task"/>
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Add task"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;