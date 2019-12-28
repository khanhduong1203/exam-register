import React from 'react';
import Highlighter from 'react-highlight-words';
import {
  Table,
  Icon,
  Input,
  Button,
  Divider,
  Popconfirm,
  Drawer,
  Row,
  Col,
  notification,
} from 'antd';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constant/router';
import FormSubject from './Form';

export default class TableView extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: '',
    visible: false,
  };

  showDrawer = (subject_id) => {
    this.setState({
      visible: true,
    });
    this.props.getSubject(subject_id);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 228, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 110, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 110 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleEdit = (item) => {
    // console.log(item);
  }

  handleSubmit = (id, payload) => {
    this.props.updateSubject(id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhập thành công' });
        this.props.history.push(ROUTER.SUBJECT.INDEX);
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    });
  }

  deleteSubject = (id) => {
    this.props.deleteSubject(
      id,
      {
        onSuccess: () => {
          notification.success({ message: 'Xóa học phần thành công' });
          this.props.history.replace(ROUTER.SUBJECT.INDEX);
        },
        onError: () => {
          notification.error({ message: 'Xóa học phần thất bại' });
        },
      },
    );
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: <b>Mã học phần</b>,
        dataIndex: 'subject_code',
        key: 'subject_code',
        sorter: (a, b) => a.subject_code - b.subject_code,
        sortOrder: sortedInfo.columnKey === 'subject_code' && sortedInfo.order,
        // render: (value, record) => <Link to={ROUTER.SUBJECT.EDIT.replace(':id', record.subject_code)}>{value}</Link>,
      },
      {
        title: <b>Tên học phần</b>,
        dataIndex: 'subject_name',
        key: 'subject_name',
        sorter: (a, b) => a.subject_name.localeCompare(b.subject_name),
        sortOrder: sortedInfo.columnKey === 'subject_name' && sortedInfo.order,
        ...this.getColumnSearchProps('subject_name'),
      },
      {
        title: <b>Sửa</b>,
        key: 'fix',
        render: (value, record) => (
          <a onClick={() => this.showDrawer(record.subject_id)}>Sửa</a>
        ),
      },
      {
        title: <b>Xóa</b>,
        dataIndex: 'subject_id',
        key: 'subject_id',
        render: value => (
          <Popconfirm title="Bạn chắc chắn muốn xóa học phần này?" onConfirm={() => this.props.deleteSubject(value)}>
            <a style={{ color: 'red' }}>Xóa</a>
          </Popconfirm>
        ),
      },
    ];
    const {
      data, isFetching, history, getSubjects, showDrawer, detail,
    } = this.props;
    return (
      <div>
        <Button type="primary" onClick={showDrawer}>+ Thêm mới </Button>
        <Button onClick={this.clearAll} style={{ float: 'right' }}>Bỏ lọc</Button>
        <Button onClick={getSubjects} style={{ float: 'right', marginRight: '10px' }}>Tải lại</Button>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          loading={isFetching}
          rowKey={record => record.subject_id}
        />
        <Row gutter={24}>
          <Col span={14} offset={5}>
            <Drawer
              title="Cập nhật học phần"
              width={500}
              onClose={this.onClose}
              visible={this.state.visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <FormSubject
                editMode
                subject={detail}
                onSubmit={this.handleSubmit}
                onDelete={this.deleteSubject}
              />
            </Drawer>
          </Col>
        </Row>
      </div>
    );
  }
}
