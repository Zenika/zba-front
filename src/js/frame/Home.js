import React, { Component } from 'react';
import RecipeTable from '../Recipe/RecipeTable'
import AddRecipe from '../Recipe/AddRecipe'
import RecipeStep from '../Recipe/RecipeStep'
import Grafana from '../../Grafana'
import logo from '../../zba.svg';
import axios from 'axios';
import '../../css/App.css'

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
      control :{
        editMode: false,
        showRecipeTable: true
      }
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
      console.log(`showRecipeTable : ${this.state.control.showRecipeTable}`)
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { name, ingredientType, malt, creator, id } = this.state
    if(this.state.control.editMode === false) {
      axios.post('http://localhost:8080/Recipe', { name, ingredientType, malt, creator })
        .then((result) => {
          console.log("Succesfully posted")
          console.log( name, ingredientType, malt, creator )
      });
      this.setUpdate()
    } else {
      axios.put('http://localhost:8080/Recipe', {id, name, ingredientType, malt, creator })
        .then((result) => {
          console.log("Succesfully update")
          console.log(id, name, ingredientType, malt, creator )
      });
      this.initState()
      this.setState(prevState => ({control:{editMode: false}}))
      this.setUpdate()  
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value }, () => {
        if(this.state.name !==''  || this.state.ingredientType !=='' || this.state.malt !=='' || this.state.creator !=='') {
            this.setState(prevState => ({control:{showRecipeTable: false}}))
        } else {
            this.setState(prevState => ({control:{showRecipeTable: true}}))      
        }
    })
    this.setUpdate()  
  }

  setEdit = (name,ingredientType,malt,creator,id) => {
    if(this.state.name === name) {
        this.initState()
        this.setState(prevState => ({control:{editMode: false}}))
        this.setState(prevState => ({control:{showRecipeTable: true}}))
    } else {
      this.setState(prevState => ({control:{editMode: true}}))
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
                {this.state.control.showRecipeTable ?
                    (<RecipeTable setEdit={this.setEdit} update={this.state.update} setUpdate={this.setUpdate}/>)
                    :
                    (<RecipeStep/>)
                }
                <Grafana/>
            </div>
    	</div>
    )
  }
}

export default Home;