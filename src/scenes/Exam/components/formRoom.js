import React from 'react';
import {
  Form, Row, Col, Input, DatePicker, Button, InputNumber,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import ToJS from '../../../hoc/ToJS';
import select from '../../../utils/select';
import { createExamRoom } from '../action';

const { Item } = Form;

class FormRoom extends React.Component {
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = [{
          exam_id: this.props.exam.exam[0].exam_id,
          room_place: values.room_place,
          room_name: values.room_name,
          computer_max_amount: values.computer_max_amount,
        }];
        console.log(payload);
        this.props.createNewRoom(payload);
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form>
        <Row gutter={24}>
          <Col span={6}>
            <Item label="Tên phòng thi">
              {getFieldDecorator('room_name', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập tên phòng thi',
                  },
                ],
              })(<Input type="text" placeholder="Tên phòng thi" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Địa điểm">
              {getFieldDecorator('room_place', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập địa điểm',
                  },
                ],
              })(<Input type="text" placeholder="Tên phòng thi" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Số lượng máy tính tối đa">
              {getFieldDecorator('computer_max_amount', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập số máy',
                  },
                ],
              })(<InputNumber min={1} />)}
            </Item>
          </Col>
          <Col span={6}>
            <Button type="primary" style={{ marginTop: 42 }} onClick={this.submit}>Thêm phòng</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  exam: select(state, 'examReducer', 'detail'),
});

const mapDispatchToProps = dispatch => ({
  createNewRoom: (payload, meta) => dispatch(createExamRoom(payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ToJS(FormRoom)));
