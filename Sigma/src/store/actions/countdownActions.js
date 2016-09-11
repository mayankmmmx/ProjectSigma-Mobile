import * as ActionTypes from '../ActionType';

export function setReady(ready) {
  return {
    type: ActionTypes.IS_READY,
    ready
  };
}
