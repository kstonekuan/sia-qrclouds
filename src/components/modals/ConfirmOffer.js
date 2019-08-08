import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { offersDB, tasksDB, mainColor, fontSize, t } from '../../Constants';
import { TextStyle } from '../../StyleSheet';
import { Spinner } from '../common';


const BaseURL = 'https://us-central1-authentication-6c7f5.cloudfunctions.net';

class ConfirmOffer extends Component {
  constructor(props){
      super(props);
      this.state = {
        loading: false
      }
  }
  approveOffer(offerID, taskID) {
    const offer = offersDB.doc(offerID);
    const task = tasksDB.doc(taskID);
    this.setState({loading: true}, () => {
      offer.get().then((offer) => {
        taskUpdate = {
          taskAmount: offer.data().offerAmount,
          helperID: offer.data().helperID,
          status: 'ongoing',
          dateStart: new Date(),
        };
        // Charge for task start
        this.startFirstCharge(taskID, offer.data().offerAmount);
        task.update(taskUpdate).catch((error) => {
          console.log(error.toString());
          alert(`An unexpected error has occurred:\n${error.toString()}`);
        });
      });

      offer.update({ status: 'ongoing' }).then((data) => {
        alert('Offer successfully approved');
      }).catch((error) => {
        console.log(error.toString());
        alert(`An unexpected error has occurred:\n${error.toString()}`);
      });
    })
  }

  startFirstCharge = (taskID, taskAmount) => {

      const userID = firebase.auth().currentUser.uid;

      try {
          fetch(
              `${BaseURL}/${t}handle_Charge`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID: userID,
                    taskID: taskID,
                    taskAmount: (taskAmount * 100),
                    type: 'charge'
                }),
              }
          )
          .then((confirmResult) => confirmResult.json())
          .then((result) => {
            if(result.success == true){

               console.log('success');
            }

          });
      } catch (err) {
        console.log(err);
      }

  }

  render() {
    const { cancelAction, offerInfo, taskID } = this.props;
    const { loading } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* modal head */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Select this offer?</Text>

          {/* Buttons */}
          {!loading &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextButton text="cancel" onPress={cancelAction} />
            <TextButton text="confirm" color={mainColor} onPress={() => this.approveOffer(offerInfo.offerID, taskID)} />
          </View>}
          {loading && <Spinner />}

        </ModalCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionEnd: {
    marginBottom: 25,
  }
});

const { sectionEnd } = styles;

export default ConfirmOffer;
