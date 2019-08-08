import React, { Component } from 'react';
import {} from 'react-native';

// Local Imports
import Modal from './Modal';
import { Input } from '../common/TextInputs';

export default class TaskEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enquiryInput: '',
    };
  }

  render() {
    const { onPressL, onPressR, onFocus } = this.props;

    return (
      <Modal
        header="Task information unclear?"
        buttonL="close"
        onPressL={onPressL}
        closeAction={onPressL}
        buttonR="submit"
        onPressR={onPressR}
      >
        <Input
          placeholder="how could the description be improved"
          value={this.state.enquiryInput}
          onChangeText={enquiryInput => this.setState({ enquiryInput })}
          onFocus={onFocus}
        />
      </Modal>
    );
  }
}
