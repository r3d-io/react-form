import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../index.css';
import {connect} from 'react-redux';
import { UPDATE_USER_INDEX, DELETE_USER } from '../actions/types';

class ListElement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.name}</td>
        <td>{this.props.age}</td>
        <td>{this.props.edit}</td>
        <td>{this.props.delete}</td>
      </tr>
    );
  }
};

class ShowList extends React.Component {

  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(event, userIndex, actionType) {
    event.preventDefault();
    // console.log(actionType,userIndex)
    this.props.dispatch({ type:actionType, id:userIndex });
  }

  editUser(index) {
    return (
      <button
        type='submit'
        value={index}
        onClick={(event) => this.updateValue(event, index, UPDATE_USER_INDEX)}
        className="btn btn-sm btn-primary"
      >Edit</button>
    )
  }

  deleteUser(index) {
    return (
      <button
        type='submit'
        value={index}
        onClick={(event) => this.updateValue(event, index, DELETE_USER)}
        className="btn btn-sm btn-danger"
      >Delete</button>
    )
  }

  render() {
    let list = [];
    this.props.users.userList.forEach((user) => {
      list.push(<ListElement
        index={user.id}
        key={user.id}
        name={user.name}
        age={user.age}
        edit={this.editUser(user.id)}
        delete={this.deleteUser(user.id)}
      />);
    })

    return (
      <div>
        <h1>User Detail</h1>
        <table className="table">
          <tbody>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ShowList);
