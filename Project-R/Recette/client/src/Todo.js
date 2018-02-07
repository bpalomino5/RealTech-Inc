import React, { Component } from 'react';
import Client from './Client';
import StackGrid from "react-stack-grid";
import Card from './Card';
import { Button, Icon } from 'semantic-ui-react';


// class Title extends Component {
//   render() {
//     return <section className="app-title">
//       <div className="app-title-content">
//         <h1>Latest News</h1>
//         <p>Covering March & April 2015</p>
//         <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank">Design from <i className="fa fa-dribbble"></i></a>
//       </div>
//     </section>
//   }
// }


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', data: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  async getData(){
    var data = await Client.getRecipes();
    this.setState({data: data.recipes});
  }

  render() {
    const ButtonExampleAnimated = (
      <div>
        <Button animated>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name='right arrow' />
          </Button.Content>
        </Button>
        <Button animated='vertical'>
          <Button.Content hidden>Shop</Button.Content>
          <Button.Content visible>
            <Icon name='shop' />
          </Button.Content>
        </Button>
        <Button animated='fade'>
          <Button.Content visible>
            Sign-up for a Pro account
          </Button.Content>
          <Button.Content hidden>
            $12.99 a month
          </Button.Content>
        </Button>
      </div>
    );

    return (
      <div>
        <h2 className="recipe-header">Recipes</h2>
        <StackGrid
          columnWidth={300}>
          {this.state.data.map(recipe => (
            <Card
              onClick={() => console.log(recipe.name)}
              details={{title:recipe.name, image:recipe.image}}
            />
          ))}
        </StackGrid>
        
        {/*<TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        
        <StackGrid
          columnWidth={150}>
          <div className="app-card-list" id="app-card-list">
            {
              Object
              .keys(this.state.posts)
              .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
            }
          </div>

        </StackGrid>
        */}
        {ButtonExampleAnimated}       
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

// class TodoList extends React.Component {
//   render() {
//     return (
//       <ul>
//         {this.props.items.map(item => (
//           <li key={item.id}>{item.text}</li>
//         ))}
//       </ul>
//     );
//   }
// }

export default Todo;