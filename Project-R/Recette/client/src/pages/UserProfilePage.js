import React, { Component } from 'react';
import { Button, Feed, Card, Icon, List, Divider, Grid, Segment, Dropdown, Form } from 'semantic-ui-react';
import StackGrid from "react-stack-grid";
import CustomCard from '../components/CustomCard';
import '../layouts/UserProfilePage.css';
import ClientTools from '../utils/ClientTools';
import NavBar from '../components/NavBar';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_data: {user_id: '', user_token: ''},
      userdata: {username:'',email:'',first_name:'',last_name:'',biography:''},
      recipes: {id: '', title: '',image: ''},
      userActivity: [],
      userFavorites: [],
      userPreferences: [],
      favoritesTitles: [],
      ingredients: [],
      isloggedin: false,
      user_input_ingredients: [{ quanity: '', name: ' ', units: ' '}],
      shareholders: [ {name: ''}],
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({session_data: this.props.location.state.session_data})
    }
    //user log off check
    if(this.props.location.state.isloggedin!=null){
      this.setState({isloggedin: this.props.location.state.isloggedin})
    }
  }

  componentDidMount(){
    this.getPublicUserData();
    this.getActivity();
    this.getFavorites();
    this.getPreferences();
    this.getRecipes();
    this.getIngredients();
    // this.matchRecipes();
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async getIngredients () {
    let data = await ClientTools.getIngredients();
    this.setState({ingredients: data.ingredients})
  }

  async getRecipes () {
    let data = await ClientTools.getRecipes();
    this.setState({recipes: data.recipes});
  }

  async getPreferences() {
    let data = await ClientTools.getPreferences(this.props.match.params.id);
    console.log(data);
    if(data!=null){
      this.setState({userPreferences: data.preferences})
    }
  }

  async getPublicUserData() {
    let response = await ClientTools.getPublicUserData({profile_id: this.props.match.params.id});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({userdata: response.data})
      }
    }
  }

  async getActivity() {
    let response = await ClientTools.getActivity(this.props.match.params.id);
    console.log(response);
    if(response!=null){
      this.setState({userActivity: response.activity})
    }
  }

  
  async getFavorites() {
    let data = await ClientTools.getFavorites(this.props.match.params.id);
    console.log(data);
    if(data!=null){
      this.setState({userFavorites: data.favorites})
    }
  }
  
  async AttemptLogout() {
    let response = await ClientTools.logout({user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.goToPage('/')
      }
    }
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { name: evt.target.value, age: evt.target.value };
    });
    
    this.setState({ shareholders: newShareholders });
  }
  
  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }
  
  handleAddShareholder = () => {
    this.setState({ shareholders: this.state.shareholders.concat([{ name: '' }]) });
  }
  
  handleRemoveShareholder = (idx) => () => {
    this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
  }
  

  /*
  handleReset() {
    this.setState({session_data: null, user_firstname: null, isloggedin: false})
    this.props.history.replace({
      pathname: this.props.location.pathname,
      state: {}
    });
  */

  /*
  matchRecipes ()
  { 
    var i = 0;
    var favoritesWithTitle = [];
    for ( i = 0; i < this.state.recipes.length; i++ ) // recipes.length is returning a size of 0 here; may need to hard code to 67 to get loop running
    {
      if ( this.state.userFavorites[i] == this.state.recipes[i].id ) // producing error because .id
          favoritesWithTitle[i] = this.state.recipes[i].title;       // producing same error because .title
    }
    this.setState( {favoritesTitles: favoritesWithTitle} );
  }
  */

  /********* HTML for the 'favorite' cards. Not workinng yet since the reipce images and reipce titles haven't been matched by the recipe_ids *******************
     <div className='favorite-cards'>
          <StackGrid
            gutterHeight={-50}
            columnWidth={300}>
            <h1> MY FAVORITES </h1>
            {this.state.userFavorites.map(favorite => (
              <Card
                onClick={() => this.handleCardClick(favorite.recipe)}   
                details={ this.state.recipes.title, this.state.recipes.image }
              />
                ))
            }
          </StackGrid>
        </div>
  ****************************************************************************************************************************************************************/


  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: { session_data: this.state.session_data, user_firstname: this.state.user_firstname}}} />;
    }

    return(
      <div className='user-profile'>
        <div className="title-container">
          <div className='title'><Link to={{pathname:`/`, state: { session_data: this.state.session_data}}}>Recette</Link> </div>
          <div className='button-container'> <Button color='teal' onClick={this.AttemptLogout}>LOG OUT</Button> </div>
        </div>
        <div className='banner-container'>
           <Card
            fluid = 'true'
            color = 'teal'
            image='../../images/recette_header_wide.png'
            header= {this.state.userdata.first_name}
            meta='Recetter'
            description= {this.state.userdata.biography} 
           />
        </div>
        <div className='infoSection'>
          <Grid columns={4} relaxed>
            <Grid.Column width={4}>
              <Segment basic>
                  <h2 className='info-section-headers'>My Info </h2>
                  <Divider />
                  <div className='display-linebreak'></div>
                    <div className='my-info-text'>
                      <List animated verticalAlign='middle'>
                        <List.Item> <List.Content> <List.Icon name='user' color='teal' circular='true' size = 'large'/> {this.state.userdata.first_name} {this.state.userdata.last_name} </List.Content> </List.Item>
                        <List.Item> <List.Content> <List.Icon name='mail' color='teal' circular='true' size = 'large'/> {this.state.userdata.email} </List.Content> </List.Item>
                        <List.Item> <List.Content> <List.Icon name='at' color='teal' circular='true' size = 'large'/> {this.state.userdata.username} </List.Content> </List.Item>
                      </List>
                    </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width = {4}>
              <Segment basic>
                <h2 className='info-section-headers'>My Activity</h2>
                <Divider />
                <div className='display-linebreak'></div>
                  <Feed>
                    {this.state.userActivity.map(activity => (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User><h3>{this.state.userdata.username}</h3></Feed.User> 
                              <div className='activity-feed-text'><Icon name='comment' color='teal' circular='true' size = 'large' />{activity.activity}</div>
                            <Feed.Date><div className='activity-feed-text'>1 Hour Ago</div></Feed.Date>
                          </Feed.Summary>
                          <Feed.Meta>
                            <Feed.Like>
                             <Icon color='teal' name='like' />
                              <div className='activity-feed-text'>4 Likes</div>
                            </Feed.Like>
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    ))}                      
                </Feed>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment basic>
                <h2 className='info-section-headers'>My Favorites</h2>
                <Divider />
                  <div className='myRecipesList'>
                    <ul>
                    {this.state.userFavorites.map(favorite => (
                        <List animated verticalAlign='middle'>
                          <List.Item>
                           <List.Icon name='food' size='large' color='teal' circular='true' verticalAlign='middle' />
                            <List.Content>
                              <List.Header><div className='activity-feed'><Link to={{pathname:`/recipes/${favorite.recipe}`, state: { session_data: this.state.session_data}}}>{favorite.recipe}</Link></div></List.Header>
                           </List.Content>
                          </List.Item>        
                        </List>
                          ))}
                    </ul>
                  </div>
              </Segment>
            </Grid.Column>
             <Grid.Column width = {4}>
              <Segment basic>
                <h2 className='info-section-headers'>My Preferences</h2>
                <Divider />
                <div className='display-linebreak'></div>
                  <Feed>
                    {this.state.userPreferences.map(preferences => (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            <List animated verticalAlign='middle'>
                              <List.Item>
                              <List.Icon name='star' size='large' color='teal' circular='true' verticalAlign='middle' />
                                <List.Content>
                                  <List.Header><div className='activity-feed'>{preferences.style}</div></List.Header>
                                </List.Content>
                              </List.Item>                                
                            </List>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ))}                      
                </Feed>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>

       
        <Grid columns={1}>
            <Grid.Column width={20}>
                <div className='new-recipe-addition-container'>

                <h2 className='add-favorite-section-headers'>Add Your Own Recipe</h2>
                  <Divider />
                <div className='display-linebreak'></div>

                  <Form inverted fluid>
                    <div className='forms'>

                      <Form.Group widths = 'equal'>
                         <Form.Input required fluid label='Recipe Name' placeholder='Recipe Name' />
                         <Form.Input required fluid label='Preparation Time' placeholder='HH:MM' />
                         <Form.Input required fluid label='Cook Time' placeholder='HH:MM' />
                         <Form.Input required fluid label='Ready In' placeholder='HH:MM' />
                         <Form.Input required fluid label='Origin' placeholder='America, Asia, Afria, Mexico, Russia' />
                         <Form.Input required fluid label='Ready In' placeholder='HH:MM' />
                      </Form.Group>
                      
                      <div className='user-ingredients'>
                        <form onSubmit={this.handleSubmit}>
                          <h3>Ingredients</h3>
                          {this.state.shareholders.map((shareholder, idx) => (
                            <div className="dynamic-ingredient-list">
                            <Form.Group>
                              <Form.Dropdown
                               placeholder={`Ingredient #${idx + 1} name`}
                               compact = 'true'
                               fluid search selection options={this.state.ingredients} />
                               <Form.Dropdown
                               placeholder='Quantity'
                               compact = 'true'
                               fluid search selection options={this.state.ingredients} />
                               <Form.Dropdown
                               placeholder='Units'
                               compact = 'true'
                               fluid search selection options={this.state.ingredients} />
                            </Form.Group>
                              <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
                            </div>
                          ))}
                          <button type="button" onClick={this.handleAddShareholder} className="small">Add Ingredient</button>
                        </form> 
                      </div>

                      <div className = 'direction-box'>
                      <Form.TextArea label='Directions' placeholder='Tell us how to prepare your creation...' />
                      </div>
                   
                  <Form.Checkbox label='I agree to be Pooh Bear' />
                  <Button type='submit'>Submit</Button>
                  </div>


                 </Form>
               </div>
            </Grid.Column>
        </Grid>
        

      </div>
    );
  }
}

export default UserProfilePage;