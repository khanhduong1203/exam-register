import React from 'react';

import {
  Layout, Avatar, Menu, Icon, Badge, Modal, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constant/router';
import logo from '../../../images/uet.jpg';
import UserDropdown from '../../UserDropdown';

const {
  Sider,
} = Layout;
const { confirm } = Modal;
class SiderMenu extends React.Component {
  state = { collapsed: false }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  showConfirm(logOut) {
    confirm({
      title: 'Bạn muốn đăng xuất?',
      content: 'Hãy chắc chắn điều này',
      onOk() {
        logOut();
      },
    });
  }

  handleChangePassword = () => {
    const { history } = this.props;
    history.push(ROUTER.AUTH.CHANGE_PASSWORD);
  };

  render() {
    const {
      history, logOut, role, user,
    } = this.props;
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
        <Row gutter={24}>
          <Col span={4} />
          <Col span={16}>
            <Badge style={{ margin: '15px' }}>
              <Avatar
                src={logo}
                size="default"
                style={!collapsed ? {
                  verticalAlign: 'middle', width: 100, height: 100, margin: '15px',
                } : {
                  verticalAlign: 'middle', width: 40, height: 40,
                }}
                shape="square"
              />
            </Badge>
          </Col>
        </Row>
        {!collapsed && (
          <Row gutter={24}>
            <Col span={4} />
            <Col span={16} style={{ textAlign: 'center' }}>
              <UserDropdown onClick={this.handleChangePassword}>
                <h2>{user}</h2>
              </UserDropdown>
            </Col>
          </Row>
        )}
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
            <Menu.Item key="log-out">
              <a onClick={() => this.showConfirm(logOut)}>
                <Icon type="logout" />
                <span>Đăng xuất</span>
              </a>
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
            <Menu.Item key="log-out">
              <a onClick={() => this.showConfirm(logOut)}>
                <Icon type="logout" />
                <span>Đăng xuất</span>
              </a>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
    );
  }
}

export default SiderMenu;
