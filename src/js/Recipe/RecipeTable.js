import React, { Component } from 'react';
import axios from 'axios';
import IsRecipe from './IsRecipe'
import "../../css/App.css"

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