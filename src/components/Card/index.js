import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from 'antd';
import './index.css';

const CustomCard = ({
  hoverable, hasShadow, clickable, style, children, hasDelete, onDelete, title, extra,
}) => (
  <Card
    extra={extra}
    title={title}
    style={{
      maxWidth: '100%',
      margin: 10,
      boxShadow: hasShadow ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : '',
      cursor: clickable ? 'pointer' : '',
      ...style,
    }}
    className={hoverable ? 'custom-card-hoverable' : ''}
    actions={
            hasDelete
              ? [
                <Button onClick={onDelete} key="delete">
                  <Icon type="delete" />
                </Button>,
              ]
              : []
        }
  >
    {children}
  </Card>
);

CustomCard.propTypes = {
  hasDelete: PropTypes.bool,
  // hoverable: PropTypes.bool,
  // hasShadow: PropTypes.bool,
  // clickable: PropTypes.bool,
  // children: PropTypes.node,
  // style: PropTypes.object,
  // onDelete: PropTypes.func,
  // title: PropTypes.any,
  // extra: PropTypes.any,
};

CustomCard.defaultProps = {
  hasDelete: false,
};

export default CustomCard;
