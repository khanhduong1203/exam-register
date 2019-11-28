import React from 'react';
import { connect } from 'react-redux';
import WithAuthentication from '../../hoc/WithAuthentication';
import List from './components/List';
import select from '../../utils/select';
import {
  getStudentsIfNeed,
} from './actions';
import toJS from '../../hoc/ToJS/index';

class EmployeesPage extends React.Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    props.getStudentsIfNeed();
    return state;
  }

  render() {
    const {
      list, isFetching, history, didInvalidate,
    } = this.props;
    return (
      <List data={list} isFetching={isFetching} history={history} />
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
});

export default WithAuthentication(false)(
  (toJS(connect(
    mapStateToProps,
    mapDispatchToProps,
  )((EmployeesPage)))),
);
