import React, { Component } from 'react';
import { Search, Button, Image } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import ClientTools from '../res/ClientTools';
import StackGrid from "react-stack-grid";
import Card from '../components/Card';
import '../layouts/HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      redirect: false, 
      page: null,
      recipe_id: null,
      isLoading: false,
      results: [],
      value: '',
      isloggedin: false,
      user_token: '',
    };
    this.AttemptLogin=this.AttemptLogin.bind(this);
    this.OpenProfilePage=this.OpenProfilePage.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({isloggedin: this.props.location.state.isloggedin, user_token: this.props.location.state.user_token})
    }
    this.getData();
  }

  async getData(){
    var data = await ClientTools.getRecipes();
    this.setState({data: data.recipes});
  }

  handleCardClick(id) {
    this.goToPage(`/recipes/${id}`)
    // this.setState({redirect: true, recipe_id: id});
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

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  AttemptLogin(){
    this.goToPage('/login')
    // this.setState({redirect: true, page: 1});
  }

  OpenProfilePage() {
    this.goToPage('/userprofile')
  }

  render() {
    // if(this.state.redirect) {
    //   if(this.state.page === 1){
    //     return <Redirect push to={{pathname: `/login`}} />;
    //   }
    //   else
    //     return <Redirect push to={{pathname: `/recipes/${this.state.recipe_id}`, state: { recipe_id: this.state.recipe_id}}} />;
    // }

    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: { user_token: this.state.user_token}}} />;
    }

    return (
      <div className="Home">
        <div className="headerContainer">
          <h1 className="Home-title">Recette</h1>
          <Search 
              className="searchBox"
              loading={this.state.isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.results}
              value={this.state.value}
              aligned='right'
            />
            <div className="buttonBox">
              <div hidden={!this.state.isloggedin} className="profileBox" onClick={this.OpenProfilePage}>
                <Image src='https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' />
                <h2></h2>
              </div>
              <div hidden={this.state.isloggedin}>
                <Button color='teal' onClick={this.AttemptLogin}>SIGN UP / LOG IN</Button>
              </div>
            </div>
        </div>
        <div className="Home-intro">
          <div className='recipeContainer'>
            <div className='recipe-header'>
              <h2>Recipes</h2>
            </div>            
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
        </div>
      </div>
    );
  }
}

export default HomePage;