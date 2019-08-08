import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';
import { TextStyle } from '../../StyleSheet';
import { mainColor, midGrey, mainBaseColor, lightGrey, fontSize } from '../../Constants';

class TaskItem extends Component {
  render() {
    const { text, amount, icon, onPress } = this.props;
    return (
      <View style={container}>
        <TouchableOpacity onPress={onPress}>
          <View style={{ flexDirection: 'row' }}>

            {/* Category Icon */}
            <View style={category}>
              <CustomIcon name={icon} style={[iconStyle]} />
            </View>

            <View style={content}>
              {/* Title */}
              <Text style={[TextStyle.Regular, textStyle, title, edgePadding, { maxWidth: maxWidth - (height * 0.8) }]} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
              {/* Details */}
              <View style={row}>
                <Text style={[TextStyle.Regular, textStyle, { color: midGrey, fontSize: fontSize.S }]}>
                  est. $
                  {' '}
                  {amount}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const maxWidth = Dimensions.get('window').width * 0.95;

const height = 70;
const containerPadding = 5;

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    backgroundColor: mainBaseColor,
    height: height,
    width: maxWidth,
    borderRadius: 100 / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: lightGrey,
    marginBottom: 10,
  },
  category: {
    height: height - (containerPadding * 2),
    width: height - (containerPadding * 2),
    borderRadius: (height - (containerPadding * 2)) / 2,
    backgroundColor: mainColor,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: fontSize.S,
  },
  title: {
    fontSize: fontSize.M,
    color: mainColor,
  },
  body: {
  },
  location: {
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: height * 0.6 - (containerPadding * 2),
    color: mainBaseColor
  },
  sectionBreak: {
    width: 1,
    height: fontSize.S * 0.8,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  edgePadding: {
    paddingRight: height * 0.333,
  }
});

const { container, category, content, title, textStyle, iconStyle, row, edgePadding } = styles;

export default TaskItem;
