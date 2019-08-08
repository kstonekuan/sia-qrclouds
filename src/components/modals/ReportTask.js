import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';

// Local Imports
import CustomIcon from '../common/CustomIcon';
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { reportsDB, fontSize, mainBaseColor, lightGrey, black } from '../../Constants';
import { TextStyle } from '../../StyleSheet';

class ReportTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: false,
      reason: null,
      reasonOtherWriteUp: '',
    };
  }

  toggleReasonList() {
    const displayList = !this.state.displayList;
    this.setState({ displayList });
  }

  report() {
    const { userID, taskID } = this.props;
    const { reason, reasonOtherWriteUp } = this.state;
    if (reason) {
      if (userID && taskID) {
        reportInfo = {
          taskID: taskID,
          userID: userID,
          reason: reason,
          type: 'task',
          writeUp: reasonOtherWriteUp,
          dateReported: new Date(),
        };
        reportsDB.add(reportInfo).then((data) => {
          alert('Your report was successfully received.');
          this.props.closeAction();
        });
      } else {
        alert('Reporting is unavailable at this time. Please try again later.');
      }
    } else {
      alert('Please state the reason.');
    }
  }

  selectReason(reason) {
    const displayList = false;
    const reasonOthersWriteUp = '';
    this.setState({ reason, displayList, reasonOthersWriteUp });
  }

  renderReasonList() {
    const { displayList } = this.state;
    const ReasonListCard = ({ reason, last }) => (
      <TouchableWithoutFeedback onPress={() => this.selectReason(reason)}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ borderBottomWidth: last ? 0 : 1, paddingVertical: 10, borderColor: lightGrey }}>
            <Text style={TextStyle.Regular}>{reason}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );

    if (displayList) {
      return (
        <View style={{ backgroundColor: mainBaseColor, flex: 0.9, elevation: 1, marginHorizontal: 15, borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, shadowRadius: 2 }}>
          <ReasonListCard reason="inappropriate task" />
          <ReasonListCard reason="incorrect category" />
          <ReasonListCard reason="suspicious activity" />
          <ReasonListCard reason="other" last />
        </View>
      );
    }
    return null;
  }

  renderReasonOtherInput() {
    const { reason, reasonOtherWriteUp } = this.state;
    if (reason == 'other') {
      return (
        <TextInput
          style={[TextStyle.Regular, { borderBottomWidth: 1, borderColor: lightGrey, fontSize: fontSize.S }]}
          onChangeText={reasonOtherWriteUp => this.setState({ reasonOtherWriteUp })}
          value={reasonOtherWriteUp}
          underlineColorAndroid="transparent"
          placeholder="what is your reason for reporting this task?"
          placeholderTextColor={lightGrey}
        />
      );
    }
    return null;
  }

  renderReasonDropDown() {
    const { reason } = this.state;
    let text = 'select a reason';
    if (reason) {
      text = reason;
    }
    return (
      <TouchableOpacity style={{ padding: 5, flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => this.toggleReasonList()}>
        <View style={{ flex: 1 }}>
          <Text style={TextStyle.Regular}>{text}</Text>
        </View>
        <CustomIcon name="expand-ic" color={black} size={fontSize.M} style={{ marginTop: 3 }} />
      </TouchableOpacity>
    );
  }

  render() {
    const { closeAction } = this.props;
    const { reason } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ModalCard>

          {/* modal head */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Report this task?</Text>
          <View>
            {this.renderReasonDropDown()}
            <View style={{ flexDirection: 'row' }}>
              {this.renderReasonList()}
            </View>
            <View style={{ height: 50 }}>
              {this.renderReasonOtherInput()}
            </View>
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextButton text="cancel" onPress={closeAction} />
            <TextButton text="report" color={reason ? '#e11' : lightGrey} onPress={() => this.report()} />
          </View>

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

export default ReportTask;
