/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Layout, Breadcrumb,
} from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import SiderMenu from '../../components/Layout/Sidebar';
import ROUTER from '../../constant/router';
import WithAuthentication from '../../hoc/WithAuthentication';
import './style.css';
import BadgeIcon from '../../components/BadgeIcon';
import Student from '../Student';
import Subject from '../Subject';
import Exam from '../Exam';
import select from '../../utils/select';
import UserWidget from './components/UserWidget';
import ChangePasswordPage from '../Auth/ChangePasswordPage';
import { pushNotification, popNotification } from './action';
import StudentInfo from '../SV_Info';
import ExamRegistration from '../SV_Exam';

const { Content, Header } = Layout;

class AppLayout extends Component {
  handleChangePassword = () => {
    const { history } = this.props;
    history.push(ROUTER.AUTH.CHANGE_PASSWORD);
  }

  render() {
    const {
      user,
      history,
    } = this.props;
    return (
      <Layout
        style={{ minHeight: '100vh' }}
      >
        <SiderMenu history={history} />
        <Content>
          <Header
            style={{
              background: '#082A95',
              padding: '0 25px',
              color: 'white',
            }}
          >
            <div
              style={{
                float: 'right',
                color: 'white',
              }}
            >
              <UserWidget user={user} onChangePassword={this.handleChangePassword} />
            </div>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
              <Exam history={history} />
              <Student history={history} />
              <Subject history={history} />
              <StudentInfo history={history} />
              <ExamRegistration history={history} />
              <Switch>
                <Route path={ROUTER.HOME} exact render={() => <div>abc</div>} />
                <Route exact path={ROUTER.AUTH.CHANGE_PASSWORD} component={ChangePasswordPage} />
              </Switch>
            </div>
          </Content>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  notifications: select(state, ['appReducer'], 'notifications'),
  user: select(state, 'authReducer', 'authUser'),
  userId: select(state, 'authReducer', 'ID'),
  userTypeId: select(state, 'authReducer', 'UserTypeID'),
  role: select(state, 'authReducer', 'role'),
  currentPage: select(state, ['appReducer'], 'currentPage'),
  isAdmin: select(state, 'authReducer', 'isAdmin'),
});

const mapDispatchToProps = dispatch => ({
  popNotification: payload => dispatch(popNotification(payload)),
  pushNotification: payload => dispatch(pushNotification(payload)),
});

export default WithAuthentication(true)(
  connect(mapStateToProps, mapDispatchToProps)(AppLayout),
);
