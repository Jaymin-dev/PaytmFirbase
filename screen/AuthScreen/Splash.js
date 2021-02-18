import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';

const Splash = (props) => {
    const [animating, setAnimating] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    const AuthUser = async () => {
        let user = await AsyncStorage.getItem('user');
        let value = JSON.parse(user);
        console.log("value", value)
        return setUser(value.token)
        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber;
    }

    useEffect(() => {
        // AuthUser()
        setTimeout(() => {
            setAnimating(false);
        }, 3000);
    }, []);

    if (!animating) {
        let user = auth().currentUser;
        if (user) {
            props.navigation.navigate("Home");
        }
        else {
            props.navigation.navigate("Login");
        }
    }

    return (
        <View style={style.container}>
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={style.activityIndicator}
            />
        </View>
    );
};


const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});

export default Splash;