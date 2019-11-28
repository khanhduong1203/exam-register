import React from 'react';
import { Spin, Icon } from 'antd';

const LoadingIndicator = ({
  tip, style, content, isFetching, children,
}) => (
  <Spin
    size="large"
    spinning={isFetching}
    tip={`${content || 'Đang tải'} ...`}
    style={{ maxHeight: '100%', textAlign: 'center', ...style }}
    indicator={<Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />}
  >
    {children}
  </Spin>
);

export default LoadingIndicator;
