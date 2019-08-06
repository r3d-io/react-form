import { ADD_USER, DELETE_USER, UPDATE_USER, UPDATE_USER_INDEX } from '../actions/types';

const defaultState = {
  userList: [{ name: "foo", age: "40", id: 1 }, { name: "bar", age: "45", id: 2 }],
  userDetail: {
    name: '',
    age: '',
    userIndex: 0,
    userEdit: false
  }
}

function users(state = defaultState, action) {
  switch (action.type) {
    case ADD_USER: {
      let userList = state.userList;
      userList.push({ name: action.name, age: action.age, id: action.id })
      return {
        userList,
        userDetail: defaultState.userDetail
      };
    }
    case DELETE_USER: {
      let userList = state.userList;
      delete userList[action.id - 1]
      return {
        userList,
        userDetail: {
          name: '',
          age: '',
          userIndex: state.userDetail.userIndex
        }
      };
    }
    case UPDATE_USER: {
      let userList = state.userList;
      let userDetail = { name: action.name, age: action.age, id: action.id + 1 }
      userList[action.id] = userDetail
      return {
        userList,
        userDetail: defaultState.userDetail
      };
    }
    case UPDATE_USER_INDEX: {
      action.id = action.id - 1
      let userList = state.userList;
      return {
        userList,
        userDetail: {
          name: userList[action.id].name,
          age: userList[action.id].age,
          userIndex: action.id,
          userEdit: true
        }
      };
    }
    default:
      return state;
  }
}

export default users