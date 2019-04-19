import React, { Component } from 'react';
import RecipeTable from '../recipe/RecipeTable'
import AddRecipe from '../recipe/AddRecipe'
import RecipeStep from '../recipe/RecipeStep'
import Grafana from '../../Grafana'
import logo from '../../zba.svg';
import axios from 'axios';
import '../../css/App.css'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            recipe: {
                name:'',
                ingredientType:'',
                malt:'',
                creator:'',
                recipeId: ''
            },
            recipeSteps: {
                steps: [],
                nextStepId: 0
            },
            update:true,
            control : {
                editMode: false,
                showRecipeTable: true
            }
        }
    }

    initState() {
        this.setState({
            recipe: {
                name: '',
                ingredientType: '',
                malt: '',
                creator: ''
            },
            recipeSteps: {
                steps: [],
                nextStepId: 0
            }
        })
    }

    delay(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    setUpdate = () => {
        this.delay(200).then(() => {
            this.setState(prevState => ({update: !prevState.update}))
        })
    }

    // QUESTION la seconde recrète crud (pour steps) vaut'il mieux l'exécuter à la chine ou das le callbacks de la précédente ?
    onSubmit = (e) => {
        e.preventDefault()
        const { name, ingredientType, malt, creator, id } = this.state.recipe
        const { listSteps, listId } = this.state.recipeSteps
        if(this.state.control.editMode === false) {
            axios.post('http://localhost:8080/Recipe', { name, ingredientType, malt, creator, listSteps, listId })
            .then((result) => {
                console.log("Recipe succesfully posted")
                console.log( name, ingredientType, malt, creator )
            })
            this.initState()
            this.setState(prevState => ({control:{editMode: false, showRecipeTable: true}}))
            this.setUpdate()
            for(let i=0;i<this.state.recipeSteps.steps.length;i++){
                let description = this.state.list.steps[i].description
                let selectedStep = this.state.list.steps[i].selectedStep
                axios.post('http://localhost:8080/Steps', { selectedStep, description })
                .then((result) => {
                    console.log("Step succesfully posted")
                });
            }
        } else {
            axios.put('http://localhost:8080/Recipe', {id, name, ingredientType, malt, creator })
            .then((result) => {
                console.log("Succesfully update")
                console.log(id, name, ingredientType, malt, creator )
            })
            for(let i=0;i<this.state.recipeSteps.steps.length;i++){
                let description = this.state.list.steps[i].description
                let selectedStep = this.state.list.steps[i].selectedStep
                axios.put('http://localhost:8080/Steps', { selectedStep, description })
                .then((result) => {
                    console.log("Step succesfully updated")
                });
            }
            this.initState()
            this.setState(prevState => ({control:{editMode: false, showRecipeTable: true}}))
            this.setUpdate() 
        }
    }

    onChange = (e) => {
        let object = this.state.recipe
        object[e.target.id] = e.target.value
        this.setState({ recipe: object }, () => {
            if(this.state.name !==''  || this.state.ingredientType !=='' || this.state.malt !=='' || this.state.creator !=='') {
                this.setState(prevState => ({control:{showRecipeTable: false}}))
            } else {
                this.setState(prevState => ({control:{editMode: true, showRecipeTable: true}}))      
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
                recipe: {
                    name: name,
                    ingredientType: ingredientType,
                    malt: malt,
                    creator: creator,
                    recipeId: id
                }
            })
        }
    }

    setListSteps = (newSteps) => {
        let object = this.state.recipeSteps
        object.steps = newSteps
        this.setState({recipeSteps: object})
    }

    setListId = (newId) => {
        let object = this.state.recipeSteps
        object.nextStepId = newId
        this.setState({recipeSteps: object})
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
                        (<RecipeStep steps={this.state.recipeSteps.steps} setListSteps={this.setListSteps} id={this.state.recipeSteps.nextStepId} setListId={this.setListId} />)
                    }
                    <Grafana/>
                </div>
            </div>
        )
    }
}

export default Home;