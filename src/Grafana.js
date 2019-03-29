import React, { Component } from 'react';
import "./css/App.css"

class Grafana extends Component {
  render() {
    return(
        <div className="inside column1">
            <iframe title="Heat" src="http://localhost:3001/d-solo/qzlNEm6iz/zba?orgId=1&theme=light&panelId=2"
            width="100%" height="500" frameBorder="0"></iframe>
        </div>
    )
  }
}

export default Grafana;