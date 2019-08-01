import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './index.css';

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
    this.props.editUserDetail({ index: userIndex, type: actionType });
  }

  editUser(index) {
    return (
      <button
        type='submit'
        value={index}
        onClick={(event) => this.updateValue(event, index, 'update')}
        className="btn btn-sm btn-primary"
      >Edit</button>
    )
  }

  deleteUser(index) {
    return (
      <button
        type='submit'
        value={index}
        onClick={(event) => this.updateValue(event, index, 'delete')}
        className="btn btn-sm btn-danger"
      >Delete</button>
    )
  }

  render() {
    let list = [];

    this.props.list.forEach((user, index) => {
      list.push(<ListElement
        index={index + 1}
        key={index}
        name={user.name}
        age={user.age}
        edit={this.editUser(index)}
        delete={this.deleteUser(index)}
      />);
    })

    return (
      <div>
        <h1>User Detail</h1>
        <table>
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

export default ShowList
