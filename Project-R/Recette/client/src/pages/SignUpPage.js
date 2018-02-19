import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/SignUpPage.css';

class SignUpPage extends Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return(
      <div className='signup-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        
        <div className="title-container">
        <header className="Recette-header">
          <h1 className='app-title'>Welcome to Recette</h1>
        </header>
        <p className="Recette">
        </p>
      </div>

        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              
              {' '}Create your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='First Name'
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                />
                 <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail'
                  
                />
                 <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                 <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                />

                <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>

                <Button color='green' fluid size='large'>Sign Up</Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href='login'>Log in</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignUpPage;