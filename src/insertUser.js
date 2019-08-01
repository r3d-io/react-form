import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './index.css';

class InsertUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.userDetail.name, age: this.props.userDetail.age };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.editUserStatus) {
      this.setState({ 
        name: newProps.userDetail.name, 
        age: newProps.userDetail.age 
      });
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

export default InsertUser
