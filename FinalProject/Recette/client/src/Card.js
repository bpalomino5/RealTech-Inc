import React, { Component } from 'react';

class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    )
  }
}


class CardHeader extends React.Component {
  render() {
    const { image, category } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{category}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <p className="date">March 20 2015</p>
        
        <h2>{this.props.title}</h2>
        
        <p className="body-content">{this.props.text}</p>
        
        <Button />
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardHeader category={this.props.details.category} image={this.props.details.image}/>
        <CardBody title={this.props.details.title} text={this.props.details.text}/>
      </article>
    )
  }
}

export default Card