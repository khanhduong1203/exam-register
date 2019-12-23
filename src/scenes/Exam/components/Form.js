import React from 'react';
import {
  Row, Col, Form, Input, DatePicker, Button, TimePicker, InputNumber, Table, Divider, Select, Tabs, List,
} from 'antd';
import moment from 'moment';
import ToJS from '../../../hoc/ToJS';
import { ROOM, SUBJECT } from '../../../constant/enum';
import ImportModal from './ImportModal';
import EditTable from './EditTable';

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
    title: <b>Ca thi</b>,
    dataIndex: 'exam_shift',
  },
  {
    title: <b>Phòng thi</b>,
    dataIndex: 'exam_room',
  },
  {
    title: <b>Số máy tối đa</b>,
    dataIndex: 'exam_room',
  },
  {
    title: <b>Số máy trống</b>,
    dataIndex: 'exam_room',
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

  render() {
    const {
      form: { getFieldDecorator },
      editMode,
      exam,
      selectRoom,
      listSubject,
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
                      <EditTable
                        data={exam.exam_shift}
                        name="shift"
                      />
                      {/* <Table
                        columns={columns(selectRoom)}
                        dataSource={exam.exam_shift}
                        bordered
                        rowKey={r => r.index}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                        footer={() => (
                          <Button type="primary">Cập nhật</Button>
                        )}
                      /> */}
                    </TabPane>
                    <TabPane key="exam-room" tab="Danh sách phòng thi">
                      <EditTable
                        data={exam.exam_room}
                        name="room"
                      />
                      {/* <Table
                        columns={columnsRoom()}
                        dataSource={exam.exam_room}
                        bordered
                        rowKey={r => r.exam_room_id}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                      /> */}
                    </TabPane>
                    <TabPane key="exam-subject" tab="Danh sách môn thi">
                      <EditTable
                        data={listSubject}
                        name="subject"
                      />
                      {/* <Table
                        columns={columnsSubject(this.onOpenModal)}
                        dataSource={exam.subject}
                        bordered
                        rowKey={r => r.subject_id}
                        pagination={false}
                        scroll={{ x: 'max-content', y: 500 }}
                      /> */}
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
          subject={subject}
          closeModal={() => this.setState({ visible: false, subject: {} })}
        />
      </React.Fragment>
    );
  }
}

export default (Form.create()(ToJS(FormExam)));
