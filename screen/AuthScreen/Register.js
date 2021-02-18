import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';

import Loader from '../component/Loader';
import { useDispatch, useSelector, connect } from 'react-redux'
import { register } from '../../redux/actions/authAction'
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const Register = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConPassword, setUserConPassword] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);
    const { flages, errors } = props;
    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const dispatch = useDispatch();
    const { error, flage } = useSelector(({ auth }) => auth);

    const handleSubmitButton = (flage) => {
        setErrortext('');
        //Show Loader
        setLoading(true);
        if (!userName) {
            alert('Please fill Name');
            setLoading(false)
            return;
        }
        else if (!userEmail) {
            alert('Please fill Email');
            setLoading(false)
            return;
        }
        else if (!userAge) {
            alert('Please fill Age');
            setLoading(false)
            return;
        }
        else if (!userAddress) {
            alert('Please fill Address');
            setLoading(false)
            return;
        }
        else if (!userPassword || userPassword.length > 6) {
            alert('Please fill Password');
            setLoading(false)
            return;
        }
        else if (!userPassword === userConPassword) {
            alert('Please fill Right confirmPassword');
            setLoading(false)
            return;
        }
        else {
            setLoading(false);
            let errors;
            auth().createUserWithEmailAndPassword(userEmail, userPassword).then((Response) => {
                let dataAsync = {
                    token: Response.user._user.refreshToken
                };
                AsyncStorage.setItem('user', JSON.stringify(dataAsync));
                const uid = Response.user.uid;
                const data = {
                    id: uid,
                    Name: userName,
                    Age: userAge,
                    Address: userAddress
                }
                const userRef = firestore().collection("user");
                userRef.doc(uid).set(data).then(() => {
                    props.navigation.navigate("Home");
                    setLoading(false);
                }).catch((error) => {
                    console.log(error)
                    alert(error.nativeErrorMessage)
                    console.error(error);
                })
            }).catch((error) => {
                alert(error.nativeErrorMessage)
                console.error(error);
            })

            // const data = {
            //     Email: userEmail,
            //     Password: userPassword,
            //     Name: userName,
            //     Age: userAge,
            //     Address: userAddress
            // }
            // dispatch(register(data))
            // // setLoading(false)
            // if (flage.registerSuccess == false) {
            //     setLoading(false)
            // }
            // if (error.register) {
            //     alert(error.register)
            //     setLoading(false)
            // }
        }


    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Text style={styles.successTextStyle}>
                    Registration Successful
        </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginTop: 100,
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text}>Register</Text>
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current &&
                                emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (UserEmail) => setUserEmail(UserEmail)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (password) => setUserPassword(password)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (password) => setUserConPassword(password)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter confirmPassword"
                            placeholderTextColor="#8b9cb5"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (UserAge) => setUserAge(UserAge)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (UserAddress) => setUserAddress(UserAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => handleSubmitButton(flage)}>
                        <Text style={styles.buttonTextStyle}>
                            REGISTER
            </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default Register;



const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    text: {
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#FFA500'
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
