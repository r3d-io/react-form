import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class InsertUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', age:'' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
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
    this.setState({ name: ' ' , age: ''});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleTextChange}
          />
        </label>
        <br></br>
        <label>
          Age:
          <input
            type="number"
            value={this.state.age}
            onChange={this.handleNumChange}
          />
        </label>
        <br></br>
        <input
          type="submit"
          value="Submit"
        />
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
      </tr>
    );
  }
};

class ShowList extends React.Component {
  render() {
    let list = [];

    this.props.list.forEach((user, index) => {
      list.push(<ListElement index={index+1} key={index} name={user.name} age={user.age} />);
    })

    return (
      <div>
        <h1>User Detail</h1>
        <table>
          <tbody>
          <tr>
            <th>
              SNo.
          </th>
            <th>
              Name
          </th>
            <th>
              Age
          </th>
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
      userList: [{ name: "foo", age: "20"}, { name: "bar", age: "25" }]
    };
    this.setUser = this.setUser.bind(this)
  }

  setUser(data) {
    this.state.userList.push(data)
    // alert(this.state.userList)
    this.setState({
      userList: this.state.userList
    });
  }

  render() {
    return (
      <div>
        <InsertUser addUserToList={this.setUser} />
        <ShowList list={this.state.userList} />,
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