import React, { Component } from 'react';
import "../../css/App.css"

class Step extends Component {
    constructor(props){
        super(props)
        this.indexNumber = this.props.indexNumber
        this.state = {
            step: 1
        }
    }

    handleXClick = () => {
        this.props.x(this.props.indexNumber)
    }

    handleStepSelect = () => {
        const e = document.getElementById(this.props.stepId)
        let value = e.options[e.selectedIndex].value
        this.setState({step: value}, () => console.log(this.state.step, this.props.stepId))
    }

    render() {
        return(
            <span>Hello {this.props.stepId} <span>  </span>
              <select name="step" size="1" id={this.props.stepId} onChange={this.handleStepSelect}>
                <option value="1">Sanitizing</option>
                <option value="2">Brewing</option>
                <option value="3">Hopping</option>
              </select>  <span>  </span>
              <input type="text" name="field" id="name"/> <span>  </span>
              <button className="button" onClick={() => this.handleXClick()}>
                <strong>X</strong>
            </button></span>
        )
    }
}

export default Step