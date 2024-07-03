import React, { Component } from 'react';
import * as math from 'mathjs';
import './App.css';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayOutput:'0',
      displayFormula:'',
      lastClickedButton:'',
    }
  }

  handleNumber = (e) => {
    const number = e.target.textContent;
    const display = this.state.displayFormula;

    if (number === '0' && display === '0') {
      return;
    }
    else if (display === '0') {
      this.setState({
        displayOutput:number,
        displayFormula:number,
      })
    }
    else if (this.state.lastClickedButton === '=') {
      this.setState({
        displayOutput:number,
        displayFormula:number,
        lastClickedButton:'',
      })
    }
    else {
      this.setState({
        displayOutput:display + number,
        displayFormula:display + number,
      })
    }
  }

  handleDecimal = (e) => {
    const decimal = e.target.textContent;
    const display = this.state.displayFormula;
    const regex = /[\+\-\*\/]/;
    const array = display.split(regex);
    const lastEl = array[array.length - 1];

    if (!lastEl.includes(decimal)) {
      this.setState({
        displayOutput:display + decimal,
        displayFormula:display + decimal,
      })
    }
  }

  handleOperator = (e) => {
    const operator = e.target.textContent;
    const display = this.state.displayFormula;
    const regex = /[\+\-\*\/]/;

    if (regex.test(display.slice(-1))) {
      if (operator !== '-' && !/[\+\-\*\/]{2}/.test(display)) {
        this.setState({
          displayOutput:operator,
          displayFormula:display.slice(0, -1) + operator
        })
      }
      else if (/[\+\-\*\/]{2}/.test(display)) {
        operator !== '-' ?
        this.setState({
          displayOutput:operator,
          displayFormula:display.slice(0, -2) + operator,
        }) :
        null ;
      }
      else {
        this.setState({
          displayOutput:operator,
          displayFormula:display + operator
        })
      }
    }
    else if (this.state.lastClickedButton === '=') {
      this.setState({
        displayOutput:operator,
        displayFormula:this.state.displayOutput + operator,
        lastClickedButton:'',
      })
    }
    else {
      this.setState({
        displayOutput:operator,
        displayFormula:display + operator,
      })
    }
  }

  handleEqual = (e) => {
    const display = this.state.displayFormula;
    const equal = e.target.textContent;
    const output = Math.round(math.evaluate(display)*10000)/10000;

    this.setState({
      displayOutput:output,
      displayFormula:`${display}=${output}`,
      lastClickedButton:equal,
    })
  }

  handleClear = () => {
    this.setState({
      displayOutput:'0',
      displayFormula:'',
      lastClickedButton:'',
    })
  }

  render () {
    
    return (
      <>
        <div className='main-container center'>
          <div className='display-container'>
            <div className='formula-screen'>{this.state.displayFormula}</div>
            <div className='output-screen' id='display'>{this.state.displayOutput}</div>
          </div>
          <div className='buttons-container'>
            <div className='clear-button center' id='clear' onClick={this.handleClear}>AC</div>
            <div className='operators center' id='divide' onClick={this.handleOperator}>/</div>
            <div className='operators center' id='multiply' onClick={this.handleOperator}>*</div>
            <div className='operators center' id='subtract' onClick={this.handleOperator}>-</div>
            <div className='operators center' id='add' onClick={this.handleOperator}>+</div>
            <div className='numbers center' id='seven' onClick={this.handleNumber}>7</div>
            <div className='numbers center' id='eight' onClick={this.handleNumber}>8</div>
            <div className='numbers center' id='nine' onClick={this.handleNumber}>9</div>
            <div className='numbers center' id='four' onClick={this.handleNumber}>4</div>
            <div className='numbers center' id='five' onClick={this.handleNumber}>5</div>
            <div className='numbers center' id='six' onClick={this.handleNumber}>6</div>
            <div className='numbers center' id='one' onClick={this.handleNumber}>1</div>
            <div className='numbers center' id='two' onClick={this.handleNumber}>2</div>
            <div className='numbers center' id='three' onClick={this.handleNumber}>3</div>
            <div className='numbers center' id='zero' onClick={this.handleNumber}>0</div>
            <div className='equal-button center' id='equals' onClick={this.handleEqual}>=</div>
            <div className='numbers center' id='decimal' onClick={this.handleDecimal}>.</div>
          </div>
        </div>
        <div className='footer'>Coded By <span className='highlight'>Thomas Cansino</span></div>
      </>
    )
  }
}

export default App
