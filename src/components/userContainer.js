import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React from 'react';
import UserForm from './userForm';
import UserList from './userList';
import { connect } from 'react-redux';

class UserContainer extends React.Component {

  render() {
    if (this.props.users.userList.length > 0)
      return (
        <div>
          <UserForm />
          <UserList />,
      </div>
      );
    return (
      <div>
        <UserForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserContainer)