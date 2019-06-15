import React, { Component } from 'react'
import "../../../css/App.css"
import Description from './Description';

class Crushing extends Component {

    handleOnChange = () => {
        this.props.handleOnChange("crushing")
    }

    render() {
        return (
            <div>
                <Description
                    id={this.props.id}
                    getValue = {this.props.getValue}
                    handleOnChange = {this.handleOnChange}
                    placeholder  = "Malt name"/>
                <Description 
                    id={this.props.id}
                    getValue = {this.props.getValue}
                    handleOnChange = {this.handleOnChange}
                    placeholder  = "Add description"/>

            </div>
        )
    }
}

export default Crushing