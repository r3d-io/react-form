import { ADD_USER, DELETE_USER } from '../actions/types';


export default function userReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter(post => post.id !== action.payload.id);
    default:
      return state;
  }
}