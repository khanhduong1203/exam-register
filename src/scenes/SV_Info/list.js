import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'antd';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';

class StudentInfoPage extends Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    // props.getSubjectsIfNeed();
    return state;
  }

  render() {
    const {
      list, isFetching, history,
    } = this.props;
    return (
      <Row>
        <Col span={14} offset={5}>
          a
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  list: select(state, 'subjectReducer', 'list'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  // getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
});

export default WithAuthentication(false)(
  (toJS(connect(
    mapStateToProps,
    mapDispatchToProps,
  )((StudentInfoPage)))),
);
