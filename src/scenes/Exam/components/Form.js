import React from 'react';
import {
  Row, Col, Form, Input, DatePicker, Button, TimePicker, InputNumber, Table, Divider, Select, Tabs, List, notification,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import ToJS from '../../../hoc/ToJS';
import { ROOM, SUBJECT } from '../../../constant/enum';
import ImportModal from './ImportModal';
import EditTable from './EditTable';
import FormShift from './formShift';
import FormRoom from './formRoom';
import select from '../../../utils/select';
import {
  updateExamRoom, updateExamShift, deleteExamRoom, deleteExamShift, createStudentSubject,
} from '../action';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

function getNumberComputer(arr) {
  let num = 0;
  if (arr.length > 0) {
    arr.forEach((roomId) => {
      const com = ROOM.filter(r => r.id === roomId);
      if (com.length > 0) {
        num += com[0].maxSlot;
      }
    });
  }
  return num;
}

const columnsSubject = (filteredInfo, sortedInfo, openModal) => [
  {
    title: <b>Tên môn thi</b>,
    dataIndex: 'subject_name',
    key: 'subject_name',
    width: 150,
    // sorter: (a, b) => a.subject_name.localeCompare(b.subject_name),
    // ...this.getColumnSearchProps('subject_name'),
    // sortOrder: sortedInfo.columnKey === 'subject_name' && sortedInfo.order,
    // editable: true,
  },
  {
    title: <b>Mã môn thi</b>,
    dataIndex: 'subject_code',
  },
  {
    title: <b>Danh sách sinh viên</b>,
    render: (value, record) => <Button onClick={() => openModal(record)}>Chọn file</Button>,
  },
];

const columnsSchedule = () => [
  {
    title: <b>Tên môn thi</b>,
    dataIndex: 'subject_name',
  },
  {
    title: <b>Mã môn thi</b>,
    dataIndex: 'subject_code',
  },
  {
    title: <b>Ngày thi</b>,
    dataIndex: 'date',
  },
  {
    title: <b>Ca thi</b>,
    dataIndex: 'exam_shift',
  },
  {
    title: <b>Phòng thi</b>,
    dataIndex: 'exam_room',
  },
  {
    title: <b>Số máy tối đa</b>,
    dataIndex: 'xx',
  },
  {
    title: <b>Số máy trống</b>,
    dataIndex: 'yy',
  },
];
class FormExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: {},
      visible: false,
    };
  }

  onOpenModal = (subject) => {
    this.setState({
      visible: true,
      subject,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.editMode) {
          this.props.onSubmit(
            this.props.exam,
            values,
          );
        } else {
          this.props.onSubmit(values);
        }
      }
    });
  };

  onSaveExamShift = (id, payload) => {
    this.props.saveExamShift(
      id,
      {
        ...payload,
        start_time: payload.start_time.format('HH:mm'),
        end_time: payload.end_time.format('HH:mm'),
      },
      {
        onSuccess: () => {
          notification.success({ message: 'Cập nhật ca thi thành công' });
        },
        onError: () => {
          notification.error({ message: 'Cập nhật ca thi thất bại' });
        },
      },
    );
  }

  onDeleteExamShift = (id) => {
    this.props.deleteExamShift(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa ca thi thành công' });
        },
        onError: () => {
          notification.error({ message: 'Xóa ca thi thất bại' });
        },
      },
    );
  }

  onSaveExamRoom = (id, payload) => {
    this.props.saveExamRoom(
      id,
      payload,
      {
        onSuccess: () => {
          notification.success({ message: 'Cập nhật phòng thi thành công' });
        },
        onError: () => {
          notification.error({ message: 'Cập nhật phòng thi thất bại' });
        },
      },
    );
  }

  onDeleteExamRoom = (id) => {
    this.props.deleteExamRoom(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa phòng thi thành công' });
        },
        onError: () => {
          notification.error({ message: 'Xóa phòng thi thất bại' });
        },
      },
    );
  }

  createStudentSubject = (payload) => {
    this.props.createStudentSubject(
      payload,
      {
        onSuccess: () => {
          notification.success({ message: 'Thêm danh sách thành công' });
          this.setState({ visible: false });
        },
        onError: () => {
          notification.error({ message: 'Thêm danh sách thất bại' });
        },
      },
    );
  }

  render() {
    const {
      form: { getFieldDecorator },
      editMode,
      exam,
      selectRoom,
      listSubject,
      students,
    } = this.props;
    const { subject } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col>
              <Tabs>
                <TabPane key="exam-info" tab="Thông tin kì thi">
                  <Tabs type="card">
                    <TabPane key="exam-shift" tab="Danh sách ca thi">
                      <FormShift exam={exam} />
                      <EditTable
                        data={exam.exam_shift}
                        name="shift"
                        saveRow={this.onSaveExamShift}
                        deleteRow={this.onDeleteExamShift}
                      />
                    </TabPane>
                    <TabPane key="exam-room" tab="Danh sách phòng thi">
                      <FormRoom exam={exam} />
                      <EditTable
                        data={exam.exam_room}
                        name="room"
                        saveRow={this.onSaveExamRoom}
                        deleteRow={this.onDeleteExamRoom}
                      />
                    </TabPane>
                    <TabPane key="exam-subject" tab="Danh sách môn thi">
                      <Table
                        columns={columnsSubject('', '', this.onOpenModal)}
                        dataSource={listSubject}
                        bordered
                        rowKey={r => r.subject_id}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                      />
                    </TabPane>
                  </Tabs>
                </TabPane>
                <TabPane key="exam-schedule" tab="Lịch thi">
                  <Table
                    dataSource={[]}
                    columns={columnsSchedule()}
                    rowKey={r => r.subject_id}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 500 }}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Form>
        <ImportModal
          visible={this.state.visible}
          students={students}
          subject={subject}
          closeModal={() => this.setState({ visible: false, subject: {} })}
          onSubmit={this.createStudentSubject}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  exam: select(state, 'examReducer', 'detail'),
  students: select(state, 'studentReducer', 'list'),
});

const mapDispatchToProps = dispatch => ({
  saveExamShift: (id, payload, meta) => dispatch(updateExamShift(id, payload, meta)),
  saveExamRoom: (id, payload, meta) => dispatch(updateExamRoom(id, payload, meta)),
  deleteExamShift: (id, meta) => dispatch(deleteExamShift(id, meta)),
  deleteExamRoom: (id, payload, meta) => dispatch(deleteExamRoom(id, payload, meta)),
  createStudentSubject: (payload, meta) => dispatch(createStudentSubject(payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ToJS(FormExam)));
