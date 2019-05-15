import React, { Component } from 'react'
import Description from './stepDetails/Description'
import Brewing from './stepDetails/Brewing'
import "../../css/App.css"
import Hopping from './stepDetails/Hopping'
import Density from "./stepDetails/Density"
import Filtering from "./stepDetails/Filtering"
import Fermenting from "./stepDetails/Fermenting"
import Colding from './stepDetails/Colding';

class Step extends Component {

    handleXClick = () => {
        this.props.x(this.props.id)
    }

    handleStepSelect = () => {
        const e = document.getElementById("select"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep"))
        this.props.handleOnChange(this.props.id,e.options[e.selectedIndex].value,"selectedStep")
    }

    autoSize =(e) => {
        setTimeout(() => {
            e.style.cssText = 'height:auto; padding:0';
            e.style.cssText = 'height:' + e.scrollHeight + 'px';
        },0)
    }

    handleOnChange = (subElement) => {
        console.log("step")
        const e = document.getElementById("description"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep"))
        if(e) {
            console.log("if")
            e.addEventListener("keydown",this.autoSize(e))
            this.props.handleOnChange(this.props.id,e.value,subElement)
        }
    }

    selectedStep = () => {
        let stepToPrint
        const test = this.props.getValue(this.props.id,"selectedStep")
        switch (test) {
            case "1" :
                stepToPrint = <span className="flexbox-container">
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "2" :
                stepToPrint = <span className="flexbox-container">
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Malt name"/>
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "3" :
                stepToPrint = <span className="flexbox-container">
                    <Brewing id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange={this.handleOnChange}/>
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "4" :
                stepToPrint = <span className="flexbox-container">
                    <Filtering />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "5" :
                stepToPrint = <span className="flexbox-container">
                    <Hopping />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "6" :
                stepToPrint = <span className="flexbox-container">
                    <Colding />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "7" :
                stepToPrint = <span className="flexbox-container">
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Leaven name"/>
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "8" :
                stepToPrint = <span className="flexbox-container">
                    <Density />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "9" :
                stepToPrint = <span className="flexbox-container">
                    <Fermenting />
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            case "10" :
                stepToPrint = <span className="flexbox-container">
                    <Description id={this.props.id}
                        getValue = {this.props.getValue}
                        handleOnChange = {this.handleOnChange}
                        placeholder  = "Add description"/>
                </span>
            break
            default :
                stepToPrint = "ERROR"
        }
        return stepToPrint
    }

    render() {
        return(
            <div className="steps flexbox-container">
                <select name="steps" 
                    id={"select"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep")}
                    size="1"
                    value={this.props.getValue(this.props.id,"selectedStep")} 
                    onChange={this.handleStepSelect}
                    className="step-details" >
                        <option value="1">Sanitizing</option>
                        <option value="2">Crushing</option>
                        <option value="3">Brewing</option>
                        <option value="4">Filtering</option>
                        <option value="5">Hopping</option>
                        <option value="6">Colding</option>
                        <option value="7">Leavening</option>
                        <option value="8">Density measurment</option>
                        <option value="9">Fermenting</option>
                        <option value="10">Bottling</option>
                </select>
                <div style={{marginLeft: "1vmin" }}>
                    {this.selectedStep()}
                </div>
                <button className="button step-details float-right" onClick={() => this.handleXClick()}>
                    <strong>X</strong>
                </button>
            </div>
        )
    }
}

export default Step