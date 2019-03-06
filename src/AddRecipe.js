import React, { Component } from 'react';
import "./App.css"

class AppRecipe extends Component {
  render() {
    const { name, ingredientType, malt, creator } = this.props.state
    return(
      <div className="column1">
        <div className="inside">
          <h1>Create recipe</h1>
          <form onSubmit={this.props.onSubmit}>
            <label>Recipe</label>
            <br/><br/>
            <input type="text" name="field" id="name" value={name} onChange={this.props.onChange}/>
            <br/><br/>
            <label>Type of beer</label>
            <br/><br/>
            <input type="text" name="field" id="ingredientType" value={ingredientType} onChange={this.props.onChange}/>
            <br/><br/>
            <label>Type of malt</label>
            <br/><br/>
            <input type="text" name="field" id="malt" value={malt} onChange={this.props.onChange}/>
            <br/><br/>
            <label>Creator name</label>
            <br/><br/>
            <input type="text" name="field" id="creator" value={creator} onChange={this.props.onChange}/>
            <br/><br/><br/>
            <button className="button bigButton">Add new recipe</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AppRecipe;