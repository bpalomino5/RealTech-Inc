import React, { Component } from 'react';
import '../layouts/Card.css';

// class CardHeader extends Component {
//   render() {
//     const { image, category } = this.props;
//     var style = { 
//         backgroundImage: "url(" + image + ")",
//     };
//     return (
//       <header style={style} className="card-header">
//         <h4 className="card-header--title">{category}</h4>
//       </header>
//     )
//   }
// }


// class CardBody extends Component {
//   render() {
//     return (
//       <div className="card-body">
//         <h2 className="card-body--title">{this.props.title}</h2>       
//         <p className="body-content">{this.props.text}</p>        
//       </div>
//     )
//   }
// }


// class Card extends Component {
//   render() {
//     return (
//       <article className="card" onClick={this.props.onClick}>
//         <CardHeader category={this.props.details.category} image={this.props.details.image}/>
//         <CardBody title={this.props.details.title} text={this.props.details.text}/>
//       </article>
//     )
//   }
// }

class Card extends Component {
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

export default Card