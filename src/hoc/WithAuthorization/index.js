import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Router } from 'react-router-dom';
import ROUTER from '../../constant/router';
import select from '../../utils/select';

const disabledStyle = {
  pointerEvents: 'none',
  opacity: 0.4,
};

const WithAuthorizationHOC = () => (WrappedComponent) => {
  class Authorization extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: true,
        disabled: false,
        redirect: false,
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      return prevState;
    }

    render() {
      const { visible, disabled, redirect } = this.state;
      if (redirect) {
        return (
          <Redirect to={ROUTER.NOT_FOUND} />

        );
      }
      if (visible) {
        if (typeof WrappedComponent === 'object') {
          return (
            <div style={disabled ? disabledStyle : null}>
              {WrappedComponent}
            </div>
          );
        }
        return (
          <div style={disabled ? disabledStyle : null}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }
      return null;
    }
  }

  const mapStateToProps = state => ({
    availableApis: select(state, 'authReducer', 'apis'),
  });

  return connect(mapStateToProps)(Authorization);
};

export default WithAuthorizationHOC;
