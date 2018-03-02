import React, { Component } from 'react';
import { Search, Button, Image, Menu, Icon, Sidebar, Segment, Grid, Header} from 'semantic-ui-react';
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
    this.AttemptLogout=this.AttemptLogout.bind(this);
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

  async AttemptLogout() {
    if(this.state.session_data!=null){
      let response = await ClientTools.logout({user_token: this.state.session_data.user_token});
      console.log(response);
      if(response!=null){
        if(response.code===1){
          this.setState({isloggedin: false})
        }
      }
    }
  }

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
          <Sidebar.Pushable>
            <Sidebar as={'div'} animation='overlay' width='very wide' visible={!this.state.visible} direction='top' icon='labeled' inverted>
              <Segment raised inverted  textAlign='center'>
                 <Grid columns={3} divided inverted verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size='large' inverted color='grey'>Company</Header>
                      <p>About Recette</p>
                      <p>The Team</p>
                      <p>Contact Us</p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header size='large' inverted color='grey'>Media</Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header size='large' inverted color='grey'>Log out</Header>
                      <Icon name='power' size='large' inverted link onClick={this.AttemptLogout} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Sidebar>
            <Sidebar.Pusher>
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
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default HomePage;