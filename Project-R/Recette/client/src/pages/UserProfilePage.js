import React, { Component } from 'react';
import { Button, Checkbox, List, Divider, Item, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/UserProfilePage.css';
import ClientTools from '../res/ClientTools';
import { Redirect, Link } from 'react-router-dom';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      session_data: null,
      userdata: {username:'',email:'',first_name:'',last_name:'',biography:''},
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({session_data: this.props.location.state.session_data})
    }
  }

  componentDidMount(){
    if(this.props.location.state.session_data)
      this.getUserData();
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
            <h1 className='textStyle'>{this.state.userdata.first_name}, {this.state.userdata.last_name}</h1>
            <div className='display-linebreak'></div>
            <div className='infoSection'>
              <Grid columns={2} relaxed>
                <Grid.Column width={5}>
                  <Segment basic>
                      <h2 className='textStyle'>My Info </h2>
                      <Divider />
                      <div className='display-linebreak'></div>
                      <div> {this.state.userdata.first_name} | {this.state.userdata.last_name} </div>
                      <div> {this.state.userdata.email} </div>
                      <div> @{this.state.userdata.username} </div>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={9}>
                  <Segment basic>
                    <h2 className='textStyle'>My Recipes</h2>
                    <Divider />
                      <div className='myRecipesList'>
                        <List ordered>
                          <List.Item as='a'>Pupusas</List.Item>
                          <List.Item as='a'>Enchiladas</List.Item>
                          <List.Item as='a'>Orange Chicken</List.Item>
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