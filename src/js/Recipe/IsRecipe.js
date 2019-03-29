import React, { Component } from 'react';
import "../../css/App.css"

class IsRecipe extends Component {
  render() {
    if(this.props.recipe.length === 0) {
      return(<h2>there is no recipe :'(</h2>)
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Type of beer</th>
              <th>Type of malt</th>
              <th>Creator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.recipe.map((recipe) => (
              <tr className="line" key={recipe.name}>
                <td>{recipe.name}</td>
                <td>{recipe.ingredientType}</td>
                <td>{recipe.malt}</td>
                <td>{recipe.creator}</td>
                <td>
                  <button className="button smallButton" onClick={() => this.props.edit(
                    recipe.name,
                    recipe.ingredientType,
                    recipe.malt,
                    recipe.creator,
                    recipe.id)}>Edit</button>
                  <button className="button smallButton" onClick={() => this.props.delete(recipe.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
}

export default IsRecipe;