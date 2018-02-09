import React, { Component } from 'react';
import Client from './Client';
import StackGrid from "react-stack-grid";
import Card from './Card';
import { Button, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], redirect: false, recipe_id: null};
  }

  componentWillMount(){
    this.getData();
  }

  async getData(){
    var data = await Client.getRecipes();
    this.setState({data: data.recipes});
  }

  handleCardClick(id) {
    this.setState({redirect: true, recipe_id: id});
  }

  render() {
    if(this.state.redirect) {
      return <Redirect push to={{pathname: `/recipes/${this.state.recipe_id}`, state: { recipe_id: this.state.recipe_id}}} />;
    }

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
              onClick={() => this.handleCardClick(recipe.id)}
              details={{title:recipe.name, image:recipe.image}}
            />
          ))}
        </StackGrid>
        {ButtonExampleAnimated}
      </div>
    );
  }
}

export default Todo;