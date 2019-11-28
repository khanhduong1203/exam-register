import { createSelector } from 'reselect';

export default (state, dataPath, field) => {
  const selectReducer = () => (Array.isArray(dataPath) ? state.getIn(dataPath) : state.get(dataPath));
  return createSelector(selectReducer, selectedReducer => selectedReducer.get(field))();
};
