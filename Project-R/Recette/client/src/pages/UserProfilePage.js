import React, { Component } from 'react';
import { Button, Feed, Card, Icon, List, Divider, Grid, Segment, Dropdown, Form, Message } from 'semantic-ui-react';
import StackGrid from "react-stack-grid";
import RecipeCard from '../components/RecipeCard';
import '../layouts/UserProfilePage.css';
import DataStore from '../utils/DataStore';
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
      units: { unit: '', name: ''} ,
      userActivity: [],
      userFavorites: [],
      userPreferences: [],
      favoritesTitles: [],
      ingredients: [],
      user_ingredients: [ {name: '', quantity: '', units: ''}], // used to store the user's inputted recipe
      user_inputted_recipe: [ {user_id: '' ,name: '', prep_time: '', cooking_time: '', ready_in: '', origin: '', directions: '', image_location: '../../images/dummyimage.jpg'} ],
      quantityOptions: [ {text: '1' , value: 1}, {text: '2', value: 2}, {text: '3', value: 3}, {text: '4', value: 4}, {text: '5', value: 5}, {text: '6', value: 6} ], // displays values for quantity dropdown
      unitOptions: [ {text: '', value: ''}],  // should display units for units dropdown
      success: false,
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    let sessionData = DataStore.getSessionData('session_data');
    if(sessionData) this.setState({session_data: sessionData})
  }

  componentDidMount(){
    this.getPublicUserData();
    this.getActivity();
    this.getFavorites();
    this.getPreferences();
    this.getRecipes();
    this.getIngredients();
    this.getUnits();
    this.unitsReworker();
    // this.matchRecipes();
  }
  
  
  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async attemptAddNewRecipe ()
  {
      if(  this.state.user_inputted_recipe.name 
        && this.state.user_inputted_recipe.prep_time 
        && this.state.user_inputted_recipe.cooking_time 
        && this.state.user_inputted_recipe.ready_in 
        && this.state.user_inputted_recipe.origin 
        && this.state.user_inputted_recipe.directions )
      {
          let newRecipe = { 
                            user_id:        this.state.session_data.user_id,
                            name:           this.state.user_inputted_recipe.name, 
                            prep_time:      this.state.user_inputted_recipe.prep_time, 
                            cooking_time:   this.state.user_inputted_recipe.cooking_time, 
                            ready_in:       this.state.user_inputted_recipe.ready_in, 
                            origin:         this.state.user_inputted_recipe.origin, 
                            directions:     this.state.user_inputted_recipe.directions,
                            image_location: this.state.user_inputted_recipe.image_location 
                          };
          let response = await ClientTools.addRecipe(newRecipe); // Call function that adds new recipe
          console.log(response);
          if(response!=null){
            if(response.code===1){
               // show successfully added new recipe message
            }
            else this.setState({error:true, errorMessage: response.message})
          } 
      }
      else this.setState({error:true, errorMessage: 'Please fill in all areas of the form.'})
  }

  async getUnits () {
    let data = await ClientTools.getUnits();
    if(data!=null){
      this.setState( {units: data.units })
    }
  }

  /* Helper function to display the unit dropdown bar properly */
  async unitsReworker () {

    var i = 0;
    var units2 = [ {text: '', value: ''} ];
    for ( i = 0; i < 20; i++ ) 
    {
        units2[i] = {text: String(this.state.units.name),value: i};
        // years[i] = {text: String(i + 1900), value: i + 1900};
    }
    this.setState( {unitOptions: units2} );
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

  
  
  
  handleAddIngredient = () => {
    this.setState({ user_ingredients: this.state.user_ingredients.concat([{ name: '', quantity: '', units: '' }]) });
  }
  
  handleRemoveIngredient = (index) => () => {
    this.setState({ user_ingredients: this.state.user_ingredients.filter((s, sindex) => index !== sindex) });
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

  /********* HTML for the 'favorite' cards. Not workinng yet since the recipe images and reipce titles haven't been matched by the recipe_ids *******************
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
      return <Redirect push to={{pathname: this.state.page}} />;
    }

    return(
      <div>
        <NavBar>
      <div className='user-profile'>
        
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
                         <Form.Input 
                          required 
                          fluid 
                          label='Recipe Name' 
                          placeholder='Recipe Name' 
                          value={this.state.user_inputted_recipe.name} 
                          onChange={(e, {value}) => this.setState({name: value})}
                          />

                         <Form.Input 
                         required 
                         fluid 
                         label='Preparation Time' 
                         placeholder='HHMM' 
                         value={this.state.user_inputted_recipe.prep_time} 
                         onChange={(e, {value}) => this.setState({prep_time: value})}
                         />

                         <Form.Input 
                         required 
                         fluid 
                         label='Cook Time' 
                         placeholder='HHMM' 
                         value={this.state.user_inputted_recipe.cooking_time} 
                         onChange={(e, {value}) => this.setState({cooking_time: value})}
                         />

                         <Form.Input 
                         required 
                         fluid 
                         label='Ready In' 
                         placeholder='HHMM' 
                         value={this.state.user_inputted_recipe.ready_in} 
                         onChange={(e, {value}) => this.setState({ready_in: value})}
                         />
                         
                         <Form.Input 
                         required 
                         fluid 
                         label='Origin' 
                         placeholder='America, Asia, Afria, Mexico, Russia' 
                         value={this.state.user_inputted_recipe.origin} 
                         onChange={(e, {value}) => this.setState({origin: value})}
                         />
                      </Form.Group>
                      
                      <div className='user-ingredients'>
                        <form onSubmit={this.handleSubmit}>
                          <h3>Ingredients</h3>
                          {this.state.user_ingredients.map((ingredient, index) => (
                            <div className="dynamic-ingredient-list">
                            <Form.Group>
                              <Form.Dropdown
                               placeholder={`Ingredient #${index + 1} name`}
                               compact = 'true'
                               allowAdditions
                               fluid search selection options={this.state.ingredients}
                               />

                               <Form.Dropdown
                               placeholder='Quantity'
                               compact = 'true'
                               allowAdditions
                               fluid search selection options={this.state.quantityOptions} 
                               />

                               <Form.Dropdown
                               placeholder='Units'
                               compact = 'true'
                               allowAdditions
                               fluid search selection options={this.state.unitOptions} />
                               <Button color = 'teal' content='ADD' onClick={this.handleAddIngredient} />
                               <Button color = 'red' content='DELETE' onClick={this.handleRemoveIngredient(index)} 
                               />
                            </Form.Group>
                              
                            </div>
                          ))}
                          
                        </form> 
                      </div>

                      <div className = 'direction-box'>
                        <Form.TextArea 
                          label='Directions' 
                          required 
                          placeholder='Tell us how to make your creation...' 
                          value={this.state.user_inputted_recipe.directions} 
                          onChange={(e, {value}) => this.setState({directions: value})} 
                          />
                      </div>
                   
                  <Form.Checkbox label='Add to My Favorites' />
                  <Button color = 'green' type='submit' onClick={this.attemptAddNewRecipe}>SUBMIT</Button>
                  <Message
                    success
                    header='Added new recipe!'
                    content='Your new recipe will now be added to our library!'
                  />
                  </div>

                 </Form>
               </div>
            </Grid.Column>
        </Grid>
        

      </div>
      </NavBar>
      </div>
    );
  }
}

export default UserProfilePage;