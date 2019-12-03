const ROUTER = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    CHANGE_PASSWORD: '/change-password',
  },
  EXAM: {
    INDEX: '/exam',
    ADD: '/exam/add',
    EDIT: '/exam/:id',
  },
  SUBJECT: {
    INDEX: '/subject',
    ADD: '/subject/add',
    EDIT: '/subject/:id',
  },
  SCHEDULE: {
    INDEX: '/schedule',
  },
  STUDENT: {
    INDEX: '/student',
    ADD: '/student/add',
    EDIT: '/student/:id',
  },
  STUDENT_INFO: {
    INDEX: '/student-info',
  },
  EXAM_REGISTRATION: {
    INDEX: '/exam-registration',
  },
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
};
export default ROUTER;
