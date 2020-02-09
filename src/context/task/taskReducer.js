import { 
  GET_TASKS,
  ADD_TASK,
  VALIDATE_TASK_FORM,
  DELETE_TASK,
  ACTUAL_TASK,
  EDIT_TASK,
} from '../../types/index';


export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        projecttasks: action.payload
      }
    case ADD_TASK:
      return{
        ...state,
        projecttasks: [action.payload, ...state.projecttasks ],
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
        projecttasks: state.projecttasks.filter(task => task._id !== action.payload )
      }
    case EDIT_TASK:
      return{
        ...state,
        projecttasks: state.projecttasks.map(task => task._id === action.payload._id ? action.payload : task ),
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