import React from 'react';
import {
  Form, Row, Col, Input, TimePicker, Button, notification,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import ToJS from '../../../hoc/ToJS';
import select from '../../../utils/select';
import { createExamShift } from '../action';

const { Item } = Form;
class FormShift extends React.Component {
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = {
          exam_id: this.props.exam.exam[0].exam_id,
          exam_shift_name: values.exam_shift_name,
          start_time: moment(values.start_time).format('HH:mm'),
          end_time: moment(values.end_time).format('HH:mm'),
        };
        console.log(payload);
        this.props.createNewShift(
          payload,
          {
            onSuccess: () => {
              notification.success({ message: 'Thêm ca thi thành công' });
              this.props.form.resetFields();
            },
            onError: () => {
              notification.error({ message: 'Thêm ca thi thất bại' });
            },
          },
        );
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form>
        <Row gutter={24}>
          <Col span={6}>
            <Item label="Tên ca thi">
              {getFieldDecorator('exam_shift_name', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập tên ca thi',
                  },
                ],
              })(<Input type="text" placeholder="Tên ca  thi" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Giờ bắt đầu">
              {getFieldDecorator('start_time', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập giờ bắt đầu',
                  },
                ],
              })(<TimePicker format="HH:mm" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Giờ kết thúc">
              {getFieldDecorator('end_time', {
                rules: [
                  {
                    required: true,
                    message: 'Nhập giờ kết thúc',
                  },
                ],
              })(<TimePicker format="HH:mm" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Button type="primary" style={{ marginTop: 42 }} onClick={this.submit}>Thêm ca</Button>
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
  createNewShift: (payload, meta) => dispatch(createExamShift(payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ToJS(FormShift)));
