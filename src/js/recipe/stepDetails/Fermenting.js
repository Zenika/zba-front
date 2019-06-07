import React, { Component } from 'react';
import "../../../css/App.css"

class Filtering extends Component {
    
    render() {
        return (
            <div className="subStep">
                <div>
                    Time : <input type="number" name="hours" size="2" className="inputNumber"></input>Month<span>
                    </span><input type="number" name="hours" size="2" className="inputNumber"></input>Day<span>
                    </span><input type="number" name="minutes" size="2" className="inputNumber"></input>Hour<span>  </span>
                </div>
                <div>
                    Temperature : <input type="number" name="temperature" className="inputNumber"></input><span>  </span>
                </div>
            </div>
        )
    }
}

export default Filtering