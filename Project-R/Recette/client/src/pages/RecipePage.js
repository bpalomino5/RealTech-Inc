import React, { Component } from 'react';
import '../layouts/RecipePage.css';
import DataStore from '../utils/DataStore';
import ClientTools from '../utils/ClientTools';
import NavBar from '../components/NavBar';
import { Button, Comment, Form, Header, Grid, Segment, Divider, Modal, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';



class RecipePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			recipe_data: [],
			comments: [],
			reply: '',
			session_data: null,
			showPrompt: false,
			user_firstname: '',
		};
		this.SubmitComment=this.SubmitComment.bind(this);
		this.updateActivity=this.updateActivity.bind(this);
		this.handleUserNameClick=this.handleUserNameClick.bind(this);
		this.handleResultSelect=this.handleResultSelect.bind(this);
	}

	componentWillMount() {
		let sessionData = DataStore.getSessionData('session_data');
		if(sessionData){
			this.setState({session_data: sessionData});
		}

		let userData = DataStore.getSessionData('user_data');
		if(userData){
			this.setState({user_firstname: userData.first_name});
		}

		this.getRecipeData();
		this.getRecipeComments();
	}

	async getRecipeData() {
		var data = await ClientTools.getRecipeByID(this.props.match.params.id);
		this.setState({recipe_data: [...this.state.recipe_data, data.recipeInfo]});
	}

	async getRecipeComments(){
		let data = await ClientTools.getComments(this.props.match.params.id);
		if(data!=null){
			this.setState({comments: data.comments});
		}
	}

	async SubmitComment() {
		if(this.state.session_data){
			let data = JSON.parse(JSON.stringify(this.state.session_data));
			data.recipe_id = this.props.match.params.id;
			data.message = this.state.reply
			let response = await ClientTools.addComment(data);
			// console.log(response);
			if(response!=null){
				if(response.code===1){
					this.updateActivity('Commented on recipe ' + this.state.recipe_data[0].name);
					this.setState({comments: [...this.state.comments, {user: this.state.user_firstname, message: data.message}], reply: ''})
				}
			}
		}
		else
			this.setState({showPrompt: true})
	}

	async updateActivity(message){
    let activityData = JSON.parse(JSON.stringify(this.state.session_data));
    activityData.message=message;
    // console.log(activityData);
    let response  = await ClientTools.addActivity(activityData);
    console.log(response);
  }

	goToPage(page){
    this.setState({redirect: true, page: page})
  }

	handleUserNameClick(id) {
		this.goToPage(`/profiles/${id}`)
	}

	handleResultSelect(id) {
    console.log(id);
  }

	render() {
		if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

		return(
			<div>
			  <Helmet bodyAttributes={{style: 'background-color : #2E2F2F'}}/>
				<NavBar
				  path={this.props.match.path}
					onSearchResultSelect={this.handleResultSelect}>
					{this.state.recipe_data.map(item => (
						<div className='body'>
							<h1 className='recipeHeader'>{item.name}</h1>
							<div className='imageContainer'>
								<img src={`../../${item.image_location}`} alt="recipe example" align="middle" />
							</div>
							<div className='infoSection'>
								<Grid columns={2} relaxed>
									<Grid.Column width={4}>
										<div className='ingredientSection'>
											<h2 className='iHeader'>Ingredients</h2>
											<Divider />
											{item.ingredients.map(i => (
												<div className='tStyles'>{i.quantity} {i.unit_name} {i.name}</div>
											))}
										</div>
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
					<Segment basic >
						<Comment.Group>
							<h2 className='commentHeader'>Comments</h2>
							<Divider />
							{this.state.comments.map(comment => (
								<Comment>
						      <Comment.Content>
						        <Comment.Author as='a' onClick={() => this.handleUserNameClick(comment.id)}>{comment.user}</Comment.Author>
						        <Comment.Text>{comment.message}</Comment.Text>
						      </Comment.Content>
						    </Comment>
							))}
							<Form reply>
					      <Form.TextArea 
					      	value={this.state.reply}
	                onChange={(e, {value}) => this.setState({reply: value})}
	              />
					      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.SubmitComment} />
					    </Form>
						</Comment.Group>
						</Segment>
					</div>
					<Modal open={this.state.showPrompt} basic size='small' closeOnDimmerClick={true}>
				    <Header icon='archive' content='User account is required' />
				    <Modal.Content>
				      <p>Hi! If you enjoy our content, then please sign in or create a user account in order to comment on this recipe. Thanks!</p>
				    </Modal.Content>
				    <Modal.Actions>
				      <Button color='green' inverted onClick={() => this.setState({showPrompt: false})}>
				        <Icon name='checkmark' /> Close
				      </Button>
				    </Modal.Actions>
				  </Modal>
			  </NavBar>
			</div>
		);
	}
}


export default RecipePage;