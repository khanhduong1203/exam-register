/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Radio, Form, Input, Select, Button, Row, Col, Modal, DatePicker,
} from 'antd';

import moment from 'moment';
import ToJS from '../../../hoc/ToJS/index';

const { Item } = Form;
const { Option } = Select;
const RadioGroup = Radio.Group;

class StudentForm extends Component {
  onDelete = (student) => {
    Modal.confirm({
      okText: 'Xoá nhân viên',
      okButtonProps: { type: 'danger' },
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'primary' },
      title: `Bạn chắc chắn xoá nhân viên ${student.name}`,
      content: 'Tài khoản và mọi thông tin liên quan sẽ bị xoá khỏi hệ thống !',
      onOk: () => this.props.onDelete(student),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.editMode) {
          this.props.onSubmit(
            this.props.student.student_id,
            { ...values, date_birth: values.date_birth.format('DD-MM-YYYY') },
          );
        } else {
          this.props.onSubmit({ ...values, date_birth: values.date_birth.format('DD-MM-YYYY') });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      editMode,
      student,
    } = this.props;
    // console.log(moment(student.date_birth).format('DD-MM-YYYY'));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Họ và tên">
              {getFieldDecorator('name', {
                initialValue: editMode ? student.name : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập tên nhân viên',
                  },
                ],
              })(<Input type="text" placeholder="Họ và tên" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Mã sinh viên">
              {getFieldDecorator('student_code', {
                initialValue: editMode ? student.student_code : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập mã sinh viên',
                  },
                ],
              })(<Input type="text" placeholder="msv" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Lớp">
              {getFieldDecorator('class', {
                initialValue: editMode ? student.class : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập lớp',
                  },
                ],
              })(<Input type="text" placeholder="Lớp" />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Item label="Giới tính">
              {getFieldDecorator('gender', { initialValue: editMode ? student.gender : '' })(
                <RadioGroup>
                  <Radio key={1} value="Nam">Nam</Radio>
                  <Radio key={2} value="Nữ">Nữ</Radio>
                </RadioGroup>,
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Ngày sinh">
              {getFieldDecorator('date_birth',
                { initialValue: editMode ? moment(student.date_birth, 'DD-MM-YYYY') : '' })(
                  <DatePicker format="DD-MM-YYYY" />,
              )}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Email">
              {getFieldDecorator('email', { initialValue: editMode ? student.email : '' })(<Input type="text" placeholder="Email" />)}
            </Item>
          </Col>
          <Col span={6}>
            <Item label="Số điện thoại">
              {getFieldDecorator('phone_number', {
                initialValue: editMode ? student.phone_number : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập số điện thoại sinh viên',
                  },
                ],
              })(<Input type="text" placeholder="Số điện thoại" />)}
            </Item>
          </Col>
        </Row>
        <Item>
          {editMode ? (
            <Button
              ghost
              style={{ border: 'none' }}
              type="danger"
              onClick={() => this.onDelete(student)}
            >
              Xoá
            </Button>
          ) : null}
          <Button style={{ float: 'right' }} icon="plus" type="primary" htmlType="submit">
            {editMode ? 'Hoàn thành' : 'Thêm sinh viên'}
          </Button>
        </Item>
      </Form>
    );
  }
}

StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  editMode: PropTypes.bool,
  student: PropTypes.object,
  form: PropTypes.object.isRequired,
};

StudentForm.defaultProps = {
  onDelete: () => { },
  editMode: false,
  student: {},
};

export default (Form.create()(ToJS(StudentForm)));
