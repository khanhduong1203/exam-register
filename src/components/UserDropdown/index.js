import React from 'react';
import { Menu, Dropdown } from 'antd';

const UserDropdown = ({ onClick, children }) => (
  <Dropdown
    overlay={(
      <Menu onClick={event => onClick(event)}>
        <Menu.Item key="change-pass">
          <span role="img" aria-label="Password">
            {'Đổi mật khẩu'}
          </span>
        </Menu.Item>
      </Menu>
)}
  >
    <span
      style={{
        width: '40px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {children}
    </span>
  </Dropdown>
);

export default (UserDropdown);
