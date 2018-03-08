import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/LoginPage.css';
import ClientTools from '../utils/ClientTools';
import DataStore from '../utils/DataStore';
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMessage: '',
      redirect: false,
      page: '',
      session_data: null,
    };
    this.AttemptLogin=this.AttemptLogin.bind(this);
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async AttemptLogin() {
    let response = await ClientTools.login({user_name:this.state.username, user_password: this.state.password});
    // console.log(response);
    if(response!=null){
      if(response.code===1){ //login successful
        DataStore.storeSessionData('session_data', response.data);
        this.goToPage('/')
      }
      else{
        this.setState({error:true, errorMessage: response.message})
      }
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }
    return(
      <div className='login-form'>
        <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
        <Grid
          textAlign='center'
          style={{ height: '100%'}}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center' inverted>
              Log-in to your account
            </Header>
            <Form 
              size='large'
              error={this.state.error}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  value={this.state.username}
                  onChange={(e, {value}) => this.setState({username: value})}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={(e, {value}) => this.setState({password: value})}
                />

                <Button color='teal' fluid size='large' onClick={this.AttemptLogin}>Login</Button>
              </Segment>
              <Message
                error
                header='Sorry!'
                content={this.state.errorMessage}
              />
            </Form>
            <Message>
              New to us? <Link to="/signup" replace>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginPage;