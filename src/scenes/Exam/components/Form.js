import React from 'react';
import {
  Row, Col, Form, Input, DatePicker, Button, TimePicker, InputNumber, Table, Divider, Select,
} from 'antd';
import moment from 'moment';
import ToJS from '../../../hoc/ToJS';
import { ROOM, SUBJECT } from '../../../constant/enum';

const { Item } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

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

const columns = selectRoom => [
  {
    title: <b>STT</b>,
    width: 100,
    fixed: 'left',
    render: (value, record, index) => index + 1,
  },
  {
    title: <b>Tên ca thi</b>,
    dataIndex: 'index',
    width: 100,
    fixed: 'left',
    render: value => `Ca ${value}`,
  },
  {
    title: <b>Phòng thi</b>,
    dataIndex: 'room',
    width: 150,
    render: (value, record) => (
      <Select
        mode="multiple"
        maxTagCount={0}
        defaultValue={value}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={val => selectRoom(val, record.index)}
      >
        {ROOM.map(e => (<Option value={e.id}>{e.name}</Option>))}
      </Select>
    ),
  },
  {
    title: <b>Số máy tối đa</b>,
    width: 150,
    render: (value, record) => getNumberComputer(record.room),
  },
  {
    title: <b>Giờ băt đầu</b>,
    dataIndex: 'start',
    width: 150,
    render: value => <TimePicker defaultValue={moment(value, 'HH:mm')} format="HH:mm" />,
  },
  {
    title: <b>Giờ kết thúc</b>,
    dataIndex: 'end',
    width: 150,
    render: value => <TimePicker defaultValue={moment(value, 'HH:mm')} format="HH:mm" />,
  },
  {
    title: <b>Môn thi</b>,
    dataIndex: 'subject',
    width: 150,
    render: value => (
      <Select
        mode="multiple"
        defaultValue={value}
        maxTagCount={0}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {SUBJECT.map(e => (<Option value={e.id}>{e.name}</Option>))}
      </Select>
    ),
  },
];

class FormExam extends React.Component {
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
    } = this.props;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={8}>
              <Item label="Tên kỳ thi">
                {getFieldDecorator('name', {
                  initialValue: editMode ? exam.name : '',
                  rules: [
                    {
                      // required: true,
                      message: 'Nhập tên kỳ thi',
                    },
                  ],
                })(<Input type="text" />)}
              </Item>
            </Col>
            <Col span={4}>
              <Item label="Số ca thi">
                {getFieldDecorator('shift', {
                  initialValue: editMode ? exam.shift : 1,
                  rules: [
                    {
                      required: true,
                      message: 'Nhập số ca thi',
                    },
                  ],
                })(<InputNumber type="number" min={1} />)}
              </Item>
            </Col>
            <Col span={8}>
              <Item label="Giới hạn thời gian">
                {getFieldDecorator('rangeTime', {
                  initialValue: editMode ? exam.rangeTime : '',
                  rules: [
                    {
                      // required: true,
                      message: 'Nhập khoảng thời gian diễn ra kỳ thi',
                    },
                  ],
                })(<RangePicker />)}
              </Item>
            </Col>
            <Col span={4}>
              <Button type="primary" style={{ width: '100%', marginTop: '40px', float: 'right' }} onClick={this.handleSubmit}>OK</Button>
            </Col>
          </Row>
          <Divider />
          <Row gutter={24}>
            <Col>
              <Table
                columns={columns(selectRoom)}
                dataSource={exam.listShift}
                bordered
                rowKey={r => r.index}
                pagination={false}
                scroll={{ x: 'max-content', y: 500 }}
              />
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default (Form.create()(ToJS(FormExam)));
