/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import InputNumberButton from './InputNumberButton';

const buttons = [
  ['CLEAR', 'DEL'],
  [7, 8, 9, '%'],
  [4, 5, 6, 'x'],
  [1, 2, 3, '.'],
  [0, '.', '=', '+']
];

export default class App extends Component {
  
  renderButtons(){
    let layouts = buttons.map((buttonRows, index) => {
      //Here is the error
      let rowItem = buttonRows.map( (buttonItems, buttonIndex) => {
        return <InputNumberButton key={'btn-' + buttonIndex}/>
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerResult}>
          <Text style={styles.resultText}>0</Text>
        </View>
        <View style={styles.containerInputs}>
          {this.renderButtons()}
        </View>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerResult: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1E1240'
  },
  containerInputs: {
    flex: 8,
    backgroundColor: '#3D0075'
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
});
