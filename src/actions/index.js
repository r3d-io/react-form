import { ADD_USER, DELETE_USER } from './types';
let nextUserId = 0

export const addUser = ({ name, age }) => ({
  type: ADD_USER,
  payload: {
    id: nextUserId++,
    name,
    age
  }
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: {
    id
  }
});