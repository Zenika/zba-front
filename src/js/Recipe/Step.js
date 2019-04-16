import React, { Component } from 'react';
import "../../css/App.css"

class Step extends Component {

    handleXClick = () => {
        this.props.x(this.props.id)
    }

    handleStepSelect = () => {
        const e = document.getElementById("select"+this.props.id)
        let value = e.options[e.selectedIndex].value
        this.props.selectedStepChange(this.props.id,value)
    }

    handleDescription = () => {
        const e = document.getElementById("description"+this.props.id)
        let description = e.value
        this.props.descriptionChange(this.props.id,description)
    }

    render() {
        return(
            <span>Hello {this.props.id} <span>  </span>
              <select name="step" id={"select"+this.props.id} size="1" value={this.props.selectedStep(this.props.id)}  onChange={this.handleStepSelect}>
                <option value="1">Sanitizing</option>
                <option value="2">Brewing</option>
                <option value="3">Hopping</option>
              </select>  <span>  </span>
              <input type="text" id={"description"+this.props.id} value={this.props.description(this.props.id)} onChange={this.handleDescription}/> <span>  </span>
              <button className="button" onClick={() => this.handleXClick()}>
                <strong>X</strong>
            </button></span>
        )
    }
}

export default Step