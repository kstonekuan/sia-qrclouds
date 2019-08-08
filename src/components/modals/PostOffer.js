import React, { Component } from 'react';
import { Alert, Platform, View, Text, TextInput, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { TextButton } from '../buttons/Button';
import { Spinner } from '../common';
import ModalCard from '../common/ModalCard';
import { isFigureDecimal } from '../functions/numericChecks';
import { isAppropriate } from '../functions/languageCheck';
import { tasksDB, offersDB, minPrice, mainColor, grey, midGrey, t } from '../../Constants';
import { TextStyle } from '../../StyleSheet';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BaseURL = 'https://us-central1-authentication-6c7f5.cloudfunctions.net';

class PostOffer extends Component {
  constructor(props) {
    super(props);
    const { subStatus, offerAmount, offerDescription } = this.props;
    const buildState = {
      currentUser: null,
      loading: false,
      offerAmount: '0',
      offerDescription: '',
    };
    if (subStatus == 'cleared') {
      buildState.offerAmount = buildState.offerAmountInitial = offerAmount;
      buildState.offerDescription = buildState.offerDescriptionInitial = offerDescription;
    }
    this.state = buildState;
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    this.setState({ currentUser: user });
  }

  handleAmountInput(inputText) {
    const offerAmount = isFigureDecimal(inputText) ? inputText : this.state.offerAmount;
    this.setState({ offerAmount });
  }

  handleSubmit() {
    this.setState({ loading: true });
    if (this.state.offerAmount == null || this.state.offerAmount == ''
        || this.state.offerDescription == null || this.state.offerDescription == '') {
      alert('Please ensure all fields are filled up');
      this.setState({ loading: false });
    } else if (parseFloat(this.state.offerAmount).toFixed(2) >= minPrice) {
      if (isAppropriate(this.state.offerDescription)) {
        info = {
          helperID: this.state.currentUser.uid,
          offerAmount: this.state.offerAmount,
          offerDescription: this.state.offerDescription,
          status: 'pending',
          offerDate: {
            posted: new Date(),
          },
          taskID: this.props.taskID,
          taskTitle: this.props.taskTitle,
        };
        offersDB.add(info).then((data) => {
          tasksDB.doc(this.props.taskID).update({ lastActivity: new Date() }).then(() => {
            alert('Your offer has been sent');
            Actions.AvailableTask();
          });
        }).catch((error) => {
          console.log(error);
          this.setState({ loading: false });
        });
      } else {
        alert('Offensive language is not permitted.');
        this.setState({ loading: false });
      }
    } else {
      alert('Your amount offered is too low.');
      this.setState({ loading: false });
    }
  }
  startFirstCharge = (taskID, taskAmount, userID) => {

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
  acceptTask(taskID) {
    const user = firebase.auth().currentUser;
    const task = tasksDB.doc(taskID);
    const now = new Date();
    taskUpdate = {
      taskAmount: this.props.taskBudget,
      helperID: user.uid,
      status: 'ongoing',
      lastActivity: now,
    };
    this.setState({ loading: true });
    task.get().then((snapShot) => {
      if (snapShot.data().helperID == '') {
        task.update(taskUpdate).then(() => {
          task.get().then((oInfo) => {
            //Charge for task start
            this.startFirstCharge(taskID, oInfo.data().taskAmount, oInfo.data().hirerID);
            this.setState({ loading: false }, () => {
              Actions.reset('OngoingView', {
                card: {
                  dateDue: oInfo.data().dateDue,
                  taskID: oInfo.id,
                  taskTitle: oInfo.data().taskTitle,
                  taskAmount: oInfo.data().taskAmount,
                  taskLocation: oInfo.data().taskLocation,
                  endTaskLocation: oInfo.data().endTaskLocation ? oInfo.data().endTaskLocation : '',
                  taskDescription: oInfo.data().taskDescription,
                  progress: oInfo.data().progress,
                  taskRating: oInfo.data().taskRating,
                  hirerID: oInfo.data().hirerID,
                  helperID: oInfo.data().helperID
                }
              });
            });
          });
        }).catch((error) => {
          console.log(error.toString());
          alert(`An unexpected error has occurred:\n${error.toString()}`);
          this.setState({ loading: false });
        });
      } else {
        Alert.alert('', 'Task has already been accepted');
        this.setState({ loading: false });
      }
    });
  }

    updateOffer = () => {
      const { offerID } = this.props;
      const { offerAmount, offerAmountInitial, offerDescription, offerDescriptionInitial, subStatus } = this.state;
      const updateInfo = { offerDate: { posted: new Date() }, subStatus: null };
      if (offerAmount != offerAmountInitial) {
        updateInfo.offerAmount = offerAmount;
      }
      if (offerDescription != offerDescriptionInitial) {
        updateInfo.offerDescription = offerDescription;
      }
      offersDB.doc(offerID).update(updateInfo).then(() => {
        alert('Offer successfully updated.');
        this.props.closeAction();
      });
    }

    renderOfferAmountField() {
      const { taskType, taskBudget } = this.props;
      if (taskType == 'instant') {
        return <Text style={[TextStyle.Regular, { fontSize: 22, color: grey, textAlign: 'center' }]}>{`Accept this task for $${taskBudget}?`}</Text>;
      }
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <Text style={[TextStyle.Regular, { fontSize: 40, marginRight: 5, color: mainColor }]}>$</Text>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={[TextStyle.Regular, { color: mainColor, fontSize: 40 }]}
            placeholderTextColor={mainColor}
            value={this.state.offerAmount}
            keyboardType="numeric"
            onChangeText={offerAmount => this.handleAmountInput(offerAmount)}
            selectTextOnFocus
          />
        </View>
      );
    }

    renderOfferDescriptionField() {
      const { taskType } = this.props;
      if (taskType != 'instant') {
        return (
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={[TextStyle.Regular, { color: grey, width: 350 - 40, fontSize: 22, marginBottom: 10 }]}
            placeholderTextColor={midGrey}
            placeholder="enter a write up here"
            maxLength={140}
            value={this.state.offerDescription}
            onChangeText={offerDescription => this.setState({ offerDescription })}
          />
        );
      }
    }

    renderButtons() {
      const { loading } = this.state;
      const { taskType, subStatus } = this.props;
      const instantTask = (taskType == 'instant');
      const editedTask = (subStatus == 'cleared');
      const sendOffer = (<TextButton text="Submit" txtColor={mainColor} onPress={this.handleSubmit.bind(this)} />);
      const cancelOffer = (<TextButton text="Cancel" onPress={this.props.closeAction} />);
      const instantHire = (<TextButton text="yes" txtColor={mainColor} onPress={() => this.acceptTask(this.props.taskID)} />);
      const cancelInstantHire = (<TextButton text="no" onPress={this.props.closeAction} />);
      let closeButton = null;
      let buttonL = instantTask ? instantHire : sendOffer;
      let buttonR = instantTask ? cancelInstantHire : cancelOffer;
      if (editedTask) {
        const { offerAmount, offerAmountInitial, offerDescription, offerDescriptionInitial } = this.state;
        let buttonLText = 'Update';
        if (offerAmount == offerAmountInitial && offerDescription == offerDescriptionInitial) {
          buttonLText = 'Repost';
        }
        buttonL = <TextButton text="Cancel Offer" txtColor="#d22" onPress={() => this.props.cancelAction()} />;
        buttonR = <TextButton text={buttonLText} txtColor={mainColor} onPress={() => this.updateOffer()} />;
        closeButton = (
          <View style={{ flex: 1 }}>
            <TextButton text="Close" onPress={this.props.closeAction} />
          </View>
        );
      }

      if (loading) {
        return <Spinner fontSize="small" />;
      }
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <View>
            {buttonL}
          </View>
          <View>
            {buttonR}
          </View>
        </View>
      );
    }

    renderCloseButton() {
      const { subStatus } = this.props;
      const closeButton = subStatus == 'cleared' ? (
        <View style={{ flexDirection: 'row' }}>
          <TextButton text="Close" onPress={this.props.closeAction} />
        </View>
      ) : null;
      return closeButton;
    }

    renderTitle() {
      const { taskType, subStatus } = this.props;
      let title = 'Enter your offer';
      if (subStatus == 'cleared') {
        title = 'Update your offer';
      }
      if (taskType == 'instant') {
        title = 'Accept Task';
      }
      return <Text style={[TextStyle.Regular, { fontSize: 26, marginBottom: 10, color: mainColor, textAlign: 'center' }]}>{title}</Text>;
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <ModalCard>
            {this.renderTitle()}
            {this.renderOfferAmountField()}

            {this.renderOfferDescriptionField()}
            {this.renderButtons()}
            {this.renderCloseButton()}
          </ModalCard>

        </View>
      );
    }
}

export default PostOffer;
