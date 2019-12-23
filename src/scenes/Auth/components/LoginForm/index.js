import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Input, Checkbox,
} from 'antd';
import './index.css';

const handleSubmit = (event, form, onSubmit) => {
  event.preventDefault();
  form.validateFields((error, values) => {
    if (!error) {
      onSubmit(values);
    }
  });
};

const LoginForm = ({
  onSubmit, form, error, removeError,
}) => {
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={event => handleSubmit(event, form, onSubmit)}>
      <Form.Item
        label="Tên đăng nhập"
        validateStatus={error ? 'error' : undefined}
        help={error ? 'Những thông tin không phù hợp với hồ sơ của chúng tôi!' : undefined}
      >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Hãy nhập tên đăng nhập của bạn !' }],
        })(<Input placeholder="Nhập tên đăng nhập của bạn ..." onChange={() => removeError()} />)}
      </Form.Item>
      <Form.Item label="Mật khẩu" validateStatus={error ? 'error' : undefined}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Hãy nhập mật khẩu của bạn' }],
        })(<Input type="password" placeholder="Nhập vào mật khẩu" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Ghi nhớ tôi</Checkbox>)}
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} icon="login">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.bool,
  removeError: PropTypes.func,
};

LoginForm.defaultProps = {
  error: false,
  removeError: () => {},
};

export default Form.create()(LoginForm);
