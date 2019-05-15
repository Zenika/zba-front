import React from 'react';
import "../../../css/App.css"

function Brewing (props) {
    return (
        <div className="subStep">
            <div >
                Time : <input
                    className="inputNumber"
                    type="number"
                    id={"timeH"+props.id+"step"+props.getValue(props.id,"selectedStep")}
                    value={props.getValue(props.id,"timeH")}
                    name="timeH"
                    size="2" max="24" min="0" >
                </input>h<span>
                </span><input 
                    className="inputNumber"
                    type="number"
                    id={"timeMin"+props.id+"step"+props.getValue(props.id,"selectedStep")}
                    value={props.getValue(props.id,"timeMin")}
                    name="timeMin"
                    size="2" max="59" min="0">
                </input>min<span></span>
            </div>
            <div>
                Heat : <input
                    className="inputNumber"
                    type="number"
                    id={"heat"+props.id+"step"+props.getValue(props.id,"selectedStep")}
                    value={props.getValue(props.id,"heat")}
                    name="heat">
                </input>°C
            </div>
            <div>
                Water : <input
                    className="inputNumber"
                    type="number"
                    id={"water"+props.id+"step"+props.getValue(props.id,"selectedStep")}
                    value={props.getValue(props.id,"water")}
                    name="water"
                    min="0">
                </input>L<span>  </span>
            </div>
            <div>
                Hopper : <input type="text"/>
            </div>
        </div>
    )
}

export default Brewing