import React, { Component } from 'react'
import {Route,HashRouter} from "react-router-dom"
import Welcome from "./Welcome"
import Home from "./Home"
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {isClicked:false}
  }

  handleClick = () => {
    this.setState({isClicked:true})
  }

  render() {
    const isClicked = this.state.isClicked
    return (
      <HashRouter>
        <div>
          {isClicked ? (
            <div>
              <Route path="/" component= {() => <Home />} />
            </div>
          ) : (
            <Route path="/" component= {() => <Welcome handleClick = {this.handleClick}/>} />
          )}
        </div>
      </HashRouter>
    )
  }
}

export default App;
