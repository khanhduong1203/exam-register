/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar, Divider, Modal,
} from 'antd';
import UserDropdown from '../../../components/UserDropdown';
import BadgeIcon from '../../../components/BadgeIcon';
import actionContainer from '../../../utils/actionContainer';
import logo from '../../../images/default_avatar.jpg';

const { logOut } = actionContainer;

class UserWidget extends Component {
    languageOnChange = (languageKey) => {
      this.props.locale.setLanguage(languageKey);
    };

    logOut = () => {
      Modal.confirm({
        title: 'Bạn muốn đăng xuất?',
        okText: 'Đồng ý',
        cancelText: 'Không',
        onOk: () => {
          this.props.logOut();
        },
        onCancel() {},
      });
    };

    handleChangePassword = () => {
      this.props.onChangePassword();
    };

    render() {
      const { user } = this.props;
      return (
        <Fragment>
          <span style={{ marginRight: 10 }}>
            Xin chào,
            <b>{user.get('userName')}</b>
            !
          </span>
          <UserDropdown onClick={this.handleChangePassword}>
            <Avatar
              src={logo}
            />
          </UserDropdown>
          <Divider type="vertical" />
          <Divider type="vertical" />

          <BadgeIcon count={0} icon="logout" name="Đăng xuất" onClick={() => this.logOut()} />
        </Fragment>
      );
    }
}

UserWidget.propTypes = {};

BadgeIcon.propTypes = {
  width: PropTypes.number,
  count: PropTypes.number,
  icon: PropTypes.string,
  name: PropTypes.string,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((UserWidget));
