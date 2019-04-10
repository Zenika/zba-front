import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Step from './Step'
import "../../css/App.css"

const SortableItem = SortableElement(({value}) => <div>{value}</div>)

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
            stepId: 0
        }
    }

    handleNewClick = () => {
        const steps = this.state.steps
        const length = this.state.steps.length
        let stepId = this.state.stepId
        stepId++
        this.setState({
            steps: steps.concat([<Step stepId={stepId} indexNumber={length} x={this.handleXClick}/>]),
            stepId: stepId},
            () => console.log(this.state.steps))
    }

    handleXClick = (indexNumber) => {
        var array = []
        this.state.steps.forEach((element, index) => {
            if(index !== indexNumber) {
                array = array.concat(element)
            }
        });
        console.log(array)
        this.setState({steps: array}, () => console.log(this.state.steps))
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