import { all, takeEvery, take } from "redux-saga/effects";
import authSaga from './authSaga';

function* hellosaga() {
    console.log("hello from saga");
}

export function* mainSaga() {
    yield all([
        takeEvery('TEST/ALO', hellosaga),
        authSaga,
    ]);
}