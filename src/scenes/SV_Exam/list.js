import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, Table, Icon, Select, notification,
} from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';

const columns = shifts => [
  {
    title: <b>STT</b>,
    width: 100,
    render: (v, r, i) => i + 1,
  },
  {
    title: <b>Tên</b>,
    dataIndex: 'name',
    width: 200,
  },
  {
    title: <b>Mã học phần</b>,
    dataIndex: 'code',
    width: 200,
  },
  {
    title: <b>Ngày thi</b>,
    dataIndex: 'day',
    width: 150,
    render: value => value.format('DD-MM-YYYY'),
  },
  {
    title: <b>Ca thi</b>,
    dataIndex: 'shift',
    align: 'center',
    width: 200,
    render: (value, record) => (
      <Select
        width={100}
        defaultValue={value}
      >
        {shifts.map(s => (
          <Select.Option value={s.id}>{s.name}</Select.Option>
        ))}
      </Select>
    ),
  },
  {
    title: <b>Bắt đầu</b>,
    width: 100,
    align: 'center',
    dataIndex: 'start',
  },
  {
    title: <b>Kết thúc</b>,
    width: 100,
    align: 'center',
    dataIndex: 'end',
  },
  {
    title: <b>Trạng thái</b>,
    dataIndex: 'status',
    align: 'center',
    width: 100,
    render: (value, record) => (
      value === true ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#FA3718" />
    ),
  },
];

class StudentExamPage extends Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    // props.getSubjectsIfNeed();
    return state;
  }

  onRegist = () => {
    notification.success({ message: 'Đăng ký thành công !' });
  }

  render() {
    const {
      exam, isFetching,
    } = this.props;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={24}>
            <Table
              title={() => (
                <Row gutter={24}>
                  <Col span={8}><p style={{ display: 'inline-block' }}>Danh sách môn thi</p></Col>
                  <Col span={8}><p style={{ display: 'inline-block' }}>{`Kỳ thi: ${exam.name}`}</p></Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      style={{ float: 'right', marginRight: '10px', display: 'inline-block' }}
                      onClick={() => this.onRegist()}
                    >
                      {'Đăng ký'}
                    </Button>
                  </Col>
                </Row>
              )}
              bordered
              dataSource={exam.subjects}
              columns={columns(exam.shifts)}
              loading={isFetching}
              pagination={false}
              scroll={{ x: 'max-content', y: 'max-content' }}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  exam: select(state, 'examRegistrationReducer', 'detail'),
  isFetching: select(state, 'examRegistrationReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  // getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
});

export default WithAuthentication(false)(
  ((connect(
    mapStateToProps,
    mapDispatchToProps,
  )(toJS(StudentExamPage)))),
);
