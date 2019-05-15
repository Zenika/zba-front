import React from 'react';
import "../../../css/App.css"

function Description (props) {
    return (
        <textarea
            type="text"
            id={"description"+props.id+"step"+props.getValue(props.id,"selectedStep")}
            rows='1'
            value={props.getValue(props.id,"description")}
            onChange={props.handleOnChange("description")}
            placeholder={props.placeholder}
            className="step-details"/>
    )
}

export default Description