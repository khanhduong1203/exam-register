import moment from 'moment';

export const ROOM = [
  {
    id: 1,
    name: 'P123',
    maxSlot: 10,
  },
  {
    id: 2,
    name: 'P234',
    maxSlot: 15,
  },
  {
    id: 3,
    name: 'P345',
    maxSlot: 20,
  },
  {
    id: 4,
    name: 'P456',
    maxSlot: 13,
  },
];

export const SUBJECT = [
  {
    id: 1,
    name: 'Giải tích 1',
  },
  {
    id: 2,
    name: 'Tin học cơ sở',
  },
  {
    id: 3,
    name: 'Đại số',
  },
  {
    id: 4,
    name: 'Khai phá dữ liệu',
  },
];

export const EXAM_SUBJECTS = [
  {
    name: 'CSDL',
    code: 'INT2201 2',
    shift: 1,
    day: moment(),
    start: '07:00',
    end: '09:00',
    status: true,
  },
  {
    name: 'KPDL',
    code: 'INT1102 2',
    shift: 2,
    day: moment(),
    start: '07:00',
    end: '09:00',
    status: true,
  },
  {
    name: 'THCS',
    code: 'INT2204 2',
    shift: 3,
    status: true,
    day: moment(),
    start: '07:00',
    end: '09:00',
  },
  {
    name: 'TTNT',
    code: 'INT2203 2',
    shift: 4,
    day: moment(),
    start: '07:00',
    end: '09:00',
    status: true,
  },
  {
    name: 'KHDV',
    code: 'INT2209 2',
    day: moment(),
    start: '07:00',
    end: '09:00',
    shift: 5,
    status: false,
  },
];

export const SHIFTS = [
  {
    id: 1, name: 'Ca 1', day: moment(), start: '07:00', end: '09:00',
  },
  {
    id: 2, name: 'Ca 2', day: moment(), start: '07:00', end: '09:00',
  },
  {
    id: 3, name: 'Ca 3', day: moment(), start: '07:00', end: '09:00',
  },
  {
    id: 4, name: 'Ca 4', day: moment(), start: '07:00', end: '09:00',
  },
  {
    id: 5, name: 'Ca 5', day: moment(), start: '07:00', end: '09:00',
  },
];

export const EXAMS = [
  {
    id: 1,
    name: 'Cuối kì 1 - năm học 2019-2020',
  },
  {
    id: 2,
    name: 'Cuối kì 2 - năm học 2018-2019',
  },
  {
    id: 3,
    name: 'Cuối kì 1 - năm học 2018-2019',
  },
];
