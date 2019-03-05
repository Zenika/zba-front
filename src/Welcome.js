import React, { Component } from 'react';
import logo from './zenika.svg';
import './App.css';

class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isClicked:false,
      style:"Welcome-header Font"
    }
  }
  
  delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
  }

  handleClick = () => {
    this.setState({isClicked: true})
    this.delay(500).then(() => {
      this.setState({style: "Welcome-header Font App-out"})
      this.delay(500).then(() => {
        this.props.handleClick()})
    })
  }

  render() {
    const isClicked = this.state.isClicked
    return (
      <div className="App">
        <header className={this.state.style} onClick = {() => this.handleClick()}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to the ZenBeer Brewing Assistant !</p>
          {isClicked ? (
            <h1>Go !</h1>
          ) : (
            <h1>Ready ?</h1>
          )}
        </header>
      </div>
    );
  }
}

export default Welcome;
