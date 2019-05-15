import React, { Component } from 'react';
import RecipeTable from '../recipe/RecipeTable'
import AddRecipe from '../recipe/AddRecipe'
import RecipeStep from '../recipe/RecipeStep'
//import Grafana from '../../Grafana'
import logo from '../../zba.svg';
import axios from 'axios';
import '../../css/App.css'
import Step from '../recipe/Step'

class Home extends Component {
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
                editMode: false,
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
        if(this.state.recipe.name === name) {
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
            if(id !== '') {
                axios.get(`http://localhost:8080/Steps${id}`)
                .then(result => {
                    let steps = this.state.recipeSteps.steps
                    let id = this.state.recipeSteps.nextStepId
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
                        this.setState(prevState => ({control:{editMode: true}}))
                    )
                    id++
                    this.setListId(id)
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
        this.setState({recipeSteps: object},
            console.log("home -> setListSteps -> callback : "+newSteps))
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
        console.log("home -> handleOnChange : " + value)
        const array = this.state.recipeSteps.steps.map((element) => {
            if(element.id === id) {
                const newElement = element
                newElement[subElement] = value
                console.log(newElement)
                return newElement
            } else {
                return element
            }
        })
        console.log("home -> handleOnChange : " + this.state.recipeStep + "||" + array)
        if(this.state.recipeSteps !== array) {
            console.log("home -> handleOnChange -> condition : " + array)
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
                <header className="App-header">
                    <img src={logo} className="Zba-logo" alt="logo" />
                </header>,
                <div className="wrapper">
                    <AddRecipe onSubmit={this.onSubmit} onChange={this.onChange} state={this.state} setEdit={this.setEdit}/>
                    {this.state.control.showRecipeTable ?
                        (<RecipeTable setEdit={this.setEdit} update={this.state.update} setUpdate={this.setUpdate}/>)
                        :
                        (<RecipeStep steps={this.state.recipeSteps.steps} ingredient={this.state.ingredient} setListSteps={this.setListSteps} handleNewClick={this.handleNewClick}/>)
                    }
                </div>
            </div>
        )
    }
}

export default Home;