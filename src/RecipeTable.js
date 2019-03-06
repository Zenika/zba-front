import React, { Component } from 'react';
import axios from 'axios';
import "./App.css"

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

class RecipeTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: []
    }
  }  

  /*Affiche la table des recettes au démarrage de la page*/
  componentDidMount() {
    axios.get(`http://localhost:8080/Recipe`)
      .then(res => {
        const recipe = res.data;
        this.setState({ recipe });
    })
  }


  /*Actualise la table des recettes quand un composant est créer*/
  componentDidUpdate(prevProps) {
    if (this.props.update !== prevProps.update) {
      axios.get(`http://localhost:8080/Recipe`)
        .then(res => {
          const recipe = res.data;
          this.setState({ recipe });
      })
    }
  }

  Delete = i => {
    axios.delete('http://localhost:8080/Recipe'+i)
      .then((result) => {
        console.log("Succesfully deleted")
    });
    this.props.setUpdate()
  }

  render() {
    return(
      <div className="column2">
        <div className="inside">
          <h1>List recipe</h1>
          <IsRecipe recipe={this.state.recipe} delete={this.Delete} edit={this.props.setEdit}/>
        </div>
      </div>
    )
  }
}

export default RecipeTable;