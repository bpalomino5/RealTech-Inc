import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/SignUpPage.css';
import ClientTools from '../res/ClientTools';
import { Redirect } from 'react-router-dom';

class SignUpPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      cpassword: '',
      error: false,
      errorMessage: '',
      redirect: false,
      page: '',
      checked: false,
    };
    this.AttemptCreateUser=this.AttemptCreateUser.bind(this);
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  async AttemptCreateUser() {
    if(this.state.checked){
      if(this.state.username && this.state.password && this.state.firstname && this.state.lastname && this.state.email){
        if(this.state.password === this.state.cpassword){
          let data = {user_name: this.state.username, user_password: this.state.password, user_email: this.state.email, firstname: this.state.firstname, lastname: this.state.lastname};
          let response = await ClientTools.createUser(data);
          console.log(response);
          if(response!=null){
            if(response.code===1){
              this.goToPage('/login')
            }
            else this.setState({error:true, errorMessage: response.message})
          }
        }
        else this.setState({error:true, errorMessage: 'Passwords do not match!'})
      }
      else this.setState({error:true, errorMessage: 'Please fill in all areas of the form.'})
    }
    else this.setState({error:true, errorMessage: 'Please agree to terms and conditions.'})
  }
  
  render(){
    if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

    return(
      <div className='signup-form'>
        <div className="title-container">
          <header className="Recette-header">
            <h1 className='app-title'>Welcome to Recette</h1>
          </header>
        </div>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Create your account
            </Header>
            <Form 
              size='large'
              error={this.state.error}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='First Name'
                  value={this.state.firstname}
                  onChange={(e, {value}) => this.setState({firstname: value})}
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                  value={this.state.lastname}
                  onChange={(e, {value}) => this.setState({lastname: value})}
                />
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
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail'
                  value={this.state.email}
                  onChange={(e, {value}) => this.setState({email: value})}
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
                 <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  value={this.state.cpassword}
                  onChange={(e, {value}) => this.setState({cpassword: value})}
                />

                <Form.Field>
                  <Checkbox 
                    label='I agree to the Terms and Conditions' 
                    checked={this.state.checked}
                    onClick={() => this.setState({checked: !this.state.checked})}
                    />
                </Form.Field>

                <Button color='teal' fluid size='large' onClick={this.AttemptCreateUser}>Sign Up</Button>
              </Segment>
              <Message
                error
                header='Sorry!'
                content={this.state.errorMessage}
              />
            </Form>
            <Message>
              Already have an account? <Button basic color='teal' size='small' onClick={() => this.goToPage('/login')}>Log in</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignUpPage;