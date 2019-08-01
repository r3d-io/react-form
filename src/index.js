import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
class InsertUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.userDetail.name, age: this.props.userDetail.age };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.editUserStatus) {
      this.setState({ name: this.props.userDetail.name, age: this.props.userDetail.age });
    }
    else {
      this.setState({ name: '', age: '' });
    }
  }

  handleTextChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNumChange(event) {
    this.setState({ age: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addUserToList({ name: this.state.name, age: this.state.age });
    this.setState({ name: '', age: '' });
    this.props.resetPersonalData();
    console.log(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <h4> Name:</h4>
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleTextChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4> Age:</h4>
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="number"
                    value={this.state.age}
                    onChange={this.handleNumChange}
                  />
                </div>
              </td>
            </tr>
            <tr><td>
              <div className="form-group">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Submit"
                />
              </div>
            </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

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
        className="btn btn-primary"
      >Edit</button>
    )
  }

  deleteUser(index) {
    return (
      <button
        type='submit'
        value={index}
        onClick={(event) => this.updateValue(event, index, 'delete')}
        className="btn btn-danger"
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
      </div>);
  }
}

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
    this.resetPersonalData = this.resetPersonalData.bind(this)
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
          userList: this.state.userList
        });
      }
    }
  }

  editUser(data) {
    this.setState({
      editUserStatus: true,
      userDetail: this.state.userList[data.index],
      userIndex: data.index
    });
  }

  resetPersonalData() {
    this.setState({
      userDetail: { name: '', age: '' }
    });
  }

  render() {
    return (
      <div>
        <InsertUser
          addUserToList={this.setUser}
          editUserStatus={this.state.editUserStatus}
          userDetail={this.state.userDetail}
          resetPersonalData={this.resetPersonalData}
        />
        <ShowList
          list={this.state.userList}
          editUserDetail={this.editUser}
        />,
			</div>
    );
  }
}

ReactDOM.render(<UserForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
        // https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010
// https://www.codingame.com/playgrounds/8747/react-lifecycle-methods-render-and-componentdidmount