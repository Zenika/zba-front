import React, { Component } from 'react';
import BurgerMenu from "./menu/BurgerMenu";
import RecipeTable from '../recipe/RecipeTable'
import AddRecipe from '../recipe/AddRecipe'
import RecipeStep from '../recipe/RecipeStep'
import Step from '../recipe/Step'
import logo from '../../zba.svg'
import axios from 'axios'
import '../../css/App.css'
import '../../css/Burger.css'
import {jsonRecipe} from '../functions/json'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'

class HomeRecipe extends Component {
    constructor() {
        super()
        this.state = {
            recipeId:0,
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
            ingredient: {
                oxygen_powder: '',
                malt: [],
                hopper: [],
                leaven: []
            },
            furnitures: {},
            update:true,
            control : {
                updateOrAdd: false,
                showRecipeTable: true
            }
        }
    }

    initState() {
        this.setState({
            recipeId:0,
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

    setUpdate = () => {
        this.setState(prevState => ({update: !prevState.update}))
    }

    
    onSubmit = (e) => {
        e.preventDefault()
        const recipeId = this.state.recipeId
        const recipe = this.state.recipe
        const recipeSteps = this.state.recipeSteps
        if(this.state.control.updateOrAdd === false) {
            console.log("post")
            const json = jsonRecipe(recipeId, recipe, recipeSteps)
            console.log(json)
            axios.post('http://localhost:8080/recipe', json)
            .then((result) => {
                console.log(`Succesfully posted id = ${result.data}`)
                this.setState(prevState => ({recipeId: result.data}), () => console.log( recipe, recipeSteps ))
                this.initState()
                this.setState(prevState => ({control:{updateOrAdd: false, showRecipeTable: true}}))
                this.setState(prevState => ({update: !prevState.update}))
            })
        } else {
            console.log("put")
            axios.put(`http://localhost:8080/recipe/${recipeId}`, jsonRecipe(recipeId, recipe, recipeSteps))
            .then((result) => {
                console.log(`Succesfully updated id = ${result.data}`)
                this.setState(prevState => ({recipeId: result.data}), () => console.log( recipe, recipeSteps ))
                this.initState()
                this.setState(prevState => ({control:{updateOrAdd: false, showRecipeTable: true}}))
                this.setState(prevState => ({update: !prevState.update}))
            })
        }
    }

    onChange = (e) => {
        let object = this.state.recipe
        object[e.target.id] = e.target.value
        this.setState({ recipe: object }, () => {
            if(this.state.name !==''  || this.state.ingredientType !=='' || this.state.malt !=='' || this.state.creator !=='') {
                this.setState(prevState => ({control:{updateOrAdd: false, showRecipeTable: false}}))
            } else {
                this.setState(prevState => ({control:{updateOrAdd: true, showRecipeTable: true}}))      
            }
        })
        this.setUpdate()  
    }

    setEdit = (name,ingredientType,malt,creator,id) => {
        if(this.state.recipe.name === name) {
            this.initState()
            this.setState(prevState => ({control:{updateOrAdd: false, showRecipeTable: true}}))
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
            if(id !== '') {
                axios.get(`http://localhost:8080/recipe/${id}/steps`)
                .then(result => {
                    let steps = this.state.recipeSteps.steps
                    let id = this.state.recipeSteps.nextStepId
                    if(result.data != null) {
                        result.data.forEach((element) => {
                            switch (element.selectedStep) {
                                case 3 :
                                    steps.push({
                                        component: <Step
                                            x={this.handleXClick}
                                            getValue={this.getValue}
                                            handleOnChange={this.handleOnChange}
                                            id={element.id}
                                        />,
                                        selectedStep: element.selectedStep.toString(10),
                                        description: element.description,
                                        heat: element.heat,
                                        timeMin: element.timeMin,
                                        timeH: element.timeH,
                                        water: element.water,
                                        id: element.id
                                    })
                                break
                                default:
                                steps.push({
                                    component: <Step
                                        x={this.handleXClick}
                                        getValue={this.getValue}
                                        handleOnChange={this.handleOnChange}
                                        id={element.id}
                                    />,
                                    selectedStep: element.selectedStep.toString(10),
                                    description: element.description,
                                    id: element.id
                                })
                            }
                        })
                        this.setState({ recipeSteps: {steps: steps} }, () =>
                            this.setState(prevState => ({control:{updateOrAdd: true, showRecipeTable:this.state.showRecipeTable}}))
                        )
                        id++
                        this.setListId(id)
                        this.setUpdate()
                    } else {
                        this.setState({ recipeSteps: {steps: steps} }, () =>
                            this.setState(prevState => ({control:{updateOrAdd: true, showRecipeTable:this.state.showRecipeTable}}))
                        )
                        id++
                        this.setListId(id)
                        this.setUpdate()
                    }  
                })
            } else {
                this.setState(prevState => ({control:{updateOrAdd: true, showRecipeTable:this.state.showRecipeTable}}))
            }
        }
    }

    setListSteps = (newSteps) => {
        let object = this.state.recipeSteps
        object.steps = newSteps
        this.setState({recipeSteps: object},
            console.log("home -> setListSteps -> callback : " + newSteps))
    }

    setListId = (newId) => {
        let object = this.state.recipeSteps
        object.nextStepId = newId
        this.setState({recipeSteps: object})
    }

    getValue = (id, subElement) => {
        let details
        this.state.recipeSteps.steps.forEach((element) => {
            if(element.id === id) {
                details = element[subElement]
            }
        })
        return details
    }

    handleOnChange = (id, value, subElement) => {
        const array = this.state.recipeSteps.steps.map((element) => {
            if(element.id === id) {
                const newElement = element
                newElement[subElement] = value
                return newElement
            } else {
                return element
            }
        })
        if(!Object.is(this.state.recipeSteps.steps,array)) {
            this.setListSteps(array)
        }
    }

    handleXClick = (id) => {
        var array = []
        this.state.recipeSteps.steps.forEach((element) => {
            if(element.id !== id) {
                array = array.concat(element)
            }
        })
        this.setListSteps(array)
    }

    handleNewClick = () => {
        let steps = this.state.recipeSteps.steps
        let id = this.state.recipeSteps.nextStepId
        steps.push({
            component: <Step
                x={this.handleXClick}
                getValue={this.getValue}
                handleOnChange={this.handleOnChange}
                id={id}
            />,
            selectedStep: "1",
            description: "",
            id: id
        })
        id++
        this.setListId(id)
        this.setListSteps(steps)
    }

    render() {
        return (
            <div className="App-in Font">
                <div id="BurgerMenu">
                    <BurgerMenu />
                    <StickyHeader
                        // This is the sticky part of the header.
                        header={    
                            <header className="App-header">
                                <img src={logo} className="Zba-logo" alt="logo" />
                            </header>
                        }>
                        <section>
                        <header className="App-header">
                                <img src={logo} className="Zba-logo" alt="logo" />
                            </header>
                        </section>
                    </StickyHeader>
                    <div className="wrapper">
                        <AddRecipe onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} setEdit={this.setEdit}/>
                        {this.state.control.showRecipeTable ?
                            (<RecipeTable setEdit={this.setEdit} update={this.state.update} setUpdate={this.setUpdate}/>)
                            :
                            (<RecipeStep steps={this.state.recipeSteps.steps} ingredient={this.state.ingredient} setListSteps={this.setListSteps} handleNewClick={this.handleNewClick}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeRecipe;