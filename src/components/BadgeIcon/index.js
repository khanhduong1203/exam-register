import React from 'react';
import { Tooltip, Badge, Icon } from 'antd';
import { withState } from 'recompose';

const STYLE = {
  COLORS: {
    SELECTED: '#BAE7FF',
    HOVER: '#E6F7FF',
    ICON: '#1890ff',
  },
};

const BadgeIcon = ({
  isHover, setHover, count, icon, name, onClick,
}) => (
  <Tooltip title={name} placement="left">
    <span
      style={{ width: '40px', display: 'inline-block', textAlign: 'center' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Badge count={count} offset={[-5, 5]}>
        <Icon style={{ fontSize: '16px', color: isHover ? STYLE.COLORS.SELECTED : null }} type={icon} />
      </Badge>
    </span>
  </Tooltip>
);

export default withState('isHover', 'setHover', false)(BadgeIcon);
