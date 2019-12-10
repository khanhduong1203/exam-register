import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, Table, Icon, Select, notification,
} from 'antd';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';

const columns = shifts => [
  {
    title: <b>STT</b>,
    width: 100,
    render: (v, r, i) => i + 1,
  },
  {
    title: <b>Tên</b>,
    dataIndex: 'name',
    width: 200,
  },
  {
    title: <b>Mã học phần</b>,
    dataIndex: 'code',
    width: 200,
  },
  {
    title: <b>Ngày thi</b>,
    dataIndex: 'day',
    width: 150,
    render: value => value.format('DD-MM-YYYY'),
  },
  {
    title: <b>Ca thi</b>,
    dataIndex: 'shift',
    align: 'center',
    width: 200,
    render: (value, record) => (
      <Select
        width={100}
        defaultValue={value}
      >
        {shifts.map(s => (
          <Select.Option value={s.id}>{s.name}</Select.Option>
        ))}
      </Select>
    ),
  },
  {
    title: <b>Bắt đầu</b>,
    width: 100,
    align: 'center',
    dataIndex: 'start',
  },
  {
    title: <b>Kết thúc</b>,
    width: 100,
    align: 'center',
    dataIndex: 'end',
  },
  {
    title: <b>Trạng thái</b>,
    dataIndex: 'status',
    align: 'center',
    width: 100,
    render: (value, record) => (
      value === true ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#FA3718" />
    ),
  },
];

class StudentExamPage extends Component {
  state = {}

  static getDerivedStateFromProps(props, state) {
    // props.getSubjectsIfNeed();
    return state;
  }

  onRegist = () => {
    notification.success({ message: 'Đăng ký thành công !' });
  }

  getShiftName = (id) => {
    const { exam } = this.props;
    let result = '';
    exam.shifts.forEach((s) => {
      if (id === s.id) {
        result = s.name;
      }
    });
    return result;
  }

  exportFile = async () => {
    const { exam } = this.props;
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    ws.addRow(['Kết quả đăng ký thi']); ws.mergeCells('A1:D1');
    ws.addRow(['Kỳ thi', 'Cuối kì 2']); ws.mergeCells('B2:D2');
    ws.addRow(['Sinh viên', 'Nguyễn Văn A']); ws.mergeCells('B3:D3');
    ws.addRow(['Msv', '12316562']); ws.mergeCells('B4:D4');
    ws.addRow([]); ws.addRow([]); ws.addRow([]);
    const header = ['STT', 'Tên', 'Mã học phần', 'Ngày thi', 'Ca thi', 'Bắt đầu', 'Kết thúc'];
    ws.addRow(header);
    exam.subjects.forEach((s, i) => {
      const tmp = {
        stt: i + 1,
        name: s.name,
        code: s.code,
        day: s.day.format('DD-MM-YYYY'),
        shift: this.getShiftName(s.shift),
        start: s.start,
        end: s.end,
      };
      ws.addRow(Object.values(tmp));
    });

    ws.getRow(8).font = { bold: true };
    // ws.views = [
    //   { state: 'frozen', xSplit: 1, ySplit: 1 },
    // ];
    const buf = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buf]), 'Kết quả đăng ký thi.xlsx');
  }

  render() {
    const {
      exam, isFetching,
    } = this.props;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={24}>
            <Table
              title={() => (
                <Row gutter={24}>
                  <Col span={8}><p style={{ display: 'inline-block' }}>Danh sách môn thi</p></Col>
                  <Col span={8}><p style={{ display: 'inline-block' }}>{`Kỳ thi: ${exam.name}`}</p></Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      style={{ float: 'right', marginRight: '10px', display: 'inline-block' }}
                      onClick={() => this.onRegist()}
                    >
                      {'Đăng ký'}
                    </Button>
                  </Col>
                </Row>
              )}
              bordered
              dataSource={exam.subjects}
              columns={columns(exam.shifts)}
              loading={isFetching}
              pagination={false}
              footer={() => (
                <Row gutter={24}>
                  <Col span={20} />
                  <Col span={4}>
                    <Button
                      style={{ float: 'right', marginRight: '10px' }}
                      onClick={() => this.exportFile()}
                    >
                      {'In đăng ký thi'}
                    </Button>
                  </Col>
                </Row>
              )}
              scroll={{ x: 'max-content', y: 'max-content' }}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  exam: select(state, 'examRegistrationReducer', 'detail'),
  isFetching: select(state, 'examRegistrationReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  // getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
});

export default WithAuthentication(false)(
  ((connect(
    mapStateToProps,
    mapDispatchToProps,
  )(toJS(StudentExamPage)))),
);
