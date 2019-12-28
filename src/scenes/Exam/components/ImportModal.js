/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import React from 'react';
import {
  Modal, Row, Button, Col, notification, Alert, Table, Divider, Tabs, Upload, Icon,
} from 'antd';
import * as XLSX from 'xlsx';
import { json2excel } from 'js2excel';
import ToJS from '../../../hoc/ToJS';

const { TabPane } = Tabs;
// import { connect } from 'react-redux';
// import { select } from '../../../utils/select';
const columns = [
  {
    title: 'MSV',
    dataIndex: 'student_code',
  },
  {
    title: 'TÊN',
    dataIndex: 'student_name',
  },
  {
    title: 'ĐỦ ĐIỀU KIỆN DỰ THI',
    dataIndex: 'can_join_exam',
  },
];

class ImportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      errorFile: false,
      fileName: '',
      data: [],
      error: [],
      fileList: [],
    };
    this.fileUpload = React.createRef();
  }

  isItemError = (item) => {
    if ((item.student_code === undefined)) {
      return true;
    }
    return false;
  }

  isExist = (item) => {
    let result = false;
    const { students } = this.props;
    for (let i = 0; i < students.length; i++) {
      if (item.student_code === students[i].student_code) {
        result = true;
        break;
      }
    }
    return result;
  }

  importExcel = (file) => {
    const fileReader = new FileReader();

    const dataNew = [];
    const dataError = [];

    fileReader.onload = (event) => {
      try {
        /** convert sheet to json */
        let startAt = 0;
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        const Sheet = workbook.Sheets[workbook.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(Sheet);
        for (let i = 1; i <= data.length; i++) {
          const flagCell = Sheet[`A${i}`];
          if (flagCell !== undefined) {
            if (flagCell.v === 'MSV') {
              startAt = i;
              break;
            }
          }
        }
        if (startAt === 0) {
          notification.error({ message: 'upload failed!' });
          this.setState({ isFetching: false, student_name: '' });
        } else {
          this.setState({ isFetching: true });
          data = XLSX.utils.sheet_to_json(Sheet, { range: startAt, header: ['student_code', 'student_name', 'can_join_exam'] });
          /** format empty cell */
          data.forEach((item, index) => {
            if (item.student_code !== undefined) {
              item.student_code = (item.student_code.toString().trim() === '') ? undefined : item.student_code.toString().trim();
            }
            if (item.student_name !== undefined) {
              item.student_name = (item.student_name.toString().trim() === '') ? undefined : item.student_name.toString().trim();
            }
            if (item.CLASS !== undefined) {
              item.can_join_exam = (item.can_join_exam.toString().trim() === '') ? undefined : item.can_join_exam.toString().trim();
            }
          });
          /** read each row */
          data.forEach((item, index) => {
            if (this.isItemError(item)) {
              dataError.push(item);
            } else {
              // eslint-disable-next-line no-lonely-if
              if (this.isExist(item)) {
                dataNew.push(item);
              }
            }
          });
          notification.success({ message: 'upload success!' });
          this.setState({
            data: dataNew, error: dataError, isFetching: false,
          });
        }
      } catch (e) {
        notification.error({ message: e });
        this.setState({ isFetching: false, fileName: '' });
      }
    };
    fileReader.readAsBinaryString(file);
  }

  onImportExcel = (event) => {
    const { file } = event;
    if (file !== undefined) {
      // Process a file if we have exactly one
      this.setState({ fileName: file.name.replace('.xlsx' || '.xls', ''), isFetching: true });
      this.importExcel(file);
    } else {
      notification.error({ message: 'Không đọc được file !' });
    }
  }

  getStudentId = (code) => {
    let arr = [...this.props.students];
    const std = arr.find(e => e.student_code === code);
    return std.student_id;
  }

  closeModal = () => {
    this.setState({
      fileName: '',
      data: [],
      error: [],
      fileList: [],
    });
    this.props.closeModal();
  }

  pushStudentSubject = () => {
    const payload = this.state.data.map(item => ({
      ...item,
      exam_schedule_id: '',
      can_join_exam: item.can_join_exam === 'Có' ? '1' : '0',
      subject_id: this.props.subject.subject_id,
      student_id: this.getStudentId(item.student_code),
    }));
    this.props.onSubmit(payload);
  };

  render() {
    const { visible, closeModal, subject } = this.props;
    const {
      isFetching, errorFile, data, error, fileList,
    } = this.state;
    const props = {
      onRemove: false,
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
      multiple: false,
    };
    return (
      <Modal
        visible={visible}
        onOk={this.pushStudentSubject}
        onCancel={this.closeModal}
        closable={false}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Upload {...props} onChange={this.onImportExcel}>
              <Button>
                <Icon type="upload" />
                Chọn file
              </Button>
            </Upload>
            {errorFile && <Alert style={{ marginTop: 10 }} type="error" showIcon message="Chọn file để upload" />}
          </Col>
          <Col span={16}>
            <b>{`${subject.subject_code} - ${subject.subject_name}`}</b>
          </Col>
        </Row>
        <Divider dashed />
        <Row gutter={24}>
          <Col>
            <Tabs>
              <TabPane key="data" tab={`Dữ liệu chuẩn (${data.length})`}>
                <Table
                  loading={isFetching}
                  columns={columns}
                  dataSource={data}
                  rowKey={(r, i) => i}
                  pagination={false}
                  scroll={{ x: 'max-content', y: 300 }}
                />
              </TabPane>
              <TabPane key="error" tab={`Dữ liệu nhập sai (${error.length})`}>
                <Table
                  loading={isFetching}
                  columns={columns}
                  dataSource={error}
                  rowKey={(r, i) => i}
                  pagination={false}
                  scroll={{ x: 'max-content', y: 300 }}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ToJS(ImportModal);
