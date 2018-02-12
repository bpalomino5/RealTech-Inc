import React, { Component } from 'react';
import Client from './Client';
import StackGrid from "react-stack-grid";
import Card from './Card';
import { Search, Button, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      redirect: false, 
      recipe_id: null,
      isLoading: false,
      results: [],
      value: ''
    };
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

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.data, isMatch),
      })
    }, 500)
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
        <div className='headerContainer'>
          <div className='recipe-header'>
            <h2>Recipes</h2>
          </div>
          <Search 
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={this.state.results}
            value={this.state.value}
            aligned='right'
          />
        </div>
        <StackGrid
          columnWidth={300}>
          {this.state.data.map(recipe => (
            <Card
              onClick={() => this.handleCardClick(recipe.id)}
              details={{title:recipe.title, image:recipe.image}}
            />
          ))}
        </StackGrid>
        {ButtonExampleAnimated}
      </div>
    );
  }
}

export default Todo;