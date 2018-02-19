import React from 'react';
import { Button, Checkbox, Item, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import '../layouts/SignUpPage.css';

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


       <Item.Group>
    <Item>
      <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>First, Last</Item.Header>
        <Item.Meta>@username</Item.Meta>
        <Item.Meta>@email</Item.Meta>
        <Item.Description>
          
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    
  </Item.Group>
  
  </div>
)

export default UserProfile