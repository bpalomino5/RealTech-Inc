import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ClientTools from '../utils/ClientTools';
import StackGrid from "react-stack-grid";
import CustomCard from '../components/CustomCard';
import NavBar from '../components/NavBar';
import '../layouts/HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [], 
      ingredients: [],
      redirect: false, 
      page: null,
      isloggedin: false,
      session_data: null,
      user_firstname: '',
    };
    this.handleReset=this.handleReset.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      //check for data coming from login session start
      if(this.state.session_data==null){
        this.setState({session_data: this.props.location.state.session_data})
      }
      //user log off check
      if(this.props.location.state.isloggedin!=null){
        this.setState({isloggedin: this.props.location.state.isloggedin})
      }
    }
    this.getData();
  }

  componentDidMount(){
    if(this.state.session_data){
      this.getUserData();
    }
  }

   async getUserData() {
    let response = await ClientTools.getUserData({user_id:this.state.session_data.user_id, user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({user_firstname: response.data.first_name})
      }
    }
  }

  async getData(){
    var data = await ClientTools.getRecipes();
    this.setState({recipes: data.recipes});

    var ingredientData = await ClientTools.getIngredients();
    this.setState({ingredients: ingredientData.ingredients});
  }

  async loadRecipesbyIngredient(ingredientID){
    var data = await ClientTools.getRecipesByIngredient(ingredientID);
    if(data!=null){
      if(data.recipeInfo.length){
        this.setState({recipes: data.recipeInfo})
      }
      else
        console.log("empty array") //handle this
    }
  }

  handleCardClick(id) {
    this.goToPage(`/recipes/${id}`)
  }

  handleResultSelect = (id) => {
    this.loadRecipesbyIngredient(id)
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  handleReset() {
    this.setState({session_data: null, user_firstname: null, isloggedin: false})
    this.props.history.replace({
      pathname: this.props.location.pathname,
      state: {}
    });
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: { session_data: this.state.session_data, user_firstname: this.state.user_firstname}}} />;
    }

    return (
      <div className="Home">
        <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
        <NavBar
          resetAll={this.handleReset}
          isloggedin={this.state.isloggedin}
          user_firstname={this.state.user_firstname}
          session_data={this.state.session_data}
          ingredients={this.state.ingredients}
          onSearchResultSelect={this.handleResultSelect}>

          <StackGrid
            gutterHeight={-50}
            columnWidth={300}>
            {this.state.recipes.map(recipe => (
              <CustomCard
                onClick={() => this.handleCardClick(recipe.id)}
                details={{title:recipe.title, image:recipe.image}}
              />
            ))}
          </StackGrid>
        </NavBar>
      </div>
    );
  }
}

export default HomePage;