import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification,
} from 'antd';
import select from '../../utils/select';
import {
  insertStudent,
} from './actions';
import StudentForm from './components/Form';
import toJS from '../../hoc/ToJS/index';

class AddStudentPage extends React.Component {
  handleSubmit = (payload) => {
    console.log(payload);
    this.props.insertStudent(
      payload,
      {
        onSuccess: () => {
          notification.success({ message: 'Cập nhập thành công' });
        },
        onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
      },
    );
  }

  render() {
    const {
      isFetching,
    } = this.props;
    return (
      <Card
        title="Thêm sinh viên"
      >
        <StudentForm
          onSubmit={this.handleSubmit}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: select(state, 'studentReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  insertStudent: (payload, meta) => dispatch(insertStudent(payload, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(AddStudentPage)));
