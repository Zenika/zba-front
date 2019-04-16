import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Step from './Step'
import "../../css/App.css"

const SortableItem = SortableElement(({value}) => <div>{value.component}</div>)

const SortableList = SortableContainer(({steps}) => {
    return (
        <div>
            {steps.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    )
})

class RecipeStep extends Component {

    constructor() {
        super()
        this.state = {
            steps: [], // to pull from the data base
            id: 0
        }
    }

    getDescription = (id) => {
        let description
        this.state.steps.forEach((element) => {
            if(element.id === id) {
                description = element.description
            }
        })
        return description
    }

    getSelectedStep = (id) => {
        let selectedStep
        this.state.steps.forEach((element) => {
            if(element.id === id) {
                selectedStep = element.selectedStep
            }
        })
        return selectedStep
    }

    handleSelectedStep = (id, selectedStep) => {
        const array = this.state.steps.map((element) => {
            if(element.id === id) {
                const newElement = element
                newElement.selectedStep = selectedStep
                return newElement
            } else {
                return element
            }
        })
        this.setState({steps: array})
    }

    handleDescription = (id,description) => {
        const array = this.state.steps.map((element) => {
            if(element.id === id) {
                const newElement = element
                newElement.description = description
                return newElement
            } else {
                return element
            }
        })
        this.setState({steps: array})
    }

    handleXClick = (id) => {
        var array = []
        this.state.steps.forEach((element) => {
            if(element.id !== id) {
                array = array.concat(element)
            }
        })
        this.setState({steps: array})
    }

    handleNewClick = () => {
        const steps = this.state.steps
        let id = this.state.id

        this.setState({
            steps: steps.concat([{
                component: <Step
                    x={this.handleXClick}
                    selectedStep={this.getSelectedStep}
                    selectedStepChange={this.handleSelectedStep}
                    description={this.getDescription}
                    descriptionChange={this.handleDescription}
                    id={id}
                />,
                selectedStep: 1,
                description: "",
                id: id
            }])
        },() => {
            id++
            this.setState({id: id})
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
            this.setState(({steps}) => ({steps: arrayMove(steps, oldIndex, newIndex)
        }))
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
                        <SortableList steps={this.state.steps} onSortEnd={this.onSortEnd}/>
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