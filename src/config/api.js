const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  header: () => ({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Authorization: localStorage.getItem('jwt'),
  }),
  rawHeader: () => ({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'raw',
    Authorization: localStorage.getItem('jwt'),
  }),
  jsonHeader: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: localStorage.getItem('jwt'),
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('jwt'),
  }),
  scm_header: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: localStorage.getItem('scm_jwt'),
  }),
};

export const API_URLS = {
  ACCOUNT: {
    login: payload => ({
      endPoint: '/api/login',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
      payload,
    }),
    loginWithToken: () => ({
      endPoint: '/api/token',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    changePassword: () => ({
      endPoint: '/api/login/change_password',
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  EXAM: {
    getExams: () => ({
      endPoint: '/api/exam',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExam: id => ({
      endPoint: `/api/exam/${id}`,
      method: 'GET',
      headers: HEADERS.jsonHeader(),
    }),
    createExam: () => ({
      endPoint: '/api/exam/create',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    updateExam: id => ({
      endPoint: `/api/exam/${id}`,
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    deleteExam: id => ({
      endPoint: `/api/exam/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  EXAM_SCHEDULE: {
    getExamSchedules: () => ({
      endPoint: '/api/exam_schedule',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExamSchedule: id => ({
      endPoint: `/api/exam_schedule/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExamScheduleByExamId: id => ({
      endPoint: `/api/exam_schedule/exam_id/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createExamSchedule: () => ({
      endPoint: '/api/exam_schedule/create',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    updateExamSchedule: id => ({
      endPoint: `/api/exam_schedule/${id}`,
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    deleteExamSchedule: id => ({
      endPoint: `/api/exam_schedule/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },

  EXAM_SHIFT: {
    getExamShifts: () => ({
      endPoint: '/api/exam_shift',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExamShift: id => ({
      endPoint: `/api/exam_shift/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createExamShift: () => ({
      endPoint: '/api/exam_shift/create',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateExamShift: id => ({
      endPoint: `/api/exam_shift/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteExamShift: id => ({
      endPoint: `/api/exam_shift/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  EXAM_ROOM: {
    getExamRooms: () => ({
      endPoint: '/api/exam_room',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExamRoom: id => ({
      endPoint: `/api/exam_room/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createExamRoom: () => ({
      endPoint: '/api/exam_room/create',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateExamRoom: id => ({
      endPoint: `/api/exam_room/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteExamRoom: id => ({
      endPoint: `/api/exam_room/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  SCHEDULE: {
    getExamSchedules: () => ({
      endPoint: '/api/exam_schedule',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExamSchedule: id => ({
      endPoint: `/api/exam_schedule/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createExamSchedule: () => ({
      endPoint: '/api/exam_schedule/create',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateExamSchedule: id => ({
      endPoint: `/api/exam_schedule/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteExamSchedule: id => ({
      endPoint: `/api/exam_schedule/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  STUDENT: {
    getStudents: () => ({
      endPoint: '/api/student',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getStudent: id => ({
      endPoint: `/api/student/student_code/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    insertStudent: () => ({
      endPoint: '/api/student/create',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    updateStudent: id => ({
      endPoint: `/api/student/${id}`,
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    deleteStudent: id => ({
      endPoint: `/api/student/delete/${id}`,
      method: 'POST',
      headers: HEADERS.rawHeader(),
    }),
  },
  SUBJECT: {
    getSubjects: () => ({
      endPoint: '/api/subject',
      method: 'GET',
      headers: HEADERS.rawHeader(),
    }),
    insertSubject: () => ({
      endPoint: '/api/subject/create',
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    getSubject: id => ({
      endPoint: `/api/subject/subject_code/${id}`,
      method: 'GET',
      headers: HEADERS.rawHeader(),
    }),
    updateSubject: id => ({
      endPoint: `/api/subject/${id}`,
      method: 'POST',
      headers: HEADERS.jsonHeader(),
    }),
    deleteSubject: id => ({
      endPoint: `/api/subject/delete/${id}`,
      method: 'POST',
      headers: HEADERS.rawHeader(),
    }),
  },
  STUDENT_SUBJECT: {
    getStudentSubjects: () => ({
      endPoint: '/api/student_subject',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getStudentSubject: id => ({
      endPoint: `/api/student_subject/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createStudentSubject: () => ({
      endPoint: '/api/student_subject/create',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateStudentSubject: id => ({
      endPoint: `/api/student_subject/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    deleteStudentSubject: id => ({
      endPoint: `/api/student_subject/delete/${id}`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
};
