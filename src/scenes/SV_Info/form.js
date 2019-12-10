import React from 'react';
import { Row, Form, Input } from 'antd';

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
            initialValue: editMode ? user.msv : '',
            rules: [
              {
                required: true,
                message: 'Nhập msv',
              },
            ],
          })(<Input type="text" placeholder="Nhập tên ..." />)}
        </Form.Item>
        <Form.Item label="SĐT">
          {getFieldDecorator('phone', {
            initialValue: editMode ? user.phone : '',
            rules: [
              {
                required: true,
                message: 'Nhập SĐT của bạn',
              },
            ],
          })(<Input type="text" placeholder="Nhập tên ..." />)}
        </Form.Item>
        <Form.Item label="Mail">
          {getFieldDecorator('mail', {
            initialValue: editMode ? user.mail : '',
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

export default Form.create()(UserForm);
