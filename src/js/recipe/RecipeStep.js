import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Step from './Step'
import "../../css/App.css"

const SortableItem = SortableElement(({value}) => {
    console.log(value)
    return <div>{value.component}</div>
})

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

    getValue = (id, subElement) => {
        let details
        this.props.steps.forEach((element) => {
            if(element.id === id) {
                details = element[subElement]
            }
        })
        return details
    }

    handleOnChange = (id, value, subElement) => {
        const array = this.props.steps.map((element) => {
            if(element.id === id) {
                const newElement = element
                newElement[subElement] = value
                return newElement
            } else {
                return element
            }
        })
        this.props.setListSteps(array)
    }

    handleXClick = (id) => {
        var array = []
        this.props.steps.forEach((element) => {
            if(element.id !== id) {
                array = array.concat(element)
            }
        })
        this.props.setListSteps(array)
    }

    handleNewClick = () => {
        let steps = this.props.steps
        let id = this.props.id
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
        this.props.setListId(id)
        this.props.setListSteps(steps)
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let steps = this.props.steps
        let array = arrayMove(steps, oldIndex, newIndex)
        this.props.setListSteps(array)
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
                        <SortableList steps={this.props.steps} onSortEnd={this.onSortEnd}/>
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