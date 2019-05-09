import React, { Component } from 'react';
import "../../../css/App.css"

class Description extends Component {
    
    render() {
        return (
            <input
                type="text"
                id={"description"+this.props.id+"step"+this.props.getValue(this.props.id,"selectedStep")}
                value={this.props.getValue(this.props.id,"description")}
                onChange={this.props.handleOnChange}/>
        )
    }
}

export default Description