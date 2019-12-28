import React from 'react';
import { Row, Form, Input } from 'antd';
import ToJS from '../../hoc/ToJS';

class UserForm extends React.Component {
  render() {
    const { form: { getFieldDecorator }, editMode, user } = this.props;
    return (
      <Form>
        <Form.Item label="Tên">
          {getFieldDecorator('name', {
            initialValue: editMode ? user.name : '',
            rules: [
              {
                required: true,
                message: 'Nhập tên của bạn',
              },
            ],
          })(<Input type="text" placeholder="Nhập tên ..." />)}
        </Form.Item>
        <Form.Item label="MSV">
          {getFieldDecorator('msv', {
            initialValue: editMode ? user.student_code : '',
            rules: [
              {
                required: true,
                message: 'Nhập msv',
              },
            ],
          })(<Input type="text" placeholder="Nhập tên ..." />)}
        </Form.Item>
        <Form.Item label="SĐT">
          {getFieldDecorator('phone_number', {
            initialValue: editMode ? user.phone_number : '',
            rules: [
              {
                required: true,
                message: 'Nhập SĐT của bạn',
              },
            ],
          })(<Input type="text" placeholder="Nhập tên ..." />)}
        </Form.Item>
        <Form.Item label="Mail">
          {getFieldDecorator('email', {
            initialValue: editMode ? user.email : '',
            rules: [
              {
                required: true,
                message: 'Nhập mail của bạn',
              },
            ],
          })(<Input type="text" placeholder="Nhập mail ..." />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ToJS(UserForm));
