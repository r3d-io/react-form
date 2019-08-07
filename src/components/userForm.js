import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { ADD_USER, UPDATE_FORM, UPDATE_USER } from '../actions/types';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  handleTextChange(event) {
    this.props.dispatch({
      type: UPDATE_FORM,
      name: event.target.value,
    });
  }

  handleNumChange(event) {
    this.props.dispatch({
      type: UPDATE_FORM,
      age: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.users.userDetail.userEdit) {
      this.props.dispatch({
        type: UPDATE_USER,
        name: this.props.users.userDetail.name,
        age: this.props.users.userDetail.age,
        id: this.props.users.userDetail.userIndex
      });
    }
    else {
      this.props.dispatch({
        type: ADD_USER,
        name: this.props.users.userDetail.name,
        age: this.props.users.userDetail.age,
        id: this.props.users.userList.length + 1,
      });
    }
  }

  render() {
    let userName = this.props.users.userDetail.name
    let userAge = this.props.users.userDetail.age
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
                    value={userName}
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
                    value={userAge}
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

export default connect(mapStateToProps)(UserForm);
