import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, Card,
} from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';
import UserForm from './form';

const { Meta } = Card;
class StudentInfoPage extends Component {
  state = {}

  render() {
    const {
      user, isFetching,
    } = this.props;
    console.log(user);
    return (
      <Row gutter={24}>
        <Card
          hoverable
          title="Thông tin cá nhân"
        >
          <Row gutter={24}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Ảnh đại diện" />
              </Card>
            </Col>
            <Col span={8}>
              <UserForm editMode user={user.student_info} />
            </Col>
          </Row>
        </Card>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  list: select(state, 'subjectReducer', 'list'),
  user: select(state, 'authReducer', 'authUser'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  // getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
});

export default WithAuthentication(false)(
  (toJS(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(toJS(StudentInfoPage)))),
);
