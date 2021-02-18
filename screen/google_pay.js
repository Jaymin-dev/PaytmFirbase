import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage, NativeModules } from 'react-native';
import { GooglePay } from 'react-native-google-pay';

const Home = (props) => {
    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    const requestData = {
        cardPaymentMethod: {
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                // stripe (see Example):
                gateway: 'stripe',
                gatewayMerchantId: 'BCR2DN6TWPB5P3JZ',
                stripe: {
                    publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
                    version: '2020-12-08',
                },
                // other:
                gateway: 'example',
                gatewayMerchantId: 'BCR2DN6TWPB5P3JZ',
            },
            allowedCardNetworks,
            allowedCardAuthMethods,
        },
        transaction: {
            totalPrice: '10',
            totalPriceStatus: 'FINAL',
            currencyCode: 'USD',
        },
        merchantName: 'Example Merchant',
    };

    // Set the environment before the payment request
    const call = () => {
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

        // Check if Google Pay is available
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
            .then((ready) => {
                if (ready) {
                    // Request payment token
                    GooglePay.requestPayment(requestData)
                        .then((token) => {
                            // Send a token to your payment gateway
                            alert(token)
                        })
                        .catch((error) => console.log(error.code, error.message));
                }
            })

    }
    return (
        <View style={style.contanier}>
            {call()}
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