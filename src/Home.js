import React, { Component } from 'react';
import RecipeTable from './RecipeTable'
import AddRecipe from './AddRecipe'
import logo from './zba.svg';
import axios from 'axios';
import "./App.css"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      name:'',
      ingredientType:'',
      malt:'',
      creator:'',
      update:true
    }
  }

  delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
  }

  setUpdate = () => {
    this.delay(500).then(() => {
      this.setState(prevState => ({update: !prevState.update}))
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { name, ingredientType, malt, creator } = this.state
    axios.post('http://localhost:8080/Recipe', { name, ingredientType, malt, creator })
      .then((result) => {
        console.log("Succesfully posted")
        console.log( name, ingredientType, malt, creator )
    });
    this.setState({ 
      name: '',
      ingredientType: '',
      malt: '',
      creator: '',
    })
    this.setUpdate()
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    return (
    	<div className="App-in Font">
	    	<header className="App-header">
          		<img src={logo} className="Zba-logo" alt="logo" />
	    	</header>,
        <div className="wrapper">
          <AddRecipe onSubmit={this.onSubmit} onChange={this.onChange} state={this.state}/>
          <RecipeTable update={this.state.update} setUpdate={this.setUpdate}/>
        </div>
    	</div>
    )
  }
}

export default Home;