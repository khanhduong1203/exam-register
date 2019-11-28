/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Form, Input, Button,
} from 'antd';

import actionContainer from '../../../utils/actionContainer';
import { changePassword } from '../action';

import Card from '../../../components/Card';
import ROUTER from '../../../constant/router';

const { pushNotification } = actionContainer;

class ChangePassPage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      locale: { trans },
    } = this.props;
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.changePassword(
          {
            ConfirmPasswd: values.ConfirmPasswd,
            NewPasswd: values.NewPasswd,
            OldPasswd: values.OldPasswd,
          },
          {
            onSuccess: () => {
              this.props.pushNotification({
                message: trans('Update password succeeded'),
                type: 'success',
              });
              this.props.history.push(ROUTER.HOME);
            },
            onError: (error) => {
              this.props.pushNotification({
                message: `${trans('Update password failed')} - ${error}`,
                type: 'error',
              });
            },
          },
        );
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      locale: { trans },
    } = this.props;
    return (
      <Row>
        <Col sm={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }}>
          <Card hoverable={false} hasShadow>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label={trans('Old Password')}>
                {getFieldDecorator('OldPasswd', {
                  rules: [
                    {
                      required: true,
                      message: `${trans('Please input your old Password')}!`,
                    },
                  ],
                })(<Input type="password" placeholder={`${trans('Enter your password')} ...`} />)}
              </Form.Item>
              <Form.Item label={trans('New Password')}>
                {getFieldDecorator('NewPasswd', {
                  rules: [
                    {
                      required: true,
                      message: `${trans('Please input your new Password')}!`,
                    },
                  ],
                })(<Input type="password" placeholder={`${trans('Enter your password')} ...`} />)}
              </Form.Item>
              <Form.Item label={trans('Confirm Password')}>
                {getFieldDecorator('ConfirmPasswd', {
                  rules: [
                    {
                      required: true,
                      message: `${trans('Please input your confirm Password')}!`,
                    },
                  ],
                })(<Input type="password" placeholder={`${trans('Enter your password')} ...`} />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} icon="login">
                  {trans('Confirm')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changePassword: (payload, meta) => dispatch(changePassword(payload, meta)),
  pushNotification: payload => dispatch(pushNotification(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((Form.create()(ChangePassPage)));
