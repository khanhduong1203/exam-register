import React from 'react';
import Highlighter from 'react-highlight-words';
import {
  Table,
  Icon,
  Input,
  Button,
  Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constant/router';

export default class TableView extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: '',
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

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: <b>Tên học phần</b>,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ...this.getColumnSearchProps('name'),
        render: (value, record) => <Link to={ROUTER.SUBJECT.EDIT.replace(':id', record.id)}>{value}</Link>,
      },
      {
        title: <b>Mã</b>,
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code - b.code,
        sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
      },
    ];
    const {
      data, isFetching, history, getSubjects,
    } = this.props;
    return (
      <div>
        <Button type="primary" onClick={() => history.push(ROUTER.SUBJECT.ADD)}>+ Thêm mới </Button>
        <Button onClick={this.clearAll} style={{ float: 'right' }}>Bỏ lọc</Button>
        <Button onClick={getSubjects} style={{ float: 'right', marginRight: '10px' }}>Tải lại</Button>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          loading={isFetching}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}
