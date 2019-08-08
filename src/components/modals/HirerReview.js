import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import ModalCard from '../common/ModalCard';
import Row from '../common/Row';
import { Spinner } from '../common';
import { TextButton } from '../buttons/Button';
import { tasksDB, mainColor, fontSize } from '../../Constants';
import { TextStyle } from '../../StyleSheet';


class ViewOffer extends Component {
  state = {
    hirerRating: -1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading } = this.state;
    if (loading && prevState.loading != loading) {
      this.checkForm();
    }
  }

  checkForm() {
    const { hirerRating } = this.state;
    if (hirerRating == -1) {
      alert('Please rate the hirer.');
      this.setState({ loading: false });
    } else {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    task = tasksDB.doc(this.props.taskID);
    task.get().then((taskInfo) => {
      if (taskInfo.data().taskRating) {
        taskUpdate = {
          hirerRating: this.state.hirerRating,
          status: 'completed',
          progress: 'Completed',
          dateEnd: new Date(),
        };
        task.update(taskUpdate).then((data) => {
          alert('Helper successfully rated');
          this.setState({ loading: false });
        });
      } else {
        alert('Task has not been reviewed by hirer');
        this.setState({ loading: false });
      }
    });
  }

  renderSubmitButton() {
    switch (this.state.loading) {
      case true:
        return <Spinner />;
        break;
      default:
        return <TextButton text="submit" color={mainColor} onPress={() => this.setState({ loading: true })} />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* Heading */}
          <Text style={[sectionEnd, TextStyle.Regular, { textAlign: 'center', fontSize: fontSize.L }]}>Please rate your hirer</Text>

          {/* Hirer Rating */}
          <View style={[sectionEnd, { flexDirection: 'row', justifyContent: 'space-around' }]}>
            <TouchableOpacity onPress={() => this.setState({ hirerRating: 0 })}><Image style={ratingStyle} source={this.state.hirerRating == 0 ? require('../images/thumbDwn-circle-fill-ic.png') : require('../images/thumbDwn-circle-wire-ic.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ hirerRating: 1 })}><Image style={ratingStyle} source={this.state.hirerRating == 1 ? require('../images/thumbUp-circle-fill-ic.png') : require('../images/thumbUp-circle-wire-ic.png')} /></TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {this.renderSubmitButton()}
          </View>

        </ModalCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userPic: {
    backgroundColor: 'grey',
    height: fontSize.M,
    width: fontSize.M,
    borderRadius: fontSize.M / 2,
    marginRight: 5,
  },
  ratingStyle: {
    height: fontSize.M * 3,
    width: fontSize.M * 3,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  sectionEnd: {
    marginBottom: 25,
  }
});

const { sectionEnd, ratingStyle } = styles;

export default ViewOffer;
