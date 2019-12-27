import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, notification,
} from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import {
  getSubjectsIfNeed, getSubjects, deleteSubject,
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

  deleteSubject = (id) => {
    this.props.deleteSubject(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa học phần thành công' });
        },
        onError: () => {
          notification.error({ message: 'Xóa học phần thất bại' });
        },
      },
    );
  }

  render() {
    const {
      list, isFetching, history,
    } = this.props;
    return (
      <Row>
        <Col span={14} offset={5}>
          <TableView
            data={list}
            isFetching={isFetching}
            history={history}
            getSubjects={this.onGetAllSubjects}
            onDelete={this.deleteSubject}
          />
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
  deleteSubject: (id, meta) => dispatch(deleteSubject(id, meta)),
});

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(SubjectsPage)));
