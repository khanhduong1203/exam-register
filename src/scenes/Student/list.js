import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import List from './components/List';
import select from '../../utils/select';
import {
  getStudentsIfNeed, getStudents,
} from './actions';
import toJS from '../../hoc/ToJS/index';

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
});

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(EmployeesPage)));
