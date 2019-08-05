import { ADD_USER, DELETE_USER } from './types';

export const addUser = ({ id, name, age }) => ({
  type: ADD_USER,
  payload: {
    id,
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