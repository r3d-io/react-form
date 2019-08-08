import {
  ADD_USER, DELETE_USER, UPDATE_USER, UPDATE_USER_INDEX, UPDATE_FORM,
} from '../actions/types';

const defaultState = {
  userList: [{ name: 'foo', age: '40', id: 1 }, { name: 'bar', age: '45', id: 2 }],
  userDetail: {
    name: '',
    age: '',
    userIndex: 0,
    userEdit: false,
  },
};

function users(state = defaultState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { userList } = state;
      if (action.name !== '' && action.age !== '' && action.isInsert) userList.push({ name: action.name, age: action.age, id: action.id });
      return {
        userList,
        userDetail: defaultState.userDetail,
      };
    }
    case DELETE_USER: {
      const { userList } = state;
      delete userList[action.id - 1];
      return {
        userList,
        userDetail: {
          name: '',
          age: '',
          userIndex: state.userDetail.userIndex,
        },
      };
    }
    case UPDATE_USER: {
      const { userList } = state;
      const userDetail = { name: action.name, age: action.age, id: action.id + 1 };
      userList[action.id] = userDetail;
      return {
        userList,
        userDetail: defaultState.userDetail,
      };
    }
    case UPDATE_FORM: {
      const { userList } = state;
      const userName = action.name ? action.name : state.userDetail.name;
      const userAge = action.age ? action.age : state.userDetail.age;
      return {
        userList,
        userDetail: {
          name: userName,
          age: userAge,
          userIndex: state.userDetail.userIndex,
          userEdit: state.userDetail.userEdit,
        },
      };
    }
    case UPDATE_USER_INDEX: {
      const userId = action.id - 1;
      const { userList } = state;
      return {
        userList,
        userDetail: {
          name: userList[userId].name,
          age: userList[userId].age,
          userIndex: userId,
          userEdit: true,
        },
      };
    }
    default:
      return state;
  }
}

export default users;
