import React, { Component } from 'react';
import { Button, Feed, Card, Icon, List, Divider, Grid, Segment, Form, Message, Modal, Header } from 'semantic-ui-react';
import StackGrid from "react-stack-grid";
import RecipeCard from '../components/RecipeCard';
import '../layouts/UserProfilePage.css';
import DataStore from '../utils/DataStore';
import ClientTools from '../utils/ClientTools';
import NavBar from '../components/NavBar';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_data: {user_id: '', user_token: ''},
      userdata: {username:'',email:'',first_name:'',last_name:'',biography:''},
      recipes: [],
      units: [],
      userActivity: [],
      userFavorites: [],
      userPreferences: [],
      favoritesTitles: [],
      ingredients: [],
      user_ingredients: [ {ingredient_id: '', quantity: '', unit_id: ''}],
      name: '', 
      prep_time: '', 
      cooking_time: '', 
      ready_in: '', 
      style: '',
      origin: '', 
      directions: '', 
      image_location: 'images/dummyimage.jpg',
      addFavoriteChecked: false,
      recipeModalOpen: false,
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
    this.attemptAddNewRecipe=this.attemptAddNewRecipe.bind(this);
    this.handleResultSelect=this.handleResultSelect.bind(this);
    this.handleModalClose=this.handleModalClose.bind(this);
    this.handleModalOpen=this.handleModalOpen.bind(this);
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
    this.getIngredients();
    this.getUnits();
  }
  
  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async attemptAddNewRecipe() {
    if(this.state.name && this.state.prep_time && this.state.cooking_time && this.state.ready_in && this.state.origin && this.state.directions){
      let newRecipe = { 
                        user_token:     this.state.session_data.user_token,
                        user_id:        this.state.session_data.user_id,
                        name:           this.state.name, 
                        prep_time:      this.state.prep_time, 
                        cooking_time:   this.state.cooking_time, 
                        ready_in:       this.state.ready_in, 
                        origin:         this.state.origin, 
                        instruction:    this.state.directions,
                        image_location: this.state.image_location
                      };

      if(this.state.user_ingredients.length >= 1){
        newRecipe.body = this.state.user_ingredients;
      }

      let response = await ClientTools.addRecipe(newRecipe); // Call function that adds new recipe
      // console.log(response);
      if(response!=null){
        if(response.code===1){
          this.updateActivity('Added new recipe '+ newRecipe.name);
          // show successfully added new recipe message
          
          //update Recipes
          let data = await ClientTools.getRecipes();
          console.log(data);
          DataStore.storeData('recipes',data.recipes);

          if(this.state.addFavoriteChecked) this.addNewRecipeToFavorites(response.data.recipe_id);
          this.handleModalClose()
        }
        else this.setState({error:true, errorMessage: response.message})
      } 
    }
    else this.setState({error:true, errorMessage: 'Please fill in all areas of the form.'})
  }

  async updateActivity(message){
    let activityData = this.state.session_data;
    activityData.message=message;
    let response = await ClientTools.addActivity(activityData);
    if(response){
      window.location.reload();
    }
  }

  async addNewRecipeToFavorites(recipe_id) {
    let favoriteData = this.state.session_data;
    favoriteData.recipe_id=recipe_id;
    let response = await ClientTools.addFavorite(favoriteData);
    if(response){
      if(response.code===1){
        // update page
       
        //update Favorites
        this.getFavorites()
      }
    }
  }

  async getUnits () {
    let data = await ClientTools.getUnits();
    if(data!=null){
      this.setState( {units: data.units })
    }
  }

  async getIngredients () {
    let ingredients = DataStore.getData('ingredients');
    this.setState({ingredients: ingredients})
  }

  async getPreferences() {
    let data = await ClientTools.getPreferences(this.props.match.params.id);
    let styles = DataStore.getData('styles');
    if(data.preferences.length > 0){
      let preferences = [];
      for(var i=0;i<data.preferences.length;i++){
        preferences.push(styles[i]);
      }
      this.setState({userPreferences: preferences})
    }
    else{
      this.setState({userPreferences: [{title: 'No preferences yet!'}]})
    }
  }

  async getPublicUserData() {
    let response = await ClientTools.getPublicUserData({profile_id: this.props.match.params.id});
    // console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({userdata: response.data})
      }
    }
  }

  async getActivity() {
    let response = await ClientTools.getActivity(this.props.match.params.id);
    if(response.activity.length > 0){
      this.setState({userActivity: response.activity})
    }
    else
      this.setState({userActivity: [{activity: 'No recent activity!'}]})
  }

  async getFavorites() {
    let data = await ClientTools.getFavorites(this.props.match.params.id);
    if(data!=null){
      let recipes = [];
      let allRecipes = DataStore.getData('recipes');
      for (var i = 0; i < data.favorites.length; i++) {
        for(var j = 0; j < allRecipes.length; j++){
          if(allRecipes[j].id===data.favorites[i].recipe)
            recipes.push(allRecipes[j])
        }
      }
      this.setState({recipes: recipes});
    }
  }
  
  async AttemptLogout() {
    let response = await ClientTools.logout({user_token: this.state.session_data.user_token});
    // console.log(response);
    if(response!=null){
      if(response.code===1){
        this.goToPage('/')
      }
    }
  }

  
  
  
  handleAddIngredient = () => {
    //add to user_ingredients list
    this.setState({ user_ingredients: this.state.user_ingredients.concat([{ ingredient_id: this.state.ingredient_name, quantity: this.state.ingredient_quantity, unit_id: this.state.ingredient_unit}])});
  }
  
  handleRemoveIngredient = (index) => () => {
    this.setState({ user_ingredients: this.state.user_ingredients.filter((s, sindex) => index !== sindex) });
  }

  handleCardClick(id) {
    this.goToPage(`/recipes/${id}`)
  }
  
  handleResultSelect(id) {
    console.log(id);
  }

  handleModalClose() {
    this.setState({recipeModalOpen: false})
  }

  handleModalOpen() {
    this.setState({recipeModalOpen: true})
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

     const ModalAddRecipe = (
      <Modal trigger={<Button onClick={this.handleModalOpen}>Add Recipe</Button>} closeIcon onClose={this.handleModalClose} open={this.state.recipeModalOpen}>
        <Modal.Header>Add Your Own Recipe</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid columns={1}>
                <Grid.Column width={20}>
                  <div className='display-linebreak'></div>
                      <Form fluid>
                        <div className='forms'>
                          <Form.Group widths = 'equal'>
                             <Form.Input 
                              required 
                              fluid 
                              label='Recipe Name' 
                              placeholder='Recipe Name' 
                              value={this.state.name} 
                              onChange={(e, {value}) => this.setState({name: value})}
                              />

                             <Form.Input 
                             required 
                             fluid 
                             label='Preparation Time' 
                             placeholder='HHMM' 
                             value={this.state.prep_time} 
                             onChange={(e, {value}) => this.setState({prep_time: value})}
                             />

                             <Form.Input 
                             required 
                             fluid 
                             label='Cook Time' 
                             placeholder='HHMM' 
                             value={this.state.cooking_time} 
                             onChange={(e, {value}) => this.setState({cooking_time: value})}
                             />

                             <Form.Input 
                             required 
                             fluid 
                             label='Ready In' 
                             placeholder='HHMM' 
                             value={this.state.ready_in} 
                             onChange={(e, {value}) => this.setState({ready_in: value})}
                             />

                             <Form.Input 
                             required 
                             fluid 
                             label='Style' 
                             placeholder='Breakfast, Lunch, Dinner' 
                             value={this.state.style} 
                             onChange={(e, {value}) => this.setState({style: value})}
                             />
                             
                             <Form.Input 
                             required 
                             fluid 
                             label='Origin' 
                             placeholder='America, Asia, Afria, Mexico, Russia' 
                             value={this.state.origin} 
                             onChange={(e, {value}) => this.setState({origin: value})}
                             />
                          </Form.Group>
                          
                          <div className='user-ingredients'>
                            <Header as='h3'>Ingredients</Header>
                            {this.state.user_ingredients.map((ingredient, index) => (
                              <div>
                                <Form.Group>
                                  <Form.Dropdown
                                    placeholder={`Ingredient #${index + 1} name`}
                                    search
                                    selection
                                    value={ingredient.ingredient_id} 
                                    onChange={(e, {value}) => {ingredient.ingredient_id = value; this.forceUpdate()}}
                                    options={this.state.ingredients.map(ingredient => ({
                                      text: ingredient.title,
                                      value: ingredient.ingredient_id,
                                    }))}
                                  />

                                  <Form.Dropdown
                                    placeholder='Quantity'
                                    search
                                    compact
                                    selection
                                    value={ingredient.quantity} 
                                    onChange={(e, {value}) => {ingredient.quantity = value; this.forceUpdate()}}
                                    options={[...Array(11).keys()].slice(1).map(n => ({
                                      text: n,
                                      value: n
                                    }))} 
                                  />

                                  <Form.Dropdown
                                    placeholder='Units'
                                    search
                                    selection
                                    value={ingredient.unit_id} 
                                    onChange={(e, {value}) => {ingredient.unit_id = value; this.forceUpdate()}}
                                    options={this.state.units.map(unit => ({
                                      text: unit.name,
                                      value: unit.unit,
                                    }))}
                                  />
                                  <Button color = 'teal' content='ADD' onClick={this.handleAddIngredient} />
                                  <Button color = 'red' content='DELETE' onClick={this.handleRemoveIngredient(index)} />
                                </Form.Group>
                              </div>
                            ))}
                          </div>
                          <div className = 'direction-box'>
                            <Form.TextArea 
                              label='Directions' 
                              required 
                              placeholder='Tell us how to make your creation...' 
                              value={this.state.directions} 
                              onChange={(e, {value}) => this.setState({directions: value})} 
                              />
                          </div>   
                      <Form.Checkbox 
                        label='Add to My Favorites'
                        checked={this.state.addFavoriteChecked} 
                        onClick={() => this.setState({addFavoriteChecked: !this.state.addFavoriteChecked})}
                      />
                      <Message
                        success
                        header='Added new recipe!'
                        content='Your new recipe will now be added to our library!'
                      />
                    </div>
                  </Form>
                </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.attemptAddNewRecipe}>
            SUBMIT <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return(
      <div>
        <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
        <NavBar
          path={this.props.match.path}
          onSearchResultSelect={this.handleResultSelect}>
          <div className='user-profile'> 
            <div className='banner-container'>
               <Card
                fluid
                image='../../images/recette_header_wide.png'
                header= {this.state.userdata.first_name}
                meta='Recetter'
                description= {this.state.userdata.biography}
              />
            </div>
            <div className='infoSection'>
              <Grid columns={3}  centered>
                <Grid.Column width={5}>
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
                <Grid.Column width = {5}>
                  <Segment basic>
                    <h2 className='info-section-headers'>My Activity</h2>
                    <Divider />
                    <div className='display-linebreak'></div>
                      <Feed>
                        {this.state.userActivity.map(activity => (
                          <Feed.Event>
                            <Feed.Content>
                              <Feed.Summary>
                                <div className='activity-feed-text'><Icon name='comment' color='teal' circular='true' size = 'large' />{activity.activity}</div>
                              </Feed.Summary>
                            </Feed.Content>
                          </Feed.Event>
                        ))}                      
                    </Feed>
                  </Segment>
                </Grid.Column>               
                 <Grid.Column width = {5}>
                  <Segment basic>
                    <h2 className='info-section-headers'>My Preferences</h2>
                    <Divider />
                      <Feed size='large'>
                        {this.state.userPreferences.map(preferences => (
                          <Feed.Event>
                            <Feed.Content>
                              <Feed.Summary>
                                <List animated verticalAlign='middle'>
                                  <List.Item>
                                  <List.Icon name='star' size='large' color='teal' circular='true' verticalAlign='middle' />
                                    <List.Content>
                                      <List.Header>
                                        <div className='activity-feed-text'>{preferences.title}</div>
                                      </List.Header>
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
              <h2 className='info-section-headers'>My Favorites</h2>
              <Divider />
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
              {ModalAddRecipe}
            </div>
          </div>
        </NavBar>
      </div>
    );
  }
}

export default UserProfilePage;