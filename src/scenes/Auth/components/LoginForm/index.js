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
  onSubmit, form, locale, error, removeError,
}) => {
  const { getFieldDecorator } = form;
  const { trans } = locale;
  return (
    <Form onSubmit={event => handleSubmit(event, form, onSubmit)}>
      <Form.Item
        label={trans('Username')}
        validateStatus={error ? 'error' : undefined}
        help={error ? trans('These credential do not match our records!') : undefined}
      >
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: `${trans('Please input your Username')}!` }],
        })(<Input placeholder={`${trans('Enter your username')} ...`} onChange={() => removeError()} />)}
      </Form.Item>
      <Form.Item label={trans('Password')} validateStatus={error ? 'error' : undefined}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: `${trans('Please input your Password')}!` }],
        })(<Input type="password" placeholder={`${trans('Enter your password')} ...`} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>{trans('Remember me')}</Checkbox>)}
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} icon="login">
          {trans('Log In')}
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  locale: PropTypes.object.isRequired,
  error: PropTypes.bool,
  removeError: PropTypes.func,
};

LoginForm.defaultProps = {
  error: false,
  removeError: () => {},
};

export default Form.create()(LoginForm);
