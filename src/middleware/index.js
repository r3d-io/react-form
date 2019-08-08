import {
  call, take, put, delay,
} from 'redux-saga/effects';
import { ADD_USER } from '../actions/types';

// export const timeoutScheduler = store => next => (action) => {
//   console.log("middleware", action)
//   if (action.type !== ADD_USER) {
//     return next(action);
//   }

//   next({ type: 'USER_ADD_INPROGRESS' });
//   setTimeout(() => {
//     next(action);
//     next({ type: 'USER_ADD_COMPLETE' });
//   }, 2000);
// };

function* watchScheduler(action) {
  const userData = { isInsert: true, ...action };
  yield put({ type: 'USER_ADD_INPROGRESS' });
  yield delay(2000);
  yield put({ type: ADD_USER, ...userData });
  yield put({ type: 'USER_ADD_COMPLETE' });
}

function* timeoutSchedulerSaga() {
  while (true) {
    const action = yield take(ADD_USER);
    yield call(watchScheduler, action);
  }
}

// export default timeoutScheduler
export default timeoutSchedulerSaga;
