import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, notification, Drawer,
} from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import {
  getSubjectsIfNeed, getSubjects, deleteSubject, insertSubject, getSubject, updateSubject,
} from './actions';
import toJS from '../../hoc/ToJS/index';
import TableView from './components/TableView';
import FormSubject from './components/Form';

class SubjectsPage extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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

  handleSubmit = (payload) => {
    this.props.insertSubject(
      payload,
      {
        onSuccess: () => {
          notification.success({ message: 'Thêm phòng thành công' });
        },
        onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
      },
    );
  }

  render() {
    const {
      list, isFetching, history, detail,
    } = this.props;
    return (
      <Row>
        <Row gutter={24}>
          <Col span={14} offset={5}>
            <Drawer
              title="Thêm học phần mới"
              width={500}
              onClose={this.onClose}
              visible={this.state.visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <FormSubject onSubmit={this.handleSubmit} />
            </Drawer>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={14} offset={5}>
            <TableView
              data={list}
              isFetching={isFetching}
              history={history}
              getSubjects={this.onGetAllSubjects}
              getSubject={this.props.getSubject}
              deleteSubject={this.deleteSubject}
              updateSubject={this.props.updateSubject}
              showDrawer={this.showDrawer}
              detail={detail}
            />
          </Col>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  detail: select(state, 'subjectReducer', 'detail'),
  list: select(state, 'subjectReducer', 'list'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
  getSubjects: params => dispatch(getSubjects(params)),
  getSubject: id => dispatch(getSubject(id)),
  insertSubject: (payload, meta) => dispatch(insertSubject(payload, meta)),
  updateSubject: (id, payload, meta) => dispatch(updateSubject(id, payload, meta)),
  deleteSubject: (id, meta) => dispatch(deleteSubject(id, meta)),
});

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(SubjectsPage)));
