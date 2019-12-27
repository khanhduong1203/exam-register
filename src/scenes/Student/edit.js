import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification,
} from 'antd';
import select from '../../utils/select';
import {
  getStudent,
  updateStudent,
  deleteStudent,
} from './actions';
import StudentForm from './components/Form';
import toJS from '../../hoc/ToJS/index';
import ROUTER from '../../constant/router';

class EditStudentPage extends React.Component {
  componentDidMount() {
    this.props.getStudent(this.props.match.params.id);
  }

  handleSubmit = (id, payload) => {
    this.props.updateStudent(id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhập thành công' });
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    });
  }

  deleteStudent = (id) => {
    this.props.deleteStudent(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa sinh viên thành công' });
          this.props.history.replace(ROUTER.STUDENT.INDEX);
        },
        onError: () => {
          notification.error({ message: 'Xóa sinh viên thất bại' });
        },
      },
    );
  }

  render() {
    const {
      detail, isFetching,
    } = this.props;
    return (
      <Card
        title="Thông tin sinh viên"
        loading={isFetching}
      >
        <StudentForm
          student={detail}
          onSubmit={this.handleSubmit}
          onDelete={this.deleteStudent}
          editMode
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  detail: select(state, 'studentReducer', 'detail'),
  isFetching: select(state, 'studentReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getStudent: id => dispatch(getStudent(id)),
  updateStudent: (id, payload, meta) => dispatch(updateStudent(id, payload, meta)),
  deleteStudent: (id, meta) => dispatch(deleteStudent(id, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(EditStudentPage)));
