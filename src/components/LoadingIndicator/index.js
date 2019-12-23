import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';

const LoadingIndicator = ({ style }) => (
  <Spin
    size="large"
    spinning
    tip="Đang tải..."
    style={{ maxHeight: '100%', textAlign: 'center', ...style }}
    indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}
  />
);

LoadingIndicator.propTypes = {
  style: PropTypes.instanceOf(Object),
};

LoadingIndicator.defaultProps = {
  style: {},
};

export default LoadingIndicator;
