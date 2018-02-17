import React, { Component } from 'react';
import './RecipePage.css';
import Client from './Client';
import { Button, Comment, Form, Header, Grid, Segment, Divider } from 'semantic-ui-react';


class RecipePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.getRecipeData();
	}

	async getRecipeData() {
		var data = await Client.getRecipeByID(this.props.match.params.id);
		this.setState({data: [...this.state.data, data.recipeInfo]});
	}

	render() {
		const CommentExampleComment = (
		  <Comment.Group>
		    <Header as='h2' dividing>Comments</Header>

		    <Comment>
		      <Comment.Content>
		        <Comment.Author as='a'>Matt</Comment.Author>
		        <Comment.Metadata>
		          <div>Today at 5:42PM</div>
		        </Comment.Metadata>
		        <Comment.Text>How artistic!</Comment.Text>
		        <Comment.Actions>
		          <Comment.Action>Reply</Comment.Action>
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>

		    <Comment>
		      
		      <Comment.Content>
		        <Comment.Author as='a'>Elliot Fu</Comment.Author>
		        <Comment.Metadata>
		          <div>Yesterday at 12:30AM</div>
		        </Comment.Metadata>
		        <Comment.Text>
		          <p>This has been very useful for my research. Thanks as well!</p>
		        </Comment.Text>
		        <Comment.Actions>
		          <Comment.Action>Reply</Comment.Action>
		        </Comment.Actions>
		      </Comment.Content>
		      <Comment.Group>
		        <Comment>
		          
		          <Comment.Content>
		            <Comment.Author as='a'>Jenny Hess</Comment.Author>
		            <Comment.Metadata>
		              <div>Just now</div>
		            </Comment.Metadata>
		            <Comment.Text>
		              Elliot you are always so right :)
		            </Comment.Text>
		            <Comment.Actions>
		              <Comment.Action>Reply</Comment.Action>
		            </Comment.Actions>
		          </Comment.Content>
		        </Comment>
		      </Comment.Group>
		    </Comment>

		    <Comment>
		      
		      <Comment.Content>
		        <Comment.Author as='a'>Joe Henderson</Comment.Author>
		        <Comment.Metadata>
		          <div>5 days ago</div>
		        </Comment.Metadata>
		        <Comment.Text>
		          Dude, this is awesome. Thanks so much
		        </Comment.Text>
		        <Comment.Actions>
		          <Comment.Action>Reply</Comment.Action>
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>

		    <Form reply>
		      <Form.TextArea />
		      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
		    </Form>
		  </Comment.Group>
		);

		return(
			<div className='container'>
				<div className='topSection'>
				</div>
				{this.state.data.map(item => (
					<div className='body'>
						<h1 className='textStyle'>{item.name}</h1>
						<div className='imageContainer'>
							<img src={`../../${item.image_location}`} alt="recipe example" align="middle" />
						</div>
						<div className='infoSection'>
							<Grid columns={2} relaxed>
								<Grid.Column width={4}>
									<Segment basic>
										<h2 className='textStyle'>Ingredients</h2>
										<Divider />
										{item.ingredients.map(i => (
											<div className='ingredientTextStyle'>{i.quantity} {i.unit_name} {i.name}</div>
										))}
									</Segment>
								</Grid.Column>
								<Grid.Column width={9}>
									<Segment basic>
									   	<h2 className='textStyle'>Directions </h2>
									    <Divider />
											<div className='display-linebreak'>{item.instruction}</div>
									</Segment>
								</Grid.Column>
							</Grid>
						</div>
					</div>
				))}
				<div className='commentSection'>
					{CommentExampleComment}
				</div>
			</div>
		);
	}
}


export default RecipePage;