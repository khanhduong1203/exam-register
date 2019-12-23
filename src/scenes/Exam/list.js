
import React from 'react';
import {
  Row, Col, Table, Button, Divider, Select, Modal, Form, InputNumber, Input, notification,
} from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';
import withAuthentication from '../../hoc/WithAuthentication';
import { getSubjectsIfNeed } from '../Subject/actions';
import { getStudentsIfNeed } from '../Student/actions';
import ROUTER from '../../constant/router';
import { getExamsIfNeed, createExam, getExam } from './action';
import FormExam from './components/Form';

const { Option } = Select;
const { Item } = Form;
class ListExamPage extends React.Component {
  state = {
    openModal: false,
  }

  static getDerivedStateFromProps(props, state) {
    props.getAllExamsIfNeed();
    props.getSubjectsIfNeed();
    props.getStudentsIfNeed();
    return state;
  }

  createNewExam = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createExam(
          values,
          {
            onSuccess: () => {
              notification.success({ message: 'Tạo kì thi thành công' });
            },
            onError: () => {
              notification.error({ message: 'Không tạo được kì thi này' });
            },
          },
        );
      }
    });
  }

  selectExam = (id) => {
    this.props.getExam(id);
  }

  render() {
    const { openModal } = this.state;
    const {
      exam, list, form: { getFieldDecorator }, listSubject,
    } = this.props;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={8}>
            <p>Chọn kì thi</p>
            <Select style={{ width: '100%' }} onSelect={this.selectExam}>
              {list.map(item => <Option value={item.exam_id}>{`${item.exam_name} - Năm học ${item.school_year}`}</Option>)}
            </Select>
          </Col>
          <Col>
            <Button style={{ float: 'right' }} onClick={() => this.setState({ openModal: true })} type="primary">+ Tạo kì thi mới</Button>
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col>
            <FormExam
              exam={exam}
              listSubject={listSubject}
            />
          </Col>
        </Row>
        <Modal
          visible={openModal}
          title="Tạo kì thi mới"
          footer={null}
        >
          <Row gutter={24}>
            <Form>
              <Col span={16}>
                <Item label="Tên kỳ thi">
                  {getFieldDecorator('exam_name', {
                    initialValue: exam.exam_name,
                    rules: [
                      {
                        required: false,
                        message: 'Nhập tên kỳ thi',
                      },
                    ],
                  })(<Input type="text" />)}
                </Item>
              </Col>
              <Col span={8}>
                <Item label="Năm học">
                  {getFieldDecorator('school_year', {
                    initialValue: exam.school_year,
                    rules: [
                      {
                        required: true,
                        message: 'Nhập số ca thi',
                      },
                    ],
                  })(<Input type="text" />)}
                </Item>
              </Col>
            </Form>
          </Row>
          <Divider />
          <Item>
            <Row gutter={24}>
              <Col span={16} />
              <Col span={4}>
                <Button type="primary" onClick={this.createNewExam}>Tạo</Button>
              </Col>
              <Col span={4}>
                <Button onClick={() => this.setState({ openModal: false })}>Hủy</Button>
              </Col>
            </Row>
          </Item>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  list: select(state, 'examReducer', 'list'),
  exam: select(state, 'examReducer', 'detail'),
  listSubject: select(state, 'subjectReducer', 'list'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getAllExamsIfNeed: params => dispatch(getExamsIfNeed(params)),
  getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
  getStudentsIfNeed: params => dispatch(getStudentsIfNeed(params)),
  createExam: (payload, meta) => dispatch(createExam(payload, meta)),
  getExam: (id, meta) => dispatch(getExam(id, meta)),
});

export default
(Form.create()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(ListExamPage))));
