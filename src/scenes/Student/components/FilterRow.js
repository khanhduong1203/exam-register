/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Select, DatePicker, Button, Form, Input,
} from 'antd';
import moment from 'moment';
import ToJS from '../../../hoc/ToJS/index';
import ROUTER from '../../../constant/router';

const { Option } = Select;
const { Item } = Form;

class FilterRow extends React.Component {
  state = { filterOptions: null }

  // static getDerivedStateFromProps(props, state) {
  //   const { filterOptions } = props;
  //   let values;
  //   if (filterOptions !== state.filterOptions) {
  //     if (filterOptions !== undefined) {
  //       values = JSON.parse(filterOptions);
  //       const {
  //         require_time, order_code, cart_code, customer_code, status,
  //       } = values;
  //       props.form.setFieldsValue({
  //         require_time: moment(require_time), order_code, cart_code, customer_code, status,
  //       });
  //     } else {
  //       props.form.resetFields();
  //     }
  //     return { ...state, filterOptions };
  //   }
  //   return state;
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const urlParameters = [];
        Object.entries(values).map((e) => {
          if (e[1] !== undefined && e[1] !== '' && e[1] !== null) {
            urlParameters.push(e.join('='));
          }
        });

        if (urlParameters[0] !== false) {
          this.props.onFilter(values);
          this.props.history.push(ROUTER.EMPLOYEE.INDEX.concat(`?${urlParameters.join('&')}`));
        }
      } else {
        console.log(err);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.history.push(ROUTER.EMPLOYEE.INDEX);
  }

  render() {
    const { disabled, form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col span={8}>
          <Item label="Tên" style={{ display: 'flex' }}>
            {
            getFieldDecorator('name')(
              <Input
                allowClear
                style={{ width: '100%' }}
                disabled={disabled}
                placeholder="Tên"
              />,
            )
          }
          </Item>
        </Col>
        <Col span={8}>
          <Item label="Chức vụ" style={{ display: 'flex' }}>
            {
            getFieldDecorator('job')(
              <Input
                allowClear
                style={{ width: '100%' }}
                disabled={disabled}
                placeholder="Chức vụ"
              />,
            )
          }
          </Item>
        </Col>
        <Col span={4}>
          <Button icon="filter" disabled={disabled} type="primary" htmlType="submit" style={{ width: '100%' }}>
            {'Lọc'}
          </Button>
        </Col>
        <Col span={4}>
          <Button icon="close" disabled={disabled} onClick={this.handleReset} style={{ width: '100%' }}>
            {'Bỏ lọc'}
          </Button>
        </Col>
      </Form>
    );
  }
}

FilterRow.propTypes = {
  disabled: PropTypes.bool,
  form: PropTypes.object.isRequired,
};

export default ToJS(Form.create()(FilterRow));
