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
    const { dispatch } = this.props;
    dispatch({
      type: UPDATE_FORM,
      name: event.target.value,
    });
  }

  handleNumChange(event) {
    const { dispatch } = this.props;
    dispatch({
      type: UPDATE_FORM,
      age: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { users, dispatch } = this.props;
    if (users.userDetail.userEdit) {
      dispatch({
        type: UPDATE_USER,
        name: users.userDetail.name,
        age: users.userDetail.age,
        id: users.userDetail.userIndex,
      });
    } else {
      dispatch({
        type: ADD_USER,
        name: users.userDetail.name,
        age: users.userDetail.age,
        id: users.userList.length + 1,
      });
    }
  }

  render() {
    const { users } = this.props;
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
                    value={users.userDetail.name}
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
                    value={users.userDetail.age}
                    onChange={this.handleNumChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserForm);
