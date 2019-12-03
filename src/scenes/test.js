/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import React from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import {
  Button, Form, Tabs, Alert, Modal, Row, Table, notification, Col, message,
} from 'antd';
import { json2excel } from 'js2excel';
import WithLoading from '../../../hoc/loading';
import toJs from '../../../hoc/toJs';

const { TabPane } = Tabs;
const columns = [
  {
    title: 'STT',
    dataIndex: 'row',
    key: 'row',
    width: 150,
  },
  {
    title: 'Mã SP',
    dataIndex: 'productCode',
    key: 'productCode',
    width: 150,
  },
  {
    title: 'TÊN HÀNG HÓA',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'ĐVT',
    dataIndex: 'unitName',
    key: 'unitName',
    width: 100,
  },
  {
    title: 'ĐƠN GIÁ (VND)',
    dataIndex: 'pricePerUnit',
    key: 'pricePerUnit',
    width: 150,
  },
  {
    title: 'SL',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
  },
];
// eslint-disable-next-line prefer-const
class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorFile: false,
      dataNew: [],
      dataPresent: [],
      dataError: [],
      dataPayload: [],
      tabKey: 'present',
      fileName: '',
      name: '',
      isFetching: false,
    };
    this.fileUpload = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dataPayload } = this.state;
    if (dataPayload.length > 0) {
      this.props.onSubmit(dataPayload);
      this.setState({
        errorFile: false,
        dataNew: [],
        dataPresent: [],
        dataError: [],
        dataPayload: [],
        tabKey: 'present',
        fileName: '',
        name: '',
        isFetching: false,
      });
    } else {
      message.warning('Chưa có sản phẩm nào');
    }
  }

  isUpperCase = (letter) => {
    for (let i = 0; i < letter.length; i++) {
      if (letter[i] !== letter[i].toUpperCase()) {
        return false;
      }
    }
    return true;
  }

  isItemError = (item) => {
    if ((item.productCode === undefined || item.quantity === undefined)) {
      return true;
    }
    return false;
  }

  isExist = (item) => {
    let result = false;
    const { products } = this.props;
    let { dataPayload } = this.state;
    for (let i = 0; i < products.length; i++) {
      if (item.productCode === products[i].productCode) {
        result = true;
        const newItem = {
          ...products[i],
          price: products[i].pricePerUnit,
          quantity: item.quantity,
          totalPrice: products[i].pricePerUnit * Number(item.quantity),
        };
        dataPayload.push(newItem);
        break;
      }
    }
    return result;
  }

  importExcel = (file) => {
    const fileReader = new FileReader();

    let dataNew = [];
    let dataPresent = [];
    let dataError = [];

    fileReader.onload = (event) => {
      try {
        /** convert sheet to json */
        let startAt = 0;
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        const Sheet = workbook.Sheets[workbook.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(Sheet);
        console.log(data);
        for (let i = 1; i <= data.length; i++) {
          const flagCell = Sheet[`A${i}`];
          if (flagCell !== undefined) {
            if (flagCell.v === 'STT') {
              startAt = i;
              // 13
              break;
            }
          }
        }
        if (startAt === 0) {
          notification.error({ message: 'upload failed!' });
          this.setState({ isFetching: false, name: '' });
        } else {
          this.setState({ isFetching: true });
          data = XLSX.utils.sheet_to_json(Sheet, { range: startAt, header: ['row', 'productCode', 'productName', 'unitName', 'quantity'] });
          /** format empty cell */
          data.forEach((item, index) => {
            if (item.row !== undefined) {
              item.row = (item.row.toString().trim() === '') ? undefined : item.row.toString().trim();
            }
            if (item.productCode !== undefined) {
              item.productCode = (item.productCode.toString().trim() === '') ? undefined : item.productCode.toString().trim();
            }
            if (item.productName !== undefined) {
              item.productName = (item.productName.toString().trim() === '') ? undefined : item.productName.toString().trim();
            }
            if (item.unitName !== undefined) {
              item.unitName = (item.unitName.toString().trim() === '') ? undefined : item.unitName.toString().trim();
            }
            if (item.quantity !== undefined) {
              item.quantity = (item.quantity.toString().trim() === '') ? undefined : item.quantity.toString().trim();
            }
          });
          /** read each row */
          data.forEach((item, index) => {
            if (this.isItemError(item)) {
              dataError.push(item);
            } else {
              // eslint-disable-next-line no-lonely-if
              if (this.isExist(item)) {
                const x = this.props.products.filter(e => e.productCode === item.productCode)[0];
                dataPresent.push({ ...item, pricePerUnit: x.pricePerUnit });
              } else {
                dataNew.push(item);
              }
            }
          });
          notification.success({ message: 'upload success!' });
          this.setState({
            dataNew, dataError, dataPresent, isFetching: false,
          });
        }
      } catch (e) {
        notification.error({ message: e });
        this.setState({ isFetching: false, name: '' });
      }
    };
    fileReader.readAsBinaryString(file);
  }

  onImportExcel = (event) => {
    const { files } = event.target;
    if (files.length === 1) {
      // Process a file if we have exactly one
      this.setState({ name: files[0].name.replace('.xlsx' || '.xls', ''), isFetching: true });
      this.importExcel(files[0]);
    }
  }

  exportExcel = () => {
    const {
      dataError, dataNew, dataPresent, tabKey,
    } = this.state;
    // eslint-disable-next-line no-nested-ternary
    let data = [];
    if (tabKey === 'present') {
      data = dataPresent;
    } else {
      data = (tabKey === 'new') ? dataNew : dataError;
    }
    data = data.map((item) => {
      const newItem = {};
      newItem.STT = item.row;
      newItem['MÃ SP'] = item.productCode;
      newItem['TÊN HÀNG HÓA'] = item.productName;
      newItem['ĐVT'] = item.unitName;
      newItem['ĐƠN GIÁ (VND)'] = item.pricePerUnit;
      newItem['GHI CHÚ'] = item.quantity;
      return newItem;
    });
    try {
      json2excel({
        data,
        name: tabKey,
        formateDate: 'yyyy/mm/dd',
      });
    } catch (e) {
      notification.error({ message: 'Lỗi ! Có thể trình duyệt của bạn không hỗ trợ ! Vui lòng liên hệ nhà phát triển !' });
    }
  };

  render() {
    const { visible, onCloseModal } = this.props;
    const {
      errorFile, dataNew, dataPresent, dataError, isFetching, tabKey,
    } = this.state;
    return (
      <Modal
        visible={visible}
        closable={false}
        width="90%"
        footer={[
          <Button
            type="primary"
            icon="plus"
            key="submit"
            disabled={tabKey !== 'present'}
            loading={isFetching}
            onClick={this.handleSubmit}
          >
            {'Thêm sản phẩm vào đơn hàng'}
          </Button>,
          <Button
            key="close"
            icon="close"
            onClick={onCloseModal}
            disabled={isFetching}
          >
              Đóng cửa sổ
          </Button>,
        ]}
      >
        {
          (
            <React.Fragment>
              <Row gutter={24}>
                <Col span={12}>
                  <input
                    disabled={isFetching}
                    id="fileUpload"
                    type="file"
                    ref={(v) => {
                      this.fileUpload = v;
                    }}
                    value={this.state.fileName}
                    accept=".xlsx, .xls"
                    onChange={this.onImportExcel}
                  />
                  {errorFile && <Alert style={{ marginTop: 10 }} type="error" showIcon message="Chọn file để upload" />}
                </Col>
              </Row>
              <Row gutter={24}>
                <Tabs defaultActiveKey="present" onChange={key => this.setState({ tabKey: key })}>
                  <TabPane tab={`Sản phẩm đã có sẵn (${dataPresent.length})`} key="present">
                    <Button onClick={this.exportExcel}>Tải xuống</Button>
                    <Table
                      dataSource={dataPresent}
                      columns={columns}
                      loading={isFetching}
                      rowKey={record => record.productCode}
                      rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
                      pagination={{
                        showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} mặt hàng`,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                      }}
                      scroll={{ y: 320 }}
                    />
                  </TabPane>
                  <TabPane tab={`Sản phẩm mới (${dataNew.length})`} key="new">
                    <Button onClick={this.exportExcel}>Tải xuống</Button>
                    <Table
                      dataSource={dataNew}
                      columns={columns}
                      loading={isFetching}
                      rowKey={record => record.productCode}
                      rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
                      pagination={{
                        showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} mặt hàng`,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                      }}
                      scroll={{ y: 320 }}
                    />
                  </TabPane>
                  <TabPane tab={`Sản phẩm lỗi (${dataError.length})`} key="error">
                    <Button onClick={this.exportExcel}>Tải xuống</Button>
                    <Table
                      dataSource={dataError}
                      columns={columns}
                      loading={isFetching}
                      rowKey={record => record.productCode}
                      rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
                      pagination={{
                        showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} mặt hàng`,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                      }}
                      scroll={{ y: 320 }}
                    />
                  </TabPane>
                </Tabs>
              </Row>
            </React.Fragment>
          )
        }
      </Modal>
    );
  }
}

UploadForm.propTypes = {
  onUpload: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

UploadForm.defaultProps = { onUpload: () => {} };

export default WithLoading(toJs(Form.create()(UploadForm)));
