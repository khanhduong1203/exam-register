
import React from 'react';
import {
  Row, Col, Table, Button, Divider, Select,
} from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';
import withAuthentication from '../../hoc/WithAuthentication';
import { getSubjectsIfNeed } from '../Subject/actions';
import { getStudentsIfNeed } from '../Student/actions';
import ROUTER from '../../constant/router';

const { Option } = Select;

class ListExamPage extends React.Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    props.getSubjectsIfNeed();
    props.getStudentsIfNeed();
    return state;
  }

  render() {
    const { history, list } = this.props;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={8}>
            <p>Chọn kì thi</p>
            <Select style={{ width: '100%' }}>
              {list.map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
          </Col>
          <Col>
            <Button style={{ float: 'right' }} onClick={() => history.push(ROUTER.EXAM.ADD)} type="primary">+ Tạo kì thi mới</Button>
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col>
            <Table
              dataSource={[]}
              bordered
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  list: select(state, 'examReducer', 'list'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
  getStudentsIfNeed: params => dispatch(getStudentsIfNeed(params)),
});

export default withAuthentication(false)(
  ((connect(
    mapStateToProps,
    mapDispatchToProps,
  )(toJS(ListExamPage)))),
);
