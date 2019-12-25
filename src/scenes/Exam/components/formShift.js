import React from 'react';
import {
  Form, Row, Col, Input, DatePicker, Button,
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
          start_time: moment(values.start_time).format('YYYY-MM-DD HH:mm:ss'),
          end_time: moment(values.end_time).format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(payload);
        this.props.createNewShift(payload);
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
              })(<DatePicker format="DD-MM-YYYY HH:mm:ss" showTime />)}
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
              })(<DatePicker format="DD-MM-YYYY HH:mm:ss" showTime />)}
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
