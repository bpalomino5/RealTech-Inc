import React from 'react';
import { Button, Checkbox, List, Divider, Item, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/UserProfilePage.css';

const UserProfile = () => (
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
      </header>
       <p className="Recette">
       </p>
    </div>

  <div className='container'>
        <div className='topSection'>
        </div>
        
          <div className='body'>
            <h1 className='textStyle'>First, Last</h1>
            <div className='display-linebreak'></div>
            <div className='infoSection'>
              <Grid columns={2} relaxed>
                <Grid.Column width={5}>
                  <Segment basic>
                      <h2 className='textStyle'>My Info </h2>
                      <Divider />
                      <div className='display-linebreak'></div>
                      <div> First Name | Last Name </div>
                      <div> Email Address </div>
                      <div> @Username </div>
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
)

export default UserProfile