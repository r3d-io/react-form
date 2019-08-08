import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React from 'react';
import { connect } from 'react-redux';
import UserForm from './userForm';
import UserList from './userList';

function UserContainer(props) {
  const { userList } = props.users;
  if (userList.length > 0) {
    return (
      <div>
        <UserForm />
        <UserList />
        ,
      </div>
    );
  }
  return (
    <div>
      <UserForm />
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserContainer);
