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
            steps: [{
                component: null,
                selectedStep: null,
                description: null,
                id: null
            }], // to pull from the data base
            id: 0
        }
    }

    handleSelectedStep = (id, selectedStep) => {
        this.setState(state => {
            const array = state.steps.map((element) => {
                if(element.id === id) {
                    const newElement = element
                    newElement.selectedStep = selectedStep
                    console.log(newElement)
                    return newElement
                } else {
                    return element
                }
            })
            return array
        })
    }

    handleDescription = (id,text) => {
        this.setState(state => {
            const array = state.steps.map((element) => {
                if(element.id === id) {
                    const newElement = element
                    newElement.description = text
                    return newElement
                } else {
                    return element
                }
            })
            return array
        })
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
        let text= ""
        this.setState({
            steps: steps.concat([{
                component: null,
                selectedStep: 1,
                description: null,
                id: id
            }])
        },() => {
            this.state.steps.forEach((element) => {
                if(element.id === id) {
                    text = element.description
                }
            })
            this.setState(state => {
                const array = state.steps.map((element) => {
                    if(element.id === id) {
                        const newElement = element
                        newElement.component = <Step
                            x={this.handleXClick}
                            selectedStep={this.handleSelectedStep}
                            description={text}
                            descriptionChange={this.handleDescription}
                            id={id}
                        />
                        return newElement
                    } else {
                        return element
                    }
                })
                return array
            }, () => {
                id++
                this.setState({id: id})
            })
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
            this.setState(({steps}) => ({steps: arrayMove(steps, oldIndex, newIndex)
        }))
        console.log(this.state.steps)
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