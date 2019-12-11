const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  header: () => ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
      endPoint: '/api/authenicate',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
      payload,
    }),
    loginWithToken: () => ({
      endPoint: '/api/v1/login/token',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    changePassword: () => ({
      endPoint: '/api/v1/login/users/change_password',
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  EXAM: {
    getExams: () => ({
      endPoint: '/api/v1/exam/all',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getExam: id => ({
      endPoint: `/api/v1/exam/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    createExam: () => ({
      endPoint: '/api/v1/exam',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateExam: id => ({
      endPoint: `/api/v1/exam/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
  },
  STUDENT: {
    getStudents: () => ({
      endPoint: '/api/v1/student',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    getStudent: id => ({
      endPoint: `/api/v1/student/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    insertStudent: () => ({
      endPoint: '/api/student/add',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    updateStudent: id => ({
      endPoint: `/api/v1/student/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteStudent: id => ({
      endPoint: `/api/v1/student/${id}`,
      method: 'DELETE',
      headers: HEADERS.header(),
    }),
  },
  SUBJECT: {
    getSubjects: () => ({
      endPoint: '/api/v1/subject',
      method: 'GET',
      headers: HEADERS.header(),
    }),
    insertSubject: () => ({
      endPoint: '/api/v1/subject',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    getSubject: id => ({
      endPoint: `/api/v1/subject/${id}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    updateSubject: id => ({
      endPoint: `/api/v1/subject/${id}`,
      method: 'PUT',
      headers: HEADERS.header(),
    }),
    deleteSubject: id => ({
      endPoint: `/api/v1/subject/${id}`,
      method: 'DELETE',
      headers: HEADERS.header(),
    }),
  },
};
