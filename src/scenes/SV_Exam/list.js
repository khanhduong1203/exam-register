import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Row, Table, Icon, Select, notification, Divider, Popconfirm,
} from 'antd';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import WithAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';
import toJS from '../../hoc/ToJS/index';
import { getExams } from '../Exam/action';
import { getExamScheduleForStudent, registSubject } from './actions';

const { Option } = Select;

const columns = regist => [
  {
    title: <b>STT</b>,
    width: 100,
    render: (v, r, i) => i + 1,
  },
  {
    title: <b>Tên</b>,
    dataIndex: 'subject',
    render: value => value[0]?.subject_name,
  },
  {
    title: <b>Mã học phần</b>,
    render: (value, record) => record?.subject[0]?.subject_code,
  },
  {
    title: <b>Ngày thi</b>,
    render: (value, record) => record?.exam_shift[0]?.date,
  },
  {
    title: <b>Ca thi</b>,
    dataIndex: 'shift',
    align: 'center',
    render: (value, record) => record?.exam_shift[0]?.exam_shift_name,
  },
  {
    title: <b>Bắt đầu</b>,
    width: 100,
    align: 'center',
    render: (value, record) => record?.exam_shift[0]?.start_time,
  },
  {
    title: <b>Kết thúc</b>,
    width: 100,
    align: 'center',
    render: (value, record) => record?.exam_shift[0]?.end_time,
  },
  {
    title: <b>Phòng thi</b>,
    width: 100,
    align: 'center',
    render: (value, record) => `${record?.exam_room[0]?.room_name} - ${record?.exam_room[0]?.room_place}`,
  },
  {
    title: <b>Trạng thái phòng</b>,
    align: 'center',
    width: 100,
    render: (value, record) => `${record?.exam_room[0]?.registered_amount}/${record?.exam_room[0]?.computer_max_amount}`,
  },
  {
    title: <b>Đăng ký</b>,
    align: 'center',
    width: 100,
    render: (value, record) => (
      record?.student?.registered_exam_schedule === true
        ? <i>Đã đăng ký</i>
        : (record?.student?.can_join_exam === true
          ? (
            <Popconfirm
              title="Bạn chắc chắn muốn đăng ký thi học phần này?"
              okText="Đồng ý"
              cancelText="Không"
              onConfirm={() => regist(record?.student?.student_subject_id, {
                subject_id: record?.subject[0]?.subject_id,
                exam_schedule_id: record?.exam_schedule_id,
                student_id: record?.student?.student_id,
                can_join_exam: '1',
              })}
            >
              <a>
                {'Đăng ký'}
              </a>
            </Popconfirm>
          )
          : <a style={{ color: 'red' }}>Cấm thi</a>)
    ),
  },
];

class StudentExamPage extends Component {
  state = {}

  componentDidMount() {
    this.props.getExams();
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
    const { exam, user, schedule } = this.props;
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet();
    ws.addRow(['Kết quả đăng ký thi']); ws.mergeCells('A1:D1');
    ws.addRow(['Kỳ thi', `${exam.exam_name} - Năm học ${exam.school_year}`]); ws.mergeCells('B2:D2');
    ws.addRow(['Sinh viên', user.student_info.name]); ws.mergeCells('B3:D3');
    ws.addRow(['Msv', user.student_info.student_code]); ws.mergeCells('B4:D4');
    ws.addRow([]); ws.addRow([]); ws.addRow([]);
    const header = ['STT', 'Tên', 'Mã học phần', 'Ngày thi', 'Ca thi', 'Bắt đầu', 'Kết thúc', 'Phòng thi'];
    ws.addRow(header);
    const arr = [...schedule];
    arr.filter(e => e.student.registered_exam_schedule === true).forEach((s, i) => {
      const tmp = {
        stt: i + 1,
        name: s?.subject[0]?.subject_name,
        code: s?.subject[0]?.subject_code,
        date: s?.exam_shift[0]?.date,
        shift: s?.exam_shift[0]?.exam_shift_name,
        start: s?.exam_shift[0]?.start_time,
        end: s?.exam_shift[0]?.end_time,
        room: `${s?.exam_room[0]?.room_name} - ${s?.exam_room[0]?.room_place}`,
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

  selectExam = (e) => {
    this.props.getScheduleForStudent(
      e,
      {
        student_id: this.props.user.student_info.student_id,
        exam_id: e,
      },
    );
  }

  regist = (id, payload) => {
    this.props.registSubject(
      id,
      payload,
      {
        onSuccess: () => {
          notification.success({ message: 'Đăng ký thành công' });
          this.selectExam(this.props.exam.exam_id);
        },
        onError: () => {
          notification.error({ message: 'Đăng ký thất bại' });
        },
      },
    );
  }

  render() {
    const {
      exam, isFetching, listExam, schedule,
    } = this.props;
    return (
      <React.Fragment>
        <Row gutter={24}>
          <Col span={8}>
            <p>Chọn kì thi</p>
            <Select style={{ width: '100%' }} onSelect={this.selectExam}>
              {listExam.map(item => <Option value={item.exam_id}>{`${item.exam_name} - Năm học ${item.school_year}`}</Option>)}
            </Select>
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={24}>
            <Table
              title={() => (
                <Row gutter={24}>
                  <Col span={8}><p style={{ display: 'inline-block' }}>Danh sách môn thi</p></Col>
                  <Col span={8}><p style={{ display: 'inline-block' }}>{`Kỳ thi: ${exam.exam_name} - Năm học ${exam.school_year}`}</p></Col>
                </Row>
              )}
              bordered
              dataSource={schedule}
              columns={columns(this.regist)}
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
                      In đăng ký thi
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
  exam: select(state, 'examRegistrationReducer', 'exam'),
  schedule: select(state, 'examRegistrationReducer', 'schedule'),
  user: select(state, 'authReducer', 'authUser'),
  listExam: select(state, 'examReducer', 'list'),
  isFetching: select(state, 'examRegistrationReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  // getSubjectsIfNeed: params => dispatch(getSubjectsIfNeed(params)),
  getExams: () => dispatch(getExams()),
  getScheduleForStudent: (exam_id, payload) => dispatch(getExamScheduleForStudent(exam_id, payload)),
  registSubject: (exam_id, payload, meta) => dispatch(registSubject(exam_id, payload, meta)),
});

export default WithAuthentication(false)(
  ((connect(
    mapStateToProps,
    mapDispatchToProps,
  )(toJS(StudentExamPage)))),
);
