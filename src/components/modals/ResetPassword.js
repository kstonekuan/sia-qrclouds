import React, { Component } from 'react';
import { TextInput } from 'react-native';

// Local Import
import Modal from './Modal';

// References
import { TextStyle } from '../../StyleSheet';
import { lightGrey } from '../../Constants';


export default class ResetPassword extends Component {
  state = {
    email: null,
  };

  resetPassword = () => {
    const { email } = this.state;
    this.props.resetAction(email);
  }

  render() {
    const { closeAction } = this.props;

    return (
      <Modal
        header="Reset Password"
        buttonL="cancel"
        onPressL={() => closeAction()}
        buttonR="submit"
        onPressR={() => this.resetPassword()}
        closeAction={() => closeAction()}
      >
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="enter email here to get recovery link"
          placeholderTextColor={lightGrey}
          style={[TextStyle.Regular, { textAlign: 'center' }]}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
      </Modal>
    );
  }
}
