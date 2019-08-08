import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Local Imports
import ModalCard from '../common/ModalCard';
import Row from '../common/Row';
import { TextButton } from '../buttons/Button';
import TaskRating from '../TaskRating';
import { TextStyle } from '../../StyleSheet';
import { fontSize, lightGrey } from '../../Constants';

class ViewHistory extends Component {
  render() {
    // Destructuring
    const { closeAction } = this.props;
    const { taskTitle, taskRating, taskReview } = this.props.card;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>
          <Text style={[sectionEnd, TextStyle.Regular, { fontWeight: 'bold' }]}>{taskTitle}</Text>
          <View style={[sectionEnd, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5 }]}>
            <Text style={[TextStyle.Regular, { flex: 1 }]}>Review:</Text>
            <TaskRating starSize={fontSize.M * 0.5} rating={taskRating} />
          </View>
          <Text style={[sectionEnd, TextStyle.Regular, { fontSize: fontSize.S }]}>{taskReview}</Text>

          {/* Buttons */}
          <Row rowStyles={{ justifyContent: 'space-around' }}>
            <TextButton text="close" color={lightGrey} onPress={closeAction} />
          </Row>

        </ModalCard>
      </View>
    );
  }
}

const picSize = fontSize * 4;

const styles = StyleSheet.create({
  userPic: {
    height: picSize,
    width: picSize,
    borderRadius: picSize / 2,
    marginRight: 10,
  },
  sectionEnd: {
    marginBottom: 10,
  }
});

const { sectionEnd } = styles;

export default ViewHistory;
