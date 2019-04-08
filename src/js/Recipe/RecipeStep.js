import React, { Component } from 'react';
import Step from './Step'
import "../../css/App.css"

class RecipeStep extends Component {

    constructor() {
        super()
        this.state = {
            step: [], // to pull from the data base
            stepNumber: 0
        }
    }

    handleNewClick = () => {
        const step = this.state.step
        let stepNumber = this.state.stepNumber
        stepNumber++
        this.setState({step: step.concat([stepNumber]),stepNumber: stepNumber})
    }

    handleXClick = (number) => {
        const step = this.state.step.filter((value) => value !== number)
        this.setState({step: step,}, () => console.log(this.state.step))
    }

    createComponent = () => {
        const number = this.state.stepNumber
        return (
            <div>
                <Step number={number} x={() => this.handleXClick(number)}/>
            </div>
        )
    }

    createComponents(component) {
        return component.map(this.createComponent)
    }

    render() {
        return (
            <div className="column2">
                <div className="inside">
                    <h1>Add stage to recipe</h1>
                    <div>
                        <h2>Preparation</h2>
                        <div>List of ingredient :</div>
                        <div>Add furnitures :</div>
                    </div>
                    <div>
                        <h2>Brewing</h2>
                        <div>Add step :</div>
                        {this.createComponents(this.state.step)}
                        <button className="button" onClick={() => this.handleNewClick()}>
                            <strong>New</strong>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeStep;