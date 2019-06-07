import React, { Component } from 'react';
import "../../../css/App.css"

class Ingredient extends Component {

    selectedStep = (value) => {
        switch(value) {
            case "1" :
                return <li>powder actif oxygen</li>
            case "2" :
                return <li>malt</li>
            case "5" :
                return <li>hopper</li>
            case "6" :
                    return <li>leaven</li>
            default :
                return null
        }
    }

    list = () => {
        let list = [], i = 0
        this.props.steps.forEach(element => {
            i++
            list.push(<ul key={"ingredient"+this.props.steps.id+""+i}>
                {this.selectedStep(element.selectedStep)}
            </ul>)
        });
        return list
    }

    render() {
        return (
            <div>{this.list()}</div>
        )
    }
}

export default Ingredient