import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification, Col,
} from 'antd';
import select from '../../utils/select';
import {
  insertSubject,
} from './actions';
import RoomForm from './components/Form';
import toJS from '../../hoc/ToJS/index';

class AddRoomPage extends React.Component {
  handleSubmit = (payload) => {
    this.props.insertRoom(
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
      isFetching,
    } = this.props;
    return (
      <Col span={14} offset={5}>
        <Card
          title="Thêm môn học"
          loading={isFetching}
        >
          <RoomForm
            onSubmit={this.handleSubmit}
          />
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  insertSubject: (payload, meta) => dispatch(insertSubject(payload, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(AddRoomPage)));
