import React, { Component } from 'react';
import { Button, Checkbox, Feed, Icon, List, Divider, Item, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/UserProfilePage.css';
import ClientTools from '../res/ClientTools';
import { Redirect, Link } from 'react-router-dom';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_data: null,
      userdata: {username:'',email:'',first_name:'',last_name:'',biography:''},
      userActivity: {activity:''},
      userFavorites: {},
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({session_data: this.props.location.state.session_data})
    }
  }

  componentDidMount(){
    if(this.props.location.state.session_data){
      this.getUserData();
      // this.getActivity();
      // this.getFavorites();
    }
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async getUserData() {
    let response = await ClientTools.getUserData({user_id:this.state.session_data.user_id, user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({userdata: response.data})
      }
    }
  }

  async getActivity() {
    let response = await ClientTools.getActivity({user_id:this.state.session_data.user_id, user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({userActivity: response.data})
      }
    }
  }

  
  async getFavorites() {
    let response = await ClientTools.getFavorites({user_id:this.state.session_data.user_id, user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({userFavorites: response.data})
      }
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
          <header className="Recette-header">
            <h1 className='app-title'>Recette</h1>
            <Button color='teal' onClick={this.AttemptLogout}>LOG OUT</Button>
          </header>
        </div>
        <div className='container'>
          <div className='body'>
            <h1 className='textStyle'>{this.state.userdata.first_name} {this.state.userdata.last_name}</h1>
            <div className='display-linebreak'></div>
            <div className='infoSection'>
              <Grid columns={3} relaxed>
                <Grid.Column width={5}>
                  <Segment basic>
                      <h2 className='textStyle'>My Info </h2>
                      <Divider />
                      <div className='display-linebreak'></div>
                      <div> {this.state.userdata.first_name} | {this.state.userdata.last_name} </div>
                      <div> {this.state.userdata.email} </div>
                      <div> @{this.state.userdata.username} </div>
                      <h3> Biography </h3>
                      <div> {this.state.userdata.biography} </div>
                  </Segment>
                </Grid.Column>
                <Grid.Column width = {5}>
                  <Segment basic>
                    <h2 className='textStyle'>My Activity</h2>
                    <Divider />
                    <div className='display-linebreak'></div>
                    
                      <Feed>
                        <Feed.Event>
                          <Feed.Label>
                           <img src='/assets/images/avatar/small/elliot.jpg' />
                          </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User>{this.state.userdata.username}</Feed.User> 
                              <div className='activity-feed'>posted activity</div>
                            <Feed.Date><div className='activity-feed'>1 Hour Ago</div></Feed.Date>
                          </Feed.Summary>
                          <Feed.Meta>
                            <Feed.Like>
                             <Icon color='teal' name='like' />
                              <div className='activity-feed'>4 Likes</div>
                            </Feed.Like>
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>

                      <Feed.Event>
                        <Feed.Label image='/assets/images/avatar/small/helen.jpg' />
                        <Feed.Content>
                          <Feed.Summary>
                            <a>{this.state.userdata.username}</a> <div className='activity-feed'>posted</div> <a>activity</a>
                            <Feed.Date><div className='activity-feed'>4 days ago</div> </Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra images>
                            <a><img src='/assets/images/wireframe/image.png' /></a>
                            <a><img src='/assets/images/wireframe/image.png' /></a>
                          </Feed.Extra>
                          <Feed.Meta>
                            <Feed.Like>
                              <Icon color='teal' name='like' />
                              <div className='activity-feed'>1 Like</div>
                            </Feed.Like>
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                    

                  </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Segment basic>
                    <h2 className='textStyle'>My Recipes</h2>
                    <Divider />
                      <div className='myRecipesList'>
                        <List ordered>
                          <List.Item as='a'>Favorite1</List.Item>
                          <List.Item as='a'>Favorite2</List.Item>
                          <List.Item as='a'>Favorite3</List.Item>
                          <List.Item as='a'>Neopolitan Ice Cream</List.Item>
                          <List.Item as='a'>Pavlova</List.Item>
                          <List.Item as='a'>Belgian French Fries</List.Item>
                        </List>
                      </div>
                  </Segment>
                </Grid.Column>
              </Grid>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;