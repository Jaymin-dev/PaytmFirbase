import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage, NativeModules } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import Payment from "./Payment";
const Home = (props) => {
    const logout = () => {
        AsyncStorage.removeItem('user');
        props.navigation.navigate("Login")
    }
    // const AllInOneSDKManager = NativeModules.AllInOneSDKManager;
    const pay = () => {
        props.navigation.navigate("Payment");
        // AllInOneSDKManager.startTransaction("@dssd.322323", "AliSub58582630351896", "fe795335ed3049c78a57271075f2199e1526969112097", "1.0", "https://securegw-stage.paytm.in/theia/paytmCallback",
        //     yes, displayResult);
    }

    useEffect(() => {


    }, [])
    const displayResult = (result) => { alert(result); }
    // useEffect(async () => {
    //     const enabled = await firebase.messaging().hasPermission();
    //     if (enabled) {
    //         firebase.messaging()
    //             .getToken()
    //             .then(fcmToken => {
    //                 if (fcmToken) {
    //                     console.log(fcmToken);
    //                     // firebase
    //                     //     .database()
    //                     //     .ref("/users/" + Math.floor(Math.random() * Math.floor(1000)))
    //                     //     .set({
    //                     //         email: "instaman@gmail.com",
    //                     //         notification_token: fcmToken,
    //                     //         created_at: Date.now(),
    //                     //     })
    //                     //     .then(res => {
    //                     //         console.log(res);
    //                     //     });
    //                 } else {
    //                     alert("user doesn't have a device token yet");
    //                 }
    //             });
    //     } else {
    //         alert("no");
    //     }

    // }, [])
    return (
        <View style={style.contanier}>
            <Button onPress={() => { logout() }} title={'logout'} />
            <Button onPress={() => { pay() }} title={'pay'} />
            <Button onPress={() => { props.navigation.navigate("Google_pay") }} title={'Google pay'} />
        </View>
    );
};

export default Home;


const style = StyleSheet.create({
    contanier: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        marginTop: 100
    },
});