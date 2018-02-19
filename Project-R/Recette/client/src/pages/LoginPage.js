import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/LoginPage.css';
import ClientTools from '../res/ClientTools';
import { Redirect } from 'react-router-dom';


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
      data: null,
    };
    this.AttemptLogin=this.AttemptLogin.bind(this);
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async AttemptLogin() {
    let response = await ClientTools.login({user_name:this.state.username, user_password: this.state.password});
    console.log(response);
    if(response!=null){
      if(response.code===1){ //login successful
        this.setState({data: response.data})
        this.goToPage('/')
      }
      else{
        this.setState({error:true, errorMessage: response.message})
      }
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: {isloggedin: true, data: this.state.data}}} />;
    }
    return(
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%'}}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
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
              New to us? <a href='signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginPage;