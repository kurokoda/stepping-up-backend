import Immutable from 'immutable';
import * as ActionType from '../../actions/user';

const defaultState = Immutable.fromJS({});

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionType.LOG_IN:
      return state.merge({});
    case ActionType.LOG_OUT:
      return state.merge({});
    default:
      return state;
  }
}
