import { all, takeLatest, put, call } from 'redux-saga/effects';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from '../reducers/authReducer';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore'
import { AsyncStorage } from 'react-native';
function* handleRegister(action) {
    try {
        auth().createUserWithEmailAndPassword(action.payload.Email, action.payload.Password).then((Response) => {
            let dataAsync = {
                token: Response.user._user.refreshToken
            };
            AsyncStorage.setItem('user', JSON.stringify(dataAsync));
            const uid = Response.user.uid;
            const data = {
                id: uid,
                Name: action.payload.Name,
                Age: action.payload.Age,
                Address: action.payload.Address
            }
            const userRef = firestore().collection("user");
            userRef.doc(uid).set(data).then(() => {
                put({
                    type: REGISTER_SUCCESS,
                });
            }).catch((error) => {
                const errors = null;
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    return errors = 'That email address is already in use!'
                    // console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    return errors = 'That email address is invalid!'
                    //console.log('That email address is invalid!');
                }
                put({
                    type: REGISTER_ERROR,
                    error: errors,
                });
            })
            return true
        }).catch((error) => {
            put({
                type: REGISTER_ERROR,
                error: 'Something went wrong, Please try again later',
            });
            if (error.code == 'auth/email-already-in-use') {
                alert("That email address is already in use!")
                put({
                    type: REGISTER_ERROR,
                    error: 'That email address is already in use!',
                });

                // console.log('That email address is already in use!');
            }
            else if (error.code === 'auth/invalid-email') {
                alert("That email address is invalid!")
                return put({
                    type: REGISTER_ERROR,
                    error: 'That email address is invalid!',
                });
                //console.log('That email address is invalid!');
            }

        })
    }
    catch (error) {
        put({
            type: REGISTER_ERROR,
            error: 'Something went wrong, Please try again later',
        });
    }

}

export default all([
    takeLatest(REGISTER_REQUEST, handleRegister),
]);