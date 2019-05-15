import React, { Component } from 'react';
import "../../../css/App.css"

class Colding extends Component {
    
    render() {
        return (
            <div className="steps">
                <div>
                    Time : <input className="inputNumber" type="number" name="hours" size="2" max="24" min="0"></input>h<span>
                    </span><input className="inputNumber" type="number" name="minutes" size="2" max="59" min="0"></input>min<span></span>
                </div>
                <div>
                    Temperature : <input className="inputNumber" type="number" name="heat"></input>°C
                </div>
            </div>
        )
    }
}

export default Colding