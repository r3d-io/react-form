import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import * as serviceWorker from './serviceWorker';

const timeoutScheduler = store => next => action => {
  if (action.type !== 'ADD_USER') {
    return next(action)
  }
  store.dispatch({type: "USER_ADD_INPROGRESS"})
  store.dispatch({type: "USER_ADD_COMPLETE"})
  const timeoutId = setTimeout(() => next(action), 2000)
  return function cancel() {
    clearTimeout(timeoutId)
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(logger, timeoutScheduler)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010
// https://www.codingame.com/playgrounds/8747/react-lifecycle-methods-render-and-componentdidmount