import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Avatar, Menu, Breadcrumb, Icon,
} from 'antd';
// import NotificationDropdown from './NotificationDropdown';
import toJs from '../../../hoc/ToJS';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

class GlobalHeader extends React.Component {
  render() {
    const {
      collapsed,
      toggleSidebar,
    } = this.props;
    return (
      <Layout>
        <Header style={{ textAlign: 'center', background: 'blue', padding: 0 }}>
          <h2 className="haha"> Đăng ký dự thi</h2>
        </Header>
      </Layout>
    );
  }
}

export default GlobalHeader;
