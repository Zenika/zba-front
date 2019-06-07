import React from "react"
import { slide as Menu } from "react-burger-menu"
import { NavLink } from "react-router-dom"

export default props => {
    return (
            <div>
                <Menu >
                    <NavLink className="menu-item" to="/HomeBrewing">
                    Brewing
                    </NavLink>
                    <NavLink className="menu-item" to="/HomeRecipe">
                    Recipe
                    </NavLink>
                </Menu>
            </div>
    )
}