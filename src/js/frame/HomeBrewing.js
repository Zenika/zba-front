import React, { Component } from 'react'
import BurgerMenu from "./menu/BurgerMenu"
import logo from '../../zba.svg'
import Grafana from '../../Grafana'
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

import '../../css/Burger.css'

class HomeBrewing extends Component {

    render() {
        return(
            <div className="App-in Font">
                <div id="BurgerMenu">
                    <BurgerMenu />
                    <StickyHeader
                        // This is the sticky part of the header.
                        header={    
                            <header className="App-header">
                                <img src={logo} className="Zba-logo" alt="logo" />
                            </header>
                        }>
                        <section>
                        <header className="App-header">
                                <img src={logo} className="Zba-logo" alt="logo" />
                            </header>
                        </section>
                    </StickyHeader>
                    <div className="wrapper">
                        <Grafana />>
                    </div>
                </div>
            </div>
        )
    }

}

export default HomeBrewing