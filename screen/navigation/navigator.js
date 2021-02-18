import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../AuthScreen/Splash';
import Login from '../AuthScreen/Login';
import Register from '../AuthScreen/Register';
import Home from '../Home';
import Payment from "../Payment";
import Google_pay from "../google_pay";

const stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName='Splash'
            >
                <stack.Screen name="Splash" component={Splash}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen name="Login" component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen name="Register" component={Register}
                    options={{
                        headerShown: false
                    }}
                />
                <stack.Screen name="Home" component={Home}
                    options={{ headerLeft: false }}
                />
                <stack.Screen name="Payment" component={Payment}
                    options={{ headerLeft: false }}
                />
                <stack.Screen name="Google_pay" component={Google_pay}
                    options={{ headerLeft: false }}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;