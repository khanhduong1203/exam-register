import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification, Col, Row,
} from 'antd';
import select from '../../utils/select';
import {
  getSubject,
  updateSubject,
  deleteSubject,
} from './actions';
import SubjectForm from './components/Form';
import toJS from '../../hoc/ToJS/index';
import ROUTER from '../../constant/router';

class EditSubjectPage extends React.Component {
  componentDidMount() {
    this.props.getSubject(this.props.match.params.id);
  }

  handleSubmit = (id, payload) => {
    this.props.updateSubject(id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhập thành công' });
        this.props.history.push(ROUTER.SUBJECT.INDEX);
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    });
  }

  deleteSubject = (id) => {
    this.props.deleteSubject(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa học phần thành công' });
          this.props.history.replace(ROUTER.SUBJECT.INDEX);
        },
        onError: () => {
          notification.error({ message: 'Xóa học phần thất bại' });
        },
      },
    );
  }

  render() {
    const {
      detail, isFetching,
    } = this.props;
    return (
      <Row>
        <Col span={14} offset={5}>
          <Card
            title="Chi tiết môn học"
            loading={isFetching}
          >
            <SubjectForm
              subject={detail}
              onSubmit={this.handleSubmit}
              onDelete={this.deleteSubject}
              editMode
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  detail: select(state, 'subjectReducer', 'detail'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getSubject: id => dispatch(getSubject(id)),
  updateSubject: (id, payload, meta) => dispatch(updateSubject(id, payload, meta)),
  deleteSubject: (id, meta) => dispatch(deleteSubject(id, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(EditSubjectPage)));
