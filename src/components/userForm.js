  import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import React from 'react';
import ShowList from './showList';
import InsertUser from './insertUser';
import { connect } from 'react-redux';

class UserForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.users.userList.length > 0)
      return (
        <div>
          <InsertUser />
          <ShowList />,
      </div>
      );
    return (
      <div>
        <InsertUser />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(UserForm)