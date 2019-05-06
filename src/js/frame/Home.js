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
            recipeId: '',
            recipe: {
                name:'',
                ingredientType:'',
                malt:'',
                creator:'',
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
        this.setState(prevState => ({update: !prevState.update}))
    }

    onSubmit = (e) => {
        e.preventDefault()
        const recipeId = this.state.recipeId
        const recipe = this.state.recipe
        const recipeSteps = this.state.recipeSteps
        if(this.state.control.editMode === false) {
            axios.post('http://localhost:8080/Recipe', { recipe, recipeSteps })
            .then((result) => {
                console.log(`Succesfully posted id = ${result.data}`)
                this.setState(prevState => ({recipeId: result.data}), () => console.log( recipe, recipeSteps ))
                this.initState()
                this.setState(prevState => ({control:{editMode: false, showRecipeTable: true}}))
                this.setState(prevState => ({update: !prevState.update}))
            })
        } else {
            console.log()
            axios.put('http://localhost:8080/Recipe', { recipeId, recipe, recipeSteps })
            .then((result) => {
                console.log(`Succesfully updated id = ${result.data}`)
                this.setState(prevState => ({recipeId: result.data}), () => console.log( recipe, recipeSteps ))
                this.initState()
                this.setState(prevState => ({control:{editMode: false, showRecipeTable: true}}))
                this.setState(prevState => ({update: !prevState.update}))
            })
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
            this.setState({
                recipeId: id,
                recipe: {
                    name: name,
                    ingredientType: ingredientType,
                    malt: malt,
                    creator: creator
                }
            })
            if(id != '') {
                axios.get(`http://localhost:8080/Steps${id}`)
                .then(result => {
                    console.log(result.data)
                    const res = result.data
                    this.setState({ recipeSteps: {steps: res} }, () => 
                        this.setState(prevState => ({control:{editMode: true}}))
                    );
                    this.setUpdate()
                })
            } else {
                this.setState(prevState => ({control:{editMode: true}}))
            }
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