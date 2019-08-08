import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { tasksDB, mainColor, fontSize, lightGrey } from '../../Constants';
import { Spinner } from '../common';
import { isAppropriate } from '../functions/languageCheck';
import { TextStyle } from '../../StyleSheet';


class ViewOffer extends Component {
  state = {
    taskRating: -1,
    taskReview: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading } = this.state;
    if (loading && prevState.loading != loading) {
      this.checkForm();
    }
  }

  checkForm() {
    const { taskRating, taskReview } = this.state;
    if (taskRating >= 0) {
      if (isAppropriate(taskReview)) {
        this.props.submitAction(this.state.taskRating, this.state.taskReview);
      } else {
        alert('Offensive language is not permitted.');
        this.setState({ loading: false });
      }
    } else {
      alert('The review must have a rating.');
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* Heading */}
          <Text style={[sectionEnd, TextStyle.Regular, { textAlign: 'center', fontSize: fontSize.L }]}>How was your helper's performance?</Text>

          {/* Helper Rating */}
          <View style={[sectionEnd, { flexDirection: 'row', justifyContent: 'space-around' }]}>
            <TouchableOpacity onPress={() => this.setState({ taskRating: 0 })}><Image style={ratingStyle} source={this.state.taskRating == 0 ? require('../images/thumbDwn-circle-fill-ic.png') : require('../images/thumbDwn-circle-wire-ic.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ taskRating: 1 })}><Image style={ratingStyle} source={this.state.taskRating == 1 ? require('../images/thumbUp-circle-fill-ic.png') : require('../images/thumbUp-circle-wire-ic.png')} /></TouchableOpacity>
          </View>

          {/* Helper Write up */}
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="add a write up of your helper?"
            placeholderTextColor={lightGrey}
            maxLength={140}
            style={[TextStyle.Regular, sectionEnd]}
            value={this.state.taskReview}
            onChangeText={inputText => this.setState({ taskReview: inputText })}
          />

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {
              loading
                ? <Spinner fontSize="large" />
                : <TextButton text="submit" color={mainColor} onPress={() => this.setState({ loading: true })} />
            }
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
