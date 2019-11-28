import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';

const initialState = fromJS({
  currentPage: [''],
  notifications: [],
  title: '',
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_PAGE: {
      const { pageName, title } = action.payload;
      return state.merge(fromJS({ currentPage: [pageName], title }));
    }
    case TYPE.PUSH_NOTIFICATION:
      return state.updateIn(['notifications'], array => array.push(fromJS(action.payload)));
    case TYPE.POP_NOTIFICATION:
      return state.updateIn(['notifications'], array => array.filter(item => item.get('key') !== action.payload.get('key')));
    default:
      return state;
  }
};
export default appReducer;
