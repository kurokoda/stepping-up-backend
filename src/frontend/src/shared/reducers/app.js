import createReactClass from 'create-react-class';
import Immutable from 'immutable';
import React from 'react';
import * as ActionType from '../actions/app';

const Content = createReactClass({
  render: function () {
    return (
      <div>
        HELLO PIGGY
      </div>
    )
  }
})

const defaultState = Immutable.fromJS({
  modal : {
    Content       : null,
    onAfterOpen   : null,
    onRequestClose: null,
    styles        : null,
    contentLabel  : 'Bitch Label'
  },
  errors: {},
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionType.MODAL_SHOW:
      return state.merge({modal: action.payload});
    case ActionType.MODAL_HIDE:
      return state.merge({modal: null});
    default:
      return state;
  }
}
