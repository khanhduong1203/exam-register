import { TYPE, PREFIX } from '../../config/actions';
import { API_URLS } from '../../config/api';
import { apiCall } from '../../utils/api';
import select from '../../utils/select';

export const getExamScheduleForStudent = (exam_id, payload) => async (dispatch) => {
  const api = API_URLS.STUDENT.getExamSchedule(exam_id);
  dispatch({
    type: TYPE.GETTING_SCHEDULE_FOR_STUDENT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.GET_SCHEDULE_FOR_STUDENT_SUCCESS,
      payload: response.data.data !== null ? response.data.data : [],
    });
  } else {
    dispatch({
      type: TYPE.GET_SCHEDULE_FOR_STUDENT_FAILURE,
    });
  }
};

export const registSubject = (exam_id, payload, meta) => async (dispatch) => {
  const api = API_URLS.STUDENT_SUBJECT.updateStudentSubject(exam_id);
  dispatch({
    type: TYPE.UPDATING_STUDENT_SUBJECT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.UPDATE_STUDENT_SUBJECT_SUCCESS,
      payload: response.data.data !== null ? response.data.data : [],
    });
    // dispatch(getExamScheduleForStudent(exam_id, { exam_id, student_id: payload.student_id }));
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.UPDATE_STUDENT_SUBJECT_FAILURE,
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};
