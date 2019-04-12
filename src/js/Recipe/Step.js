import React, { Component } from 'react';
import "../../css/App.css"

class Step extends Component {

    handleXClick = () => {
        this.props.x(this.props.id)
    }

    handleStepSelect = () => {
        const e = document.getElementById(this.props.id)
        let value = e.options[e.selectedIndex].value
        this.props.selectedStep(this.props.id,value)
    }

    handleDescription = (e) => {
        let text = e.target.value
        this.props.descriptionChange(this.props.id,text)
    }

    render() {
        console.log(this.props.description)
        return(
            <span>Hello {this.props.id} <span>  </span>
              <select name="step" size="1" id={this.props.id} onChange={this.handleStepSelect}>
                <option value="1">Sanitizing</option>
                <option value="2">Brewing</option>
                <option value="3">Hopping</option>
              </select>  <span>  </span>
              <input type="text" id="name" value={this.props.description} onChange={this.handleDescription}/> <span>  </span>
              <button className="button" onClick={() => this.handleXClick()}>
                <strong>X</strong>
            </button></span>
        )
    }
}

export default Step