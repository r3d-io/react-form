import { ADD_USER } from '../actions/types';

const timeoutScheduler = store => next => action => {
  // console.log("middleware", action)
  if (action.type !== ADD_USER) {
    return next(action)
  }

  store.dispatch({ type: "USER_ADD_INPROGRESS" })
  const timeoutId = setTimeout(() => next(action), 2000)
  setTimeout(() => {
    store.dispatch({ type: "USER_ADD_COMPLETE" })
  }, 2100);
}

export default timeoutScheduler