import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ClientTools from '../utils/ClientTools';
import StackGrid from "react-stack-grid";
import RecipeCard from '../components/RecipeCard';
import NavBar from '../components/NavBar';
import DataStore from '../utils/DataStore';
import '../layouts/HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
      redirect: false, 
      page: null
    };
  }

  componentWillMount(){
    this.getData();
  }

  async getData(){
    //need to check with latest data
    let local = DataStore.getData('data_version');
    if(local){        
      let response =  await ClientTools.getDataVersion();
      if(response){
        if(local.version===response.version){ // all up to date
          let recipeData = DataStore.getData('recipes');
          if(recipeData){ 
            this.setState({recipes: recipeData});
          }
        }
        else{ //update all
          let data = await ClientTools.getRecipes();
          this.setState({recipes: data.recipes});
          DataStore.storeData('recipes',data.recipes); //store in data store

          let ingredientData = await ClientTools.getIngredients();
          DataStore.storeData('ingredients',ingredientData.ingredients); //store in data store

          let stylesData = await ClientTools.getStyles();
          DataStore.storeData('styles', stylesData.styles);

          let Dbversion = await ClientTools.getDataVersion();
          if(Dbversion) DataStore.storeData('data_version', Dbversion);
        }
      }
    }
    else{ // no local data 
      let data = await ClientTools.getRecipes();
      this.setState({recipes: data.recipes});
      DataStore.storeData('recipes',data.recipes); //store in data store

      let ingredientData = await ClientTools.getIngredients();
      DataStore.storeData('ingredients',ingredientData.ingredients); //store in data store

      let stylesData = await ClientTools.getStyles();
      DataStore.storeData('styles', stylesData.styles);

      let Dbversion = await ClientTools.getDataVersion();
      if(Dbversion) DataStore.storeData('data_version', Dbversion);
    }
  }

  async loadRecipesbyIngredient(ingredientID){
    var data = await ClientTools.getRecipesByIngredient(ingredientID);
    if(data){
      let recipes = [];
      let allRecipes = DataStore.getData('recipes');
      for (var i = 0; i < data.recipeIDs.length; i++) {
        recipes.push(allRecipes[data.recipeIDs[i]-1]);
      }
      this.setState({recipes: recipes});
    }
  }

  async loadRecipesbyStyle(styleID){
    var data = await ClientTools.getRecipesByStyle(styleID);
    if(data){
      let recipes = [];
      let allRecipes = DataStore.getData('recipes');
      for (var i = 0; i < data.recipeIDs.length; i++) {
        recipes.push(allRecipes[data.recipeIDs[i]-1]);
      }
      this.setState({recipes: recipes});
    }
  }

  handleCardClick(id) {
    this.goToPage(`/recipes/${id}`)
  }

  handleResultSelect = (type,id) => {
    if(type==='ingredient') this.loadRecipesbyIngredient(id)
    else if(type==='style') this.loadRecipesbyStyle(id)
    else if(type==='recipe_name') this.handleCardClick(id)
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

    return (
      <div className="Home">
        <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
        <NavBar
          path={this.props.match.path}
          onSearchResultSelect={this.handleResultSelect}>

          <StackGrid
            gutterHeight={-50}
            columnWidth={300}>
            {this.state.recipes.map(recipe => (
              <RecipeCard
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