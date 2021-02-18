import React from 'react';
import { Modal, View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
export default class PaymentsScreen extends React.Component {

    state = {
        ORDER_ID: '2w',
        CUST_ID: 'Aditya123',
        TXN_AMOUNT: '100'
    }

    handleResponse = async (data) => {
        if (data.title == 'true') {
            //handle successfull payment here
        } else if (data.title == 'false') {
            //handle failed payment here
        }
    }
    // call = () => {
    //     let param = {
    //         ORDER_ID: 'qwqwqqwqwqwqw',
    //         INDUSTRY_TYPE_ID: 'Retail',
    //         CUST_ID: 'asdasd22',
    //         CHANNEL_ID: 'WAP',
    //         TXN_AMOUNT: '200',
    //         WEBSITE: 'WEBSTAGING',
    //         MID: 'exWpRf89337383856908',
    //         CALLBACK_URL: 'http://192.168.29.76:3001/api/paytm/response',
    //         CHECKSUMHASH: 'wqv9E0rC1TIlEgNIBtEKVduCPD9ItgSilvMXy9TDcOqo4jKEFjQoJ0Qm9nz5OPJBgzuyK4lm4PVfzj1+IIcqRf3gbaHkZAaCFYTtxOtDoPw='
    //     }
    //     axios.post("http://securegw-stage.paytm.in/order/process", param, {

    //         "headers": {

    //             "content-type": "application/json",

    //         },

    //     })
    //         .then(function (response) {

    //             console.log("myres", response);

    //         })

    //         .catch(function (error) {

    //             console.log("myerr", error);

    //         });

    // };

    render() {

        let { ORDER_ID, CUST_ID, TXN_AMOUNT } = this.state;

        return (
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                source={{ uri: 'http://192.168.29.76:3001/api/paytm/request' }}
                injectedJavaScript={`document.getElementById("ORDER_ID").value = "${ORDER_ID}";document.getElementById("CUST_ID").value = "${CUST_ID}";document.getElementById("TXN_AMOUNT").value = "${TXN_AMOUNT}";`}
                onNavigationStateChange={(data) => this.handleResponse(data)}
            />

        );
    }
}