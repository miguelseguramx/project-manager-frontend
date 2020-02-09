import { 
  REGISTER_SUCCESS, 
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  GET_USER
} from '../../types/index';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        auth: true,
        message: null,
        loading: false,
      }
    case LOGIN_ERROR:
    case REGISTER_ERROR: 
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        message: action.payload,
        loading: false,
      }
    case GET_USER:
      return {
        ...state,
        auth: true,
        user: action.payload.user,
        loading: false,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        auth: null,
        message: action.payload,
      }
    default:
      return state
  }
}