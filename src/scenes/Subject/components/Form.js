/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Radio, Form, Input, Select, Button, Row, Col, Modal, InputNumber,
} from 'antd';

import ToJS from '../../../hoc/ToJS/index';

const { Item } = Form;

class RoomForm extends Component {
  onDelete = (subject) => {
    Modal.confirm({
      okText: 'Xoá phòng',
      okButtonProps: { type: 'danger' },
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'primary' },
      title: `Bạn chắc chắn xoá ${subject.subject_name}`,
      content: 'Phòng và mọi thông tin liên quan sẽ bị xoá khỏi hệ thống !',
      onOk: () => this.props.onDelete(subject.subject_id),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.editMode) {
          this.props.onSubmit(
            this.props.subject.subject_id,
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
      subject,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Tên môn học">
              {getFieldDecorator('subject_name', {
                initialValue: editMode ? subject.subject_name : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập tên môn học',
                  },
                ],
              })(<Input type="text" placeholder="Tên môn học" />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Mã môn học">
              {getFieldDecorator('subject_code', {
                initialValue: editMode ? subject.subject_code : '',
                rules: [
                  {
                    required: false,
                    message: 'Nhập mã phòng',
                  },
                ],
              })(<Input type="text" placeholder="Mã môn học" />)}
            </Item>
          </Col>
        </Row>
        <Item>
          {editMode ? (
            <Button
              ghost
              style={{ border: 'none' }}
              type="danger"
              onClick={() => this.onDelete(subject)}
            >
              Xoá
            </Button>
          ) : null}
          <Button style={{ float: 'right' }} icon="plus" type="primary" htmlType="submit">
            {editMode ? 'Hoàn thành' : 'Thêm môn học'}
          </Button>
        </Item>
      </Form>
    );
  }
}

RoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  editMode: PropTypes.bool,
  subject: PropTypes.object,
  form: PropTypes.object.isRequired,
};

RoomForm.defaultProps = {
  onDelete: () => { },
  editMode: false,
  subject: {},
};

export default (Form.create()(ToJS(RoomForm)));
