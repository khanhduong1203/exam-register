EXAM_SHIFT: {
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
