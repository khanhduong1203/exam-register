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
    dataIndex: 'name',
  },
  {
    title: 'NGÀY SINH',
    dataIndex: 'date_birth',
  },
  {
    title: 'GIỚI TÍNH',
    dataIndex: 'gender',
  },
  {
    title: 'LỚP',
    dataIndex: 'class',
  },
  {
    title: 'SĐT',
    dataIndex: 'phone_number',
  },
  {
    title: 'MAIL',
    dataIndex: 'email',
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
    if ((item.student_code === undefined || item.class === undefined)) {
      return true;
    }
    return false;
  }

  isExist = (item) => {
    let result = false;
    // const { students } = this.props;
    // for (let i = 0; i < students.length; i++) {
    //   if (item.student_code === students[i].student_code && item.class === students.class) {
    //     result = true;
    //     break;
    //   }
    // }
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
        const workbook = XLSX.read(result, { type: 'string', locale: 'vi-VN', dateNF: 'dd/mm/yyyy' });
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
          this.setState({ isFetching: false, name: '' });
        } else {
          this.setState({ isFetching: true });
          data = XLSX.utils.sheet_to_json(Sheet, { range: startAt, header: ['student_code', 'name', 'date_birth', 'gender', 'class', 'phone_number', 'email'] });
          console.log(data);
          /** format empty cell */
          data.forEach((item, index) => {
            if (item.student_code !== undefined) {
              item.student_code = (item.student_code.toString().trim() === '') ? undefined : item.student_code.toString().trim();
            }
            if (item.name !== undefined) {
              item.name = (item.name.toString().trim() === '') ? undefined : item.name.toString().trim();
            }
            if (item.date_birth !== undefined) {
              item.date_birth = (item.date_birth.toString().trim() === '') ? undefined : item.date_birth.toString().trim();
            }
            if (item.gender !== undefined) {
              item.gender = (item.gender.toString().trim() === '') ? undefined : item.gender.toString().trim();
            }
            if (item.class !== undefined) {
              item.class = (item.class.toString().trim() === '') ? undefined : item.class.toString().trim();
            }
            if (item.phone_number !== undefined) {
              item.phone_number = (item.phone_number.toString().trim() === '') ? undefined : item.phone_number.toString().trim();
            }
            if (item.email !== undefined) {
              item.email = (item.email.toString().trim() === '') ? undefined : item.email.toString().trim();
            }
          });
          /** read each row */
          data.forEach((item, index) => {
            if (this.isItemError(item)) {
              dataError.push(item);
            } else {
              // eslint-disable-next-line no-lonely-if
              if (!this.isExist(item)) {
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

  render() {
    const { visible, closeModal } = this.props;
    const {
      isFetching, errorFile, data, error, fileList,
    } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
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
        onOk={closeModal}
        onCancel={closeModal}
        width={1000}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Upload {...props} onChange={this.onImportExcel}>
              <Button>
                <Icon type="upload" />
                Chọn file
              </Button>
            </Upload>
            {errorFile && <Alert style={{ marginTop: 10 }} type="error" showIcon message="Chọn file để upload" />}
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
