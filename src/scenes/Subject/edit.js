import React from 'react';
import { connect } from 'react-redux';
import {
  Card, notification, Col, Row,
} from 'antd';
import select from '../../utils/select';
import {
  getSubject,
  updateSubject,
} from './actions';
import SubjectForm from './components/Form';
import toJS from '../../hoc/ToJS/index';

class EditSubjectPage extends React.Component {
  componentDidMount() {
    this.props.getSubject(this.props.match.params.id);
  }

  handleSubmit = (id, payload) => {
    this.props.updateSubject(id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhập thành công' });
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    });
  }

  render() {
    const {
      detail, isFetching,
    } = this.props;
    return (
      <Row>
        <Col span={14} offset={5}>
          <Card
            title="Chi tiết môn học"
            loading={isFetching}
          >
            <SubjectForm
              subject={detail}
              onSubmit={this.handleSubmit}
              editMode
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  detail: select(state, 'subjectReducer', 'detail'),
  isFetching: select(state, 'subjectReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getSubject: id => dispatch(getSubject(id)),
  updateSubject: (id, payload, meta) => dispatch(updateSubject(id, payload, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((toJS(EditSubjectPage)));
