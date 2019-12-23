/* eslint-disable prefer-const */
import React from 'react';
import {
  Row, Col, Form, Input, DatePicker, Button, TimePicker, InputNumber, Table, Divider, Select, Tabs, List, Icon,
} from 'antd';
import moment from 'moment';
import ToJS from '../../../hoc/ToJS';
import { ROOM, SUBJECT } from '../../../constant/enum';
import ImportModal from './ImportModal';

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber min={0} />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      editingKey: '',
      searchText: '',
      filteredInfo: null,
      sortedInfo: null,
    };
    this.columnsShift = (filteredInfo, sortedInfo, selectRoom) => [
      {
        title: <b>STT</b>,
        width: 100,
        fixed: 'left',
        render: (value, record, index) => index + 1,
      },
      {
        title: <b>Tên ca thi</b>,
        dataIndex: 'index',
        width: 100,
        fixed: 'left',
        render: value => `Ca ${value}`,
      },
      // {
      //   title: <b>Phòng thi</b>,
      //   dataIndex: 'room',
      //   width: 150,
      //   render: (value, record) => (
      //     <Select
      //       mode="multiple"
      //       maxTagCount={0}
      //       defaultValue={value}
      //       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      //       onChange={val => selectRoom(val, record.index)}
      //     >
      //       {ROOM.map(e => (<Option value={e.id}>{e.name}</Option>))}
      //     </Select>
      //   ),
      // },
      {
        title: <b>Giờ băt đầu</b>,
        dataIndex: 'start',
        width: 150,
        render: value => <TimePicker defaultValue={moment(value, 'HH:mm')} format="HH:mm" />,
      },
      {
        title: <b>Giờ kết thúc</b>,
        dataIndex: 'end',
        width: 150,
        render: value => <TimePicker defaultValue={moment(value, 'HH:mm')} format="HH:mm" />,
      },
      // {
      //   title: <b>Môn thi</b>,
      //   dataIndex: 'subject',
      //   width: 150,
      //   render: value => (
      //     <Select
      //       mode="multiple"
      //       defaultValue={value}
      //       maxTagCount={0}
      //       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      //     >
      //       {SUBJECT.map(e => (<Option value={e.id}>{e.name}</Option>))}
      //     </Select>
      //   ),
      // },
    ];

    this.columnsSubject = (filteredInfo, sortedInfo, openModal) => [
      {
        title: <b>Tên môn thi</b>,
        dataIndex: 'subject_name',
        key: 'subject_name',
        width: 150,
        sorter: (a, b) => a.subject_name.localeCompare(b.subject_name),
        ...this.getColumnSearchProps('subject_name'),
        sortOrder: sortedInfo.columnKey === 'subject_name' && sortedInfo.order,
        editable: true,
      },
      {
        title: <b>Mã môn thi</b>,
        dataIndex: 'subject_code',
      },
      {
        title: <b>Danh sách sinh viên</b>,
        render: (value, record) => <Button onClick={() => openModal(record)}>Chọn file</Button>,
      },
      {
        title: <b>Tùy chọn</b>,
        width: 150,
        align: 'center',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record)}
                    style={{ marginRight: 8 }}
                  >
                    Lưu
                  </a>
                )}
              </EditableContext.Consumer>
              <a onClick={() => this.cancel(record.key)} style={{ color: 'red' }}>Hủy</a>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Sửa
            </a>
          );
        },
      },
    ];

    this.columnsRoom = (filteredInfo, sortedInfo) => [
      {
        title: <b>Mã phòng thi</b>,
        dataIndex: 'exam_room_id',
      },
      {
        title: <b>Tên phòng thi</b>,
        dataIndex: 'room_name',
      },
      {
        title: <b>Địa điểm</b>,
        dataIndex: '',
      },
      {
        title: <b>Số máy tính tối đa</b>,
        dataIndex: '',
      },
      {
        title: <b>Số máy đã đăng ký</b>,
        dataIndex: '',
      },
    ];
  }

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
          Lọc
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 110 }}>
          Bỏ lọc
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
    render: text => (text
      // <Highlighter
      //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      //   searchWords={[this.state.searchText]}
      //   autoEscape
      //   textToHighlight={text.toString()}
      // />
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

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, record) => {
    const key = record.key;
    form.validateFields((error, row) => {
      // if (error) {
      //   return;
      // } else {
      //   return;
      // }
    });
  };

  edit(key) {
    console.log(this);
    this.setState({ editingKey: key });
  }

  delete(id) {
    this.props.deleteRoom(id);
  }


  render() {
    const {
      data,
      name,
    } = this.props;
    let { filteredInfo, sortedInfo, editingKey } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    let cols = [];
    if (name === 'shift') {
      cols = this.columnsShift(filteredInfo, sortedInfo);
    } else if (name === 'room') {
      cols = this.columnsRoom(filteredInfo, sortedInfo);
    } else if (name === 'subject') {
      cols = this.columnsSubject(filteredInfo, sortedInfo);
    }
    const Xcolumns = cols.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'name' ? 'text' : 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    console.log(name, Xcolumns);
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          columns={Xcolumns}
          dataSource={data}
          bordered
          rowKey={r => r.index}
          pagination={false}
          scroll={{ x: 'max-content', y: 500 }}
          footer={() => (
            <Button type="primary">Cập nhật</Button>
          )}
        />
      </EditableContext.Provider>
    );
  }
}

export default (Form.create()(ToJS(EditTable)));
