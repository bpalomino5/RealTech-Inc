import React, { Component } from 'react';
import { Button, Checkbox, List, Divider, Item, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/UserProfilePage.css';
import ClientTools from '../res/ClientTools';
import { Redirect } from 'react-router-dom';

class UserProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
    };

    this.AttemptLogout=this.AttemptLogout.bind(this);
  }

  componentWillMount(){
    if(this.props.location.state){
      this.setState({data: this.props.location.state.data})
    }
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async AttemptLogout() {
    let response = await ClientTools.logout({user_token: this.state.data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.goToPage('/')
      }
    }
  }
  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: {isloggedin: false}}} />;
    }
    return(
      <div className='user-profile'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.UserProfile {
            height: 100%;
          }
        `}</style>
        
       <div className="title-container">
          <header className="Recette-header">
          <h1 className='app-title'>Recette</h1>
          <Button color='teal' onClick={this.AttemptLogout}>LOG OUT</Button>
          </header>
           <p className="Recette">
           </p>
        </div>

      <div className='container'>
            <div className='topSection'>
            </div>
            
              <div className='body'>
                <h1 className='textStyle'>{this.state.data.first_name}, {this.state.data.last_name}</h1>
                <div className='display-linebreak'></div>
                <div className='infoSection'>
                  <Grid columns={2} relaxed>
                    <Grid.Column width={5}>
                      <Segment basic>
                          <h2 className='textStyle'>My Info </h2>
                          <Divider />
                          <div className='display-linebreak'></div>
                          <div> {this.state.data.first_name} | {this.state.data.last_name} </div>
                          <div> {this.state.data.email} </div>
                          <div> @{this.state.data.username} </div>
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