import React, { Component } from 'react';
import '../layouts/RecipeCard.css';

class RecipeCard extends Component {
  render() {
    const { image, title } = this.props.details;
    return (
      <article className="recipeCard" onClick={this.props.onClick}>
        <header className="card-header">
          <img src={"/"+image} alt="food"/>
          <div className="shadow" />
          <h4 className="card-header--title">{title}</h4>
        </header>
      </article>
    )
  }
}

export default RecipeCard