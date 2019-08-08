import firebase from 'react-native-firebase';
import React from 'react';
import { StyleSheet, Text, View,Button, DeviceEventEmitter, NativeModules } from 'react-native';
import StripeAPI from '../../util/Stripe/StripeAPI';
import StripeAccount from '../../util/Stripe/StripeAccount';
import StripeCharges from '../../util/Stripe/StripeCharges';
import StripeRefund from '../../util/Stripe/StripeRefund';
//import publicIP from 'react-native-public-ip';
import Property from '../../util/Property';




class processPayment {

    static chargePaymentStripe = (ID, amount, description) => {

         var charge = new StripeCharges();
         // charge.customer = "acct_1Dc6dXAzig0Px9BC";
         charge.source = "acct_1Dc7Z1Lgu7pSFaqQ";
         // charge.customer = "cus_DMp1IXnSelL3r8";
         charge.amount = amount;
         charge.currency = "sgd";
         charge.description = description;
         charge.transfer_group = "Task" + StripeAPI.getUNIXTimestamp();
         return StripeAPI.chargePayment(charge).then(resp => {
               if(resp == StripeAPI.ERROR) {
                     return resp;
               } else {
                     var transfer = new StripeCharges();
                     transfer.source_transaction = resp.id;
                     transfer.amount = resp.amount * Property.HELPER_RECEIVE_PERCENT;
                     transfer.currency = resp.currency;
                     transfer.destination = "acct_1Dc6dXAzig0Px9BC";
                     transfer.transfer_group = resp.transfer_group;
                     StripeAPI.transferPayment(transfer).then (resp => {
                       return resp;
                     });
               }
         });

    };

    static transferPaymentStripe = (ID, amount, destination) => {
          var transfer = new StripeCharges();
          transfer.source_transaction = ID;
          transfer.amount = amount;//resp.amount * Property.HELPER_RECEIVE_PERCENT;
          transfer.currency = "sgd";
          transfer.destination = destination;
          return StripeAPI.transferPayment (transfer).then (resp => {
          console.log(resp)
            return resp;
          });
    };

    static refundPaymentStripe = () => {

          return StripeAPI.reverseTransfer("tr_1DuNuhFxDJfXsjmq4b3SBd8E").then(resp => {
          console.log(resp)
              if(resp == StripeAPI.ERROR) {
                this.setState({ refundStatus: JSON.stringify(resp)});
              } else {
                var refund = new StripeRefund();
                refund.reverse_transfer = false;
                refund.charge = "ch_1DuNugFxDJfXsjmqTb4PsnVg";
                // refund.amount = 10* 100;
                refund.reason = "requested_by_customer";
                StripeAPI.refundPayment(refund).then(resp => {
                  return resp;
                });
              }

          });
    };

}

export default processPayment;