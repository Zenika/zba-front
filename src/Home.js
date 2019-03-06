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
      id: '',
      update:true,
      editMode: false
    }
  }

  initState() {
    this.setState({ 
      name: '',
      ingredientType: '',
      malt: '',
      creator: '',
    })
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
    const { name, ingredientType, malt, creator, id } = this.state
    if(this.state.editMode === false) {
      axios.post('http://localhost:8080/Recipe', { name, ingredientType, malt, creator })
        .then((result) => {
          console.log("Succesfully posted")
          console.log( name, ingredientType, malt, creator )
      });
      this.initState()
      this.setUpdate()
    } else {
      axios.put('http://localhost:8080/Recipe', {id, name, ingredientType, malt, creator })
        .then((result) => {
          console.log("Succesfully update")
          console.log(id, name, ingredientType, malt, creator )
      });
      this.initState()
      this.setUpdate()
      this.setState(prevState => ({editMode: false}))
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  setEdit = (name,ingredientType,malt,creator,id) => {
    if(this.state.name === name) {
        this.initState()
        this.setState(prevState => ({editMode: false}))
    } else {
      this.setState(prevState => ({editMode: true}))
      this.setState({ 
        name: name,
        ingredientType: ingredientType,
        malt: malt,
        creator: creator,
        id: id
      })
    }
  }


  render() {
    return (
    	<div className="App-in Font">
	    	<header className="App-header">
          		<img src={logo} className="Zba-logo" alt="logo" />
	    	</header>,
        <div className="wrapper">
          <AddRecipe onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} setEdit={this.setEdit}/>
          <RecipeTable setEdit={this.setEdit} update={this.state.update} setUpdate={this.setUpdate}/>
        </div>
    	</div>
    )
  }
}

export default Home;