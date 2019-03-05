import React, { Component } from 'react';
import RecipeTable from './RecipeTable'
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
    const { name, ingredientType, malt, creator } = this.state
    return (
    	<div className="App-in Font">
	    	<header className="App-header">
          		<img src={logo} className="Zba-logo" alt="logo" />
	    	</header>,
        <div className="wrapper">
          <div className="column1">
            <div className="inside">
              <h1>Create recipe</h1>
              <form onSubmit={this.onSubmit}>
                <label>Recipe</label>
                <br/><br/>
                <input type="text" name="field" id="name" value={name} onChange={this.onChange}/>
                <br/><br/>
                <label>Type of beer</label>
                <br/><br/>
                <input type="text" name="field" id="ingredientType" value={ingredientType} onChange={this.onChange}/>
                <br/><br/>
                <label>Type of malt</label>
                <br/><br/>
                <input type="text" name="field" id="malt" value={malt} onChange={this.onChange}/>
                <br/><br/>
                <label>Creator name</label>
                <br/><br/>
                <input type="text" name="field" id="creator" value={creator} onChange={this.onChange}/>
                <br/><br/><br/>
                <button className="button bigButton">Add new recipe</button>
              </form>
            </div>
          </div>
          <RecipeTable update={this.state.update} setUpdate={this.setUpdate}/>
        </div>
    	</div>
    )
  }
}

export default Home;