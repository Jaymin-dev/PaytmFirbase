import { combinedReducers } from './reducers/mainReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './sagas/mainSaga';

const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(mainSaga);

export { store };
