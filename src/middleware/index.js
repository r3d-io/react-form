import { ADD_USER } from '../actions/types';
import { takeEvery, call, take, put, delay, cancel } from 'redux-saga/effects'

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

function* watchScheduler(action) {
  console.log(action)
  action.isInsert = true
  yield put({ type: "USER_ADD_INPROGRESS" })
  yield delay(2000)
  yield put({ type: ADD_USER, ...action })
  yield put({ type: "USER_ADD_COMPLETE" })
}

function* timeoutSchedulerSaga() {
  while (true) {
    let action = yield take(ADD_USER)
    yield call(watchScheduler, action)
  }
}

// export default timeoutScheduler
export default timeoutSchedulerSaga