import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import FormExam from './components/Form';
import ToJS from '../../hoc/ToJS';
import withAuthentication from '../../hoc/WithAuthentication';
import select from '../../utils/select';

class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: {
        name: '',
        shift: 1,
        rangeTime: '',
        listShift: [],
      },
    };
  }

  createExam = (payload) => {
    this.setState({
      exam: {
        ...payload,
        listShift: Array(payload.shift).fill(0).map((e, i) => ({
          index: i + 1,
          room: [1, 3],
          subject: [2, 4],
          start: '07:00:00',
          end: '09:30:00',
        })),
      },
    });
  };

  selectRoom = (roomIds, shiftIndex) => {
    // eslint-disable-next-line prefer-const
    let listShift = this.state.exam.listShift;
    const i = listShift.findIndex(s => s.index === shiftIndex);
    if (i >= 0) {
      listShift[i].room = roomIds;
    }
    this.setState({
      exam: {
        ...this.state.exam,
        listShift,
      },
    });
  };

  render() {
    const { exam } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <FormExam
              onSubmit={this.createExam}
              selectRoom={this.selectRoom}
              exam={exam}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  list: select(state, 'examReducer', 'list'),
  isFetching: select(state, 'studentReducer', 'isFetching'),
  didInvalidate: select(state, 'studentReducer', 'didInvalidate'),
});

const mapDispatchToProps = dispatch => ({
  // createExam: params => dispatch(createExam(params)),
});

export default withAuthentication(false)(
  (connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ToJS(DepartmentPage))),
);
