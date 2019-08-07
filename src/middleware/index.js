import { ADD_USER } from '../actions/types';

const timeoutScheduler = store => next => action => {
  // console.log("middleware", action)
  if (action.type !== ADD_USER) {
    return next(action)
  }

  next({ type: "USER_ADD_INPROGRESS" })
  const timeoutId = setTimeout(() => {
    next(action)
    next({ type: "USER_ADD_COMPLETE" })
  }, 2000)
}

export default timeoutScheduler