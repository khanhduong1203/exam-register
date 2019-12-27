import React from 'react';
import { connect } from 'react-redux';
import { Tabs, notification } from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import List from './components/List';
import select from '../../utils/select';
import {
  getStudentsIfNeed, getStudents, insertStudent, deleteStudent,
} from './actions';
import toJS from '../../hoc/ToJS/index';
import ROUTER from '../../constant/router';

const { TabPane } = Tabs;

class EmployeesPage extends React.Component {
  state = {
    data: '',
  }

  static getDerivedStateFromProps(props, state) {
    props.getStudentsIfNeed();
    return state;
  }

  onGetAllStudents = () => {
    this.props.getStudents();
  }

  deleteStudent = (id) => {
    this.props.deleteStudent(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa sinh viên thành công' });
        },
        onError: () => {
          notification.error({ message: 'Xóa sinh viên thất bại' });
        },
      },
    );
  }

  render() {
    const {
      list, isFetching, history,
    } = this.props;
    return (
      <List
        data={list}
        isFetching={isFetching}
        history={history}
        getStudents={this.onGetAllStudents}
        onDelete={this.deleteStudent}
      />
    );
  }
}

const mapStateToProps = state => ({
  list: select(state, 'studentReducer', 'list'),
  isFetching: select(state, 'studentReducer', 'isFetching'),
  didInvalidate: select(state, 'studentReducer', 'didInvalidate'),
});

const mapDispatchToProps = dispatch => ({
  getStudentsIfNeed: params => dispatch(getStudentsIfNeed(params)),
  getStudents: params => dispatch(getStudents(params)),
  insertStudents: params => dispatch(insertStudent(params)),
  deleteStudent: (id, meta) => dispatch(deleteStudent(id, meta)),
});

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(EmployeesPage)));
