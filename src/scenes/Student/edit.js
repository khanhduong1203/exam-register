import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification,
} from 'antd';
import select from '../../utils/select';
import {
  getStudent,
  updateStudent,
} from './actions';
import StudentForm from './components/Form';
import toJS from '../../hoc/ToJS/index';

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(EditStudentPage)));
