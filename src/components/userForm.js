import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React from 'react';
import ShowList from './showList';
import InsertUser from './insertUser';

class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [{ name: "foo", age: "20" }, { name: "bar", age: "25" }],
      editUserStatus: false,
      userDetail: { name: '', age: '' }
    };
    this.setUser = this.setUser.bind(this)
    this.editUser = this.editUser.bind(this)
  }

  setUser(data) {
    if (this.state.editUserStatus) {
      this.state.userList[this.state.userIndex] = data
      this.setState({
        userList: this.state.userList,
        editUserStatus: false,
      });
    }
    else {
      if (data.name === '' || data.age === '')
        alert("Please fill the other field")
      if (data.name !== '' && data.age !== '') {
        this.state.userList.push(data)
        this.setState({
          userList: this.state.userList,
        });
      }
    }
  }

  editUser(data) {
    if (data.type === 'delete') {
      // this.state.userList.splice(this.state.userIndex, 1)
      delete this.state.userList[data.index]
      this.setState({
        userList: this.state.userList,
        editUserStatus: false,
      });
    }
    else {
      this.setState({
        editUserStatus: true,
        userDetail: this.state.userList[data.index],
        userIndex: data.index
      });
    }
  }

  render() {
    if (this.state.userList.length > 0)
      return (
        <div>
          <InsertUser
            addUserToList={this.setUser}
            editUserStatus={this.state.editUserStatus}
            userDetail={this.state.userDetail}
          />
          <ShowList
            list={this.state.userList}
            editUserDetail={this.editUser}
          />,
      </div>
      );
    return (
      <div>
        <InsertUser
          addUserToList={this.setUser}
          editUserStatus={this.state.editUserStatus}
          userDetail={this.state.userDetail}
        />
      </div>
    );
  }
}

export default UserForm