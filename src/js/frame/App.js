import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"
import Welcome from "./Welcome"
import '../../css/App.css'
import HomeBrewing from './HomeBrewing';
import HomeRecipe from './HomeRecipe';
import Error from './Error'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {isClicked:false}
  }

  handleClick = () => {
    this.setState({isClicked:true})
  }

  render() {
    return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component= {Welcome} exact/>
                    <Route path="/HomeBrewing" component={HomeBrewing} />
                    <Route path="/HomeRecipe" component={HomeRecipe} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
    )
  }
}

export default App;
