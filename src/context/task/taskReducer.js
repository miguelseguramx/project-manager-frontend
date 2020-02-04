import { 
  GET_TASKS,
  ADD_TASK,
  VALIDATE_TASK_FORM,
  DELETE_TASK,
  CHANGE_TASK_STATE,
  ACTUAL_TASK,
  EDIT_TASK,
 
} from '../../types/index';


export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        projecttasks: state.tasks.filter(task => task.projectId === action.payload )
      }
    case ADD_TASK:
      return{
        ...state,
        tasks: [action.payload, ...state.tasks ],
        taskerror: false,
      }
    case VALIDATE_TASK_FORM:
      return{
        ...state,
        taskerror: true,
      }
    case DELETE_TASK:
      return{
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload )
      }
    case EDIT_TASK:
    case CHANGE_TASK_STATE:
      return{
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task ),
        actualtask: null,
      }
    case ACTUAL_TASK:
      return {
        ...state,
        actualtask: action.payload,
      }
    default:
      return state;
  }
}