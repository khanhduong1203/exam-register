import React from 'react';

import {
  Layout, Avatar, Menu, Icon, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constant/router';
import logo from '../../../images/uet.jpg';

const {
  Sider,
} = Layout;

class SiderMenu extends React.Component {
  state = { collapsed: false }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { history, logOut, role } = this.props;
    const { collapsed } = this.state;
    const pathname = history.location.pathname.split('/')[1];
    const key = pathname.length > 0 ? pathname : 'home';
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <Avatar
          src={logo}
          size="large"
          style={!collapsed ? {
            margin: 45, verticalAlign: 'middle', width: 100, height: 100,
          } : {
            margin: 18, verticalAlign: 'middle', width: 40, height: 40,
          }}
          shape="square"
        />
        {role === 'admin' ? (
          <Menu theme="light" defaultSelectedKeys={[key]} mode="inline">
            <Menu.Item key="home">
              <Link to={ROUTER.HOME}>
                <Icon type="home" />
                <span>Trang chủ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="student">
              <Link to={ROUTER.STUDENT.INDEX}>
                <Icon type="user" />
                <span>Quản lý sinh viên</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="subject">
              <Link to={ROUTER.SUBJECT.INDEX}>
                <Icon type="hdd" />
                <span>Quản lý môn học</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="exam">
              <Link to={ROUTER.EXAM.INDEX}>
                <Icon type="history" />
                <span>Kỳ thi</span>
              </Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu theme="light" defaultSelectedKeys={[key]} mode="inline">
            <Menu.Item key="home">
              <Link to={ROUTER.HOME}>
                <Icon type="home" />
                <span>Trang chủ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="student-info">
              <Link to={ROUTER.STUDENT_INFO.INDEX}>
                <Icon type="user" />
                <span>Thông tin cá nhân</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="exam-registration">
              <Link to={ROUTER.EXAM_REGISTRATION.INDEX}>
                <Icon type="solution" />
                <span>Đăng ký thi</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="log-out">
            <Button type="danger" onClick={() => logOut()}>
              <Icon type="logout" />
              <span>Đăng xuất</span>
            </Button>
          </Menu.Item> */}
          </Menu>
        )}
      </Sider>
    );
  }
}

export default SiderMenu;
