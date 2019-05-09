import React, { Component } from 'react';
import "../../../css/App.css"

class Brewing extends Component {
    
    render() {
        return (
            <span>
                Time : <input type="number" name="hours" size="2"></input>H<span>
                    </span><input type="number" name="minutes" size="2"></input>min<span>  </span>
                Heat : <input type="number" name="heat"></input><span>  </span>
                Water : <input type="number" name="water" min="0"></input>L<span>  </span>
                Hopper : <input type="text"/>
                <button className="button">
                    <strong>Add stage</strong>
                </button>
            </span>
        )
    }
}

export default Brewing