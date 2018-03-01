import React, { Component } from 'react';
import { Button, Feed, Card, Icon, List, Divider, Grid, Segment } from 'semantic-ui-react';
import '../layouts/UserProfilePage.css';
import ClientTools from '../utils/ClientTools';
import { Redirect, Link } from 'react-router-dom';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_data: {user_id: '', user_token: ''},
      userdata: {username:'',email:'',first_name:'',last_name:'',biography:''},
      userActivity: [],
      userFavorites: [],
      userPreferences: [],
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({session_data: this.props.location.state.session_data})
    }
  }

  componentDidMount(){
    this.getPublicUserData();
    this.getActivity();
    this.getFavorites();
    this.getPreferences();
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
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
  render() {
    if(this.state.redirect){
      return <Redirect to={{pathname: this.state.page, state: {isloggedin: false}}} />;
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
                <h2 className='info-section-headers'>My Recipes</h2>
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
      </div>
    );
  }
}

export default UserProfilePage;