import Immutable from 'immutable';
import {ActionTypes} from '../actions/user';

const defaultState = null;

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return Immutable.fromJS({email: action.data.email});
    case ActionTypes.USER_LOGOUT:
      return null;
    default:
      return state;
  }
}
