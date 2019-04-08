import React, { Component } from 'react';
import "../../css/App.css"

class Step extends Component {
    constructor(props){
        super(props)
        this.number = props.number
    }

    render() {
        return(<span>Hello {this.number}    <button className="button" onClick={this.props.x}>
        <strong>X</strong>
        </button></span>)
    }
}

export default Step