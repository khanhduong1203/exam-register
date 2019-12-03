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
import { getStudentsIfNeed } from '../actions';
import ImportModal from './ImportModal';

class StudentList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: '',
    visible: false,
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

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: <b>Msv</b>,
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.localeCompare(b.code),
        sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
        ...this.getColumnSearchProps('code'),
        render: (value, record) => <Link to={ROUTER.STUDENT.EDIT.replace(':id', record.id)}>{value}</Link>,
      },
      {
        title: <b>Tên sinh viên</b>,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ...this.getColumnSearchProps('name'),
        render: (value, record) => <Link to={ROUTER.STUDENT.EDIT.replace(':id', record.id)}>{value}</Link>,
      },
      {
        title: <b>Lớp</b>,
        dataIndex: 'class',
        key: 'class',
        sorter: (a, b) => a.class.localeCompare(b.class),
        sortOrder: sortedInfo.columnKey === 'class' && sortedInfo.order,
        // filters: [{ text: 'Bác sỹ', value: 'Bác sỹ' }, { text: 'Y tá', value: 'Y tá' }, { text: 'Điều dưỡng', value: 'Điều dưỡng' }],
        // filteredValue: filteredInfo.class || null,
        // onFilter: (value, record) => record.class.includes(value),
      },
      {
        title: <b>SĐT</b>,
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone.toString().localeCompare(b.phone.toString()),
        sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
      },
      {
        title: <b>Mail</b>,
        dataIndex: 'mail',
        key: 'mail',
        sorter: (a, b) => a.time.localeCompare(b.time),
        sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
      },
    ];
    const { data, isFetching, history } = this.props;
    return (
      <div>
        <Button type="primary" onClick={() => history.push(ROUTER.STUDENT.ADD)}>+ Thêm mới </Button>
        <Button style={{ marginLeft: '10px' }} onClick={() => this.setState({ visible: true })}>Thêm từ Excel</Button>
        <Button onClick={this.clearAll} style={{ float: 'right' }}>Bỏ lọc</Button>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          loading={isFetching}
          pagination={{
            showSizeChanger: true,
          }}
          rowKey={r => r.id}
        />
        <ImportModal
          visible={this.state.visible}
          closeModal={() => this.setState({ visible: false })}
        />
      </div>
    );
  }
}

export default StudentList;
