/* eslint-disable no-console */
/* eslint-disable prefer-const */
import React from 'react';
import {
  Row, Col, Form, Input, DatePicker, Button, TimePicker, InputNumber, Table, Divider, Select, Tabs, List, Icon, Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import ToJS from '../../../hoc/ToJS';
import { ROOM, SUBJECT } from '../../../constant/enum';
import ImportModal from './ImportModal';
import select from '../../../utils/select';
import { updateExamShift, updateExamRoom } from '../action';

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber min={0} />;
    }
    if (this.props.inputType === 'time') {
      return <TimePicker format="HH:mm" showTime />;
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
              initialValue: this.props.inputType === 'time' ? moment(record[dataIndex], 'HH:mm') : record[dataIndex],
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
        key: 'stt',
        width: 100,
        render: (value, record, index) => index + 1,
      },
      {
        title: <b>Tên ca thi</b>,
        dataIndex: 'exam_shift_name',
        key: 'exam_shift_name',
        width: 100,
        editable: true,
      },
      {
        title: <b>Giờ băt đầu</b>,
        dataIndex: 'start_time',
        key: 'start',
        width: 150,
        editable: true,
        // render: (value, record) => (!this.isEditing(record) ? moment(record.start_time).format('DD-MM-YYYY HH:mm:ss') : <DatePicker defaultValue={moment(record.start_time)} format="DD-MM-YYYY HH:mm:ss" showTime />),
      },
      {
        title: <b>Giờ kết thúc</b>,
        dataIndex: 'end_time',
        key: 'end',
        width: 150,
        editable: true,
        // render: (value, record) => (!this.isEditing(record) ? moment(record.end_time).format('DD-MM-YYYY HH:mm:ss') : <DatePicker defaultValue={moment(record.end_time)} format="DD-MM-YYYY HH:mm:ss" showTime />),
      },
      {
        title: <b>Sửa</b>,
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
      {
        title: <b>Xóa</b>,
        align: 'center',
        dataIndex: 'exam_shift_id',
        render: value => (
          <Popconfirm title="Bạn chắc chắn muốn xóa ca thi này?" onConfirm={() => this.delete(value)}>
            <a style={{ color: 'red' }}>
              Xóa
            </a>
          </Popconfirm>
        ),
      },
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
    ];

    this.columnsRoom = (filteredInfo, sortedInfo) => [
      {
        title: <b>Tên phòng thi</b>,
        dataIndex: 'room_name',
        key: 'room_name',
        editable: true,
      },
      {
        title: <b>Địa điểm</b>,
        dataIndex: 'room_place',
        key: 'room_place',
        editable: true,
      },
      {
        title: <b>Số máy tính tối đa</b>,
        dataIndex: 'computer_max_amount',
        key: 'computer_max_amount',
        editable: true,
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
      {
        title: <b>Xóa</b>,
        align: 'center',
        dataIndex: 'exam_room_id',
        render: value => (
          <Popconfirm title="Bạn chắc chắn muốn xóa ca thi này?" onConfirm={() => this.delete(value)}>
            <a style={{ color: 'red' }}>
              Xóa
            </a>
          </Popconfirm>
        ),
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
    // const key = record.key;
    const exam_id = this.props.exam.exam[0].exam_id;
    form.validateFields((error, row) => {
      if (error) {
        console.log('x');
      } else {
        this.props.saveRow(
          record.key,
          { ...record, ...row, exam_id },
        );
      }
    });
    this.setState({ editingKey: '' });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  delete(id) {
    this.props.deleteRow(id);
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
    }
    const Xcolumns = cols.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: name === 'shift' ? (col.dataIndex === 'exam_shift_name' ? 'text' : 'time') : (col.dataIndex === 'computer_max_amount' ? 'number' : 'text'),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    let dataTable = [];
    dataTable = data !== undefined && data.map(item => ({
      ...item,
      key: name === 'shift' ? item.exam_shift_id : item.exam_room_id,
    }));
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          columns={Xcolumns}
          dataSource={dataTable}
          bordered
          rowKey={r => r.key}
          pagination={false}
          scroll={{ x: 'max-content', y: 500 }}
        />
      </EditableContext.Provider>
    );
  }
}
const mapStateToProps = state => ({
  exam: select(state, 'examReducer', 'detail'),
});

const mapDispatchToProps = dispatch => ({
  saveExamShift: (id, payload, meta) => dispatch(updateExamShift(id, payload, meta)),
  saveExamRoom: (id, payload, meta) => dispatch(updateExamRoom(id, payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ToJS(EditTable)));
