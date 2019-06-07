import React, { Component } from 'react';
import "../../../css/App.css"

class Hopping extends Component {
    
    render() {
        return (
            <div className="subStep">
                <div>
                    Time : <input type="number" name="hours" size="2" className="inputNumber"></input>H<span>
                    </span><input type="number" name="minutes" size="2" className="inputNumber"></input>min<span>  </span>
                </div>
                <div>
                    Heat : <input type="number" name="heat"></input><span>  </span>
                </div>
                <div>
                    Water : <input type="number" name="water" min="0"></input>L<span>  </span>
                </div>
                <div>
                    Hopper : <input type="text" className="step-details"/>
                </div>
            </div>
        )
    }
}

export default Hopping