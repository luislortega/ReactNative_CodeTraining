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
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '.'],
  ['0', '.', '=', '+']
];

export default class App extends Component {

  constructor(){
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState
  }
  
  //Rendering all the button inside the container inputs
  renderButtons(){
    let layouts = buttons.map((buttonRows, index) => {
      //Here is the error
      let rowItem = buttonRows.map( (buttonItems, buttonIndex) => {
        return <InputNumberButton 
                value={buttonItems} 
                key={'btn-' + buttonIndex}
                handleOnPress={this.handleInput.bind(this, buttonItems)}
                />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });
    return layouts;
  }

  //Touch event for buttons 
  handleInput = (input) => {
    const {displayValue, operator, firstValue, secondValue, nextValue} = this.state;
    /* 
    * Comprobacion del input.
    *
    * Razon: necesitamos que muestre los datos pero 
    * cuando se pone un operador, este no debe mostrarse si ya hay uno
    * puesto con anterioridad. 
    */
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        //Concatena los datos
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        });

        if(!nextValue){
          this.setState({
            firstValue: firstValue + input
          });
        }else{
          this.setState({
            secondValue: secondValue + input
          });
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        this.setState({
          nextValue: true, //Exist the next value
          operator: input, 
          /*
           * Logica de los operadores:
           * si existe un operador anterior se elimina el anterior y se ingresa el operador actual,
           * en caso de que no exista un operador, se ingresa el valor mas el operador 
           */
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length-1) : displayValue) + input
        });
        break;
      case '.':
        let dot = displayValue.slice(-1); //Get the last character
        this.setState({
          displayValue: (dot !== '.') ? displayValue + input : displayValue 
        });
        
        if(!nextValue){
          this.setState({
            firstValue: firstValue + input
          });
        }else{
          this.setState({
            secondValue: secondValue + input
          });
        }
        break;
      case 'DEL':
        let string = displayValue.toString(); 
        let deleteString = string.substr(0, string.length-1);
        this.setState({
          displayValue: string.length == 1 ? '0' : deleteString
        });
        break;
      case 'CLEAR':
        this.setState(this.initialState);
        break;
      case '=':
        //Result
        let result = eval(firstValue + operator + secondValue);
        //We need reset all default data 
        this.setState({
          displayValue: result,
          operator: null,
          firstValue: '',
          secondValue: '',
          nextValue: false
        });
        break;
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerResult}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
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
