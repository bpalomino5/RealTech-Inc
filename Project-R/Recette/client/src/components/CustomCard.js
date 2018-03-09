import React, { Component } from 'react';
import '../layouts/CustomCard.css';

class CustomCard extends Component {
  render() {
    const { image, title } = this.props.details;
    return (
      <article className="card" onClick={this.props.onClick}>
        <header className="card-header">
          <img src={image} alt="food"/>
          <div className="shadow" />
          <h4 className="card-header--title">{title}</h4>
        </header>
      </article>
    )
  }
}

export default CustomCard