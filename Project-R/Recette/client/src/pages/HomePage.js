import React, { Component } from 'react';
import { Search, Button, Image, Menu, Icon, Transition, Sidebar, Segment} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Helmet } from 'react-helmet';

import ClientTools from '../utils/ClientTools';
import StackGrid from "react-stack-grid";
import Card from '../components/Card';
import '../layouts/HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [], 
      ingredients: [],
      redirect: false, 
      page: null,
      recipe_id: null,
      isLoading: false,
      results: [],
      value: '',
      isloggedin: false,
      session_data: null,
      user_firstname: '',
      activeItem: 'home',
      visible: true,
    };
    this.AttemptLogin=this.AttemptLogin.bind(this);
    this.OpenProfilePage=this.OpenProfilePage.bind(this);
    this.openMenu=this.openMenu.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      //check for data coming from login session start
      if(this.state.session_data==null){
        this.setState({isloggedin: !this.state.isloggedin, session_data: this.props.location.state.session_data})
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

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.loadRecipesbyIngredient(result.id)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.ingredients, isMatch),
      })
    }, 500)
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  AttemptLogin(){
    this.goToPage('/login')
  }

  OpenProfilePage() {
    this.goToPage(`/profiles/${this.state.session_data.user_id}`)
  }

  refreshPage(){
    window.location.reload();
  }

  openMenu(){
    this.setState({visible: !this.state.visible})
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: { session_data: this.state.session_data, user_firstname: this.state.user_firstname}}} />;
    }

    return (
      <div className="Home">
        <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
        <Menu fixed='top'>
          <div className="headerContainer">
            <div className="logoBox" onClick={this.refreshPage}>
              <h1>Recette</h1>
            </div>
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
                <h2>{this.state.user_firstname}</h2>
              </div>
              <div hidden={this.state.isloggedin}>
                <Button color='teal' onClick={this.AttemptLogin}>SIGN UP / LOG IN</Button>
              </div>
            </div>
            <Menu.Item onClick={this.openMenu}>
              <Icon name='bars' size='large' />
            </Menu.Item>
          </div>
        </Menu>
        <div className="Home-intro">
          <Sidebar.Pushable as={'div'} className="test">
            <Sidebar as={Menu} animation='overlay' width='thin' visible={!this.state.visible} direction='top' icon='labeled' inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
              <Menu.Item>
                <Icon name='power' size='large' inverted link/> Log out
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
            <Transition visible={this.state.visible} animation='fade up' duration={{hide:800,show:1200}}>
                <StackGrid
                  gutterHeight={-50}
                  columnWidth={300}>
                  {this.state.recipes.map(recipe => (
                    <Card
                      onClick={() => this.handleCardClick(recipe.id)}
                      details={{title:recipe.title, image:recipe.image}}
                    />
                  ))}
                </StackGrid>
            </Transition>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default HomePage;