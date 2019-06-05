import React, { Component } from 'react'
import BurgerMenu from "./menu/BurgerMenu"
import logo from '../../zba.svg'
import Grafana from '../../Grafana'

import '../../css/Burger.css'

class HomeBrewing extends Component {

    render() {
        return(
            <div className="App-in Font">
                <div id="BurgerMenu">
                    <BurgerMenu />
                    <header className="App-header">
                        <img src={logo} className="Zba-logo" alt="logo" />
                    </header>,
                    <div className="wrapper">
                        <Grafana />>
                    </div>
                </div>
            </div>
        )
    }

}

export default HomeBrewing