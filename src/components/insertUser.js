import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { ADD_USER, UPDATE_USER } from '../actions/types';


class InsertUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.users.userDetail.name, age: this.props.users.userDetail.age };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      name: newProps.users.userDetail.name,
      age: newProps.users.userDetail.age
    });
  }

  handleTextChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNumChange(event) {
    this.setState({ age: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("submit", this.props)
    if (this.props.users.userDetail.userEdit) {
      this.props.dispatch({
        type: UPDATE_USER,
        name: this.state.name,
        age: this.state.age,
        id: this.props.users.userDetail.userIndex
      });
    }
    else {
      this.props.dispatch({
        type: ADD_USER,
        name: this.state.name,
        age: this.state.age,
        id: this.props.users.userList.length + 1
      });
    }
    this.setState({
      name: this.props.users.userDetail.name,
      age: this.props.users.userDetail.age
    });
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(InsertUser);
