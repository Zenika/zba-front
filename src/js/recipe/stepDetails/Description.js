import React, { Component } from 'react'
import "../../../css/App.css"

class Description extends Component {

    handleOnChange = () => {
        this.props.handleOnChange("description")
    }

    render() {
        return (
            <textarea
                type="text"
                id={"description"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep")}
                rows='1'
                value={this.props.getValue(this.props.id,"description")}
                onChange={this.handleOnChange}
                placeholder={this.props.placeholder}
                className="step-details"/>
        )
    }
}

export default Description