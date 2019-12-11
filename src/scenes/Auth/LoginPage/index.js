/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import Login from './wrapper';
import { login } from '../action';

import select from '../../../utils/select';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    const { history, forwardLocation, isAuthenticated } = nextProps;
    if (isAuthenticated) {
      if (forwardLocation.size) {
        history.push(forwardLocation.get('pathname'));
      } else {
        history.push('/');
      }
    }
    return null;
  }

    doLogin = (values) => {
      const { username, password, remember } = values;
      this.props.login(username, password, remember);
    };

    render() {
      const { isFetching, error } = this.props;
      return (
        <Row>
          <Col sm={{ span: 16, offset: 4 }} lg={{ span: 6, offset: 9 }}>
            <div style={{ marginTop: 100 }}>
              <Login
                error={error}
                isFetching={isFetching}
                doLogin={values => this.doLogin(values)}
              />
            </div>
          </Col>
        </Row>
      );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
  isFetching: select(state, 'authReducer', 'isFetching'),
  forwardLocation: select(state, 'authReducer', 'forwardLocation'),
  error: select(state, 'authReducer', 'error'),
});

const mapDispatchToProps = dispatch => ({
  login: (username, password, remember) => dispatch(login(username, password, remember)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
