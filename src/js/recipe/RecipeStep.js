import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Ingredient from "./ingredient/Ingredient"
import "../../css/App.css"

const SortableItem = SortableElement(({value}) => {
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
                        <Ingredient steps={this.props.steps} ingredient={this.props.Ingredient}/>
                        <div>List of furnitures :</div>
                    </div>
                    <div>
                        <h2>Brewing</h2>
                        <div className="steps-border">
                            <div style={{marginLeft: "10px", marginTop: "10px", marginBottom: "10px"}} >
                                <h3>Add step :</h3>
                                <SortableList steps={this.props.steps} onSortEnd={this.onSortEnd}/>
                                <button className="button new" onClick={() => this.props.handleNewClick()}>
                                    <strong>New</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeStep;