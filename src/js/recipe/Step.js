import React, { Component } from 'react';
import Description from './stepDetails/Description'
import Brewing from './stepDetails/Brewing'
import "../../css/App.css"
import Hopping from './stepDetails/Hopping';

class Step extends Component {

    handleXClick = () => {
        this.props.x(this.props.id)
    }

    handleStepSelect = () => {
        const e = document.getElementById("select"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep"))
        this.props.handleOnChange(this.props.id,e.options[e.selectedIndex].value,"selectedStep")
    }

    handleDescription = () => {
        const e = document.getElementById("description"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep"))
        this.props.handleOnChange(this.props.id,e.value,"description")
    }

    selectedStep = () => {
        let stepToPrint
        switch (this.props.getValue(this.props.id,"selectedStep")) {
            case "1" :
                stepToPrint = <span>
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleDescription}/>
                </span>
            break
            case "2" :
                stepToPrint = <span>
                    <Brewing />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleDescription}/>
                </span>
            break
            case "3" :
                stepToPrint = <span>
                    <Hopping />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleDescription}/>
                </span>
            break
            default :
                stepToPrint = "ERROR"
        }
        return stepToPrint
    }

    render() {
        return(
            <span>
              <select name="step" 
                id={"select"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep")}
                size="1"
                value={this.props.getValue(this.props.id,"selectedStep")} 
                onChange={this.handleStepSelect}>
                    <option value="1">Sanitizing</option>
                    <option value="2">Brewing</option>
                    <option value="3">Hopping</option>
              </select>  <span>  </span>
              {this.selectedStep()}<span>  </span>
              <button className="button" onClick={() => this.handleXClick()}>
                <strong>X</strong>
            </button></span>
        )
    }
}

export default Step