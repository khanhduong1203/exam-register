import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';

import ROUTER from '../../constant/router';
import actionContainer from '../../utils/actionContainer';
import select from '../../utils/select';
// import { API_URLS } from '../../config/api';

const { loginWithTokenIfNeed } = actionContainer;

export default function withAuthentication(needAuthenticated) {
  return function withAuthenticationWrappedComponent(WrappedComponent) {
    class Authentication extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      static getDerivedStateFromProps(nextProps) {
        nextProps.loginWithTokenIfNeed();
        return null;
      }

      isValid = (text) => {
        if (text !== null && text !== undefined && text !== '') {
          return true;
        }
        return false;
      }

      render() {
        const {
          isAuthenticated, isFetching, error, role,
        } = this.props;
        if (!needAuthenticated) {
          return <WrappedComponent {...this.props} />;
        }
        if (isAuthenticated) {
          return <WrappedComponent {...this.props} />;
        }
        if (!isAuthenticated && error && !isFetching) {
          return (
            <Redirect to={ROUTER.AUTH.LOGIN} />
          );
        }
        if (isFetching) {
          return (
            <div style={{
              height: '100vh',
              width: '100%',
              display: 'grid',
              placeContent: 'center',
            }}
            >
              <LoadingIndicator />
              <b>KKKKK</b>
            </div>
          );
        }
        return (
        // <Router>
          <Redirect to={ROUTER.AUTH.LOGIN} />
        // </Router>
        );
      }
    }

    function mapStateToProps(state) {
      return {
        isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
        isFetching: select(state, 'authReducer', 'isFetching'),
        error: select(state, 'authReducer', 'error'),
        role: select(state, 'authReducer', 'role'),
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        loginWithTokenIfNeed() {
          dispatch(loginWithTokenIfNeed());
        },
      };
    }

    Authentication.propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    };

    return connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Authentication);
  };
}
