import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import {
  getSubjectsIfNeed, getSubjects,
} from './actions';
import toJS from '../../hoc/ToJS/index';
import TableView from './components/TableView';

class SubjectsPage extends Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    props.getSubjectsIfNeed();
    return state;
  }

  onGetAllSubjects = () => {
    this.props.getSubjects();
  }

  render() {
    const {
      list, isFetching, history,
    } = this.props;
    return (
      <Row>
        <Col span={14} offset={5}>
          <TableView data={list} isFetching={isFetching} history={history} getSubjects={this.onGetAllSubjects} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  list: select(state, 'subjectReducer', 'list'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
  getSubjects: params => dispatch(getSubjects(params)),
});

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(SubjectsPage)));
