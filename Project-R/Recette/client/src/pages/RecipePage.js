import React, { Component } from 'react';
import '../layouts/RecipePage.css';
import ClientTools from '../utils/ClientTools';
import { Button, Comment, Form, Header, Grid, Segment, Divider, Modal, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';


class RecipePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			comments: [],
			reply: '',
			session_data: null,
			showPrompt: false,
			user_firstname: '',
		};
		this.SubmitComment=this.SubmitComment.bind(this);
		this.handleUserNameClick=this.handleUserNameClick.bind(this);
	}

	componentWillMount() {
		if(this.props.location.state){
			this.setState({session_data: this.props.location.state.session_data, user_firstname: this.props.location.state.user_firstname})
		}
		this.getRecipeData();
		this.getRecipeComments();
	}

	componentDidMount(){

	}

	async getRecipeData() {
		var data = await ClientTools.getRecipeByID(this.props.match.params.id);
		this.setState({data: [...this.state.data, data.recipeInfo]});
	}

	async getRecipeComments(){
		let data = await ClientTools.getComments(this.props.match.params.id);
		if(data!=null){
			this.setState({comments: data.comments});
		}
	}

	async SubmitComment() {
		if(this.state.session_data){
			let data = this.state.session_data;
			data.recipe_id = this.props.match.params.id;
			data.message = this.state.reply
			let response = await ClientTools.addComment(data);
			console.log(response);
			if(response!=null){
				if(response.code===1){
					this.setState({comments: [...this.state.comments, {user: this.state.user_firstname, message: data.message}]})
					//reset textarea
					this.setState({reply: ''})
				}
			}
		}
		else
			this.setState({showPrompt: true})
	}

	goToPage(page){
    this.setState({redirect: true, page: page})
  }

	handleUserNameClick(id) {
		this.goToPage(`/profiles/${id}`)
	}

	render() {
		if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page, state: { session_data: this.state.session_data, user_firstname: this.state.user_firstname}}} />;
    }

		return(
			<div className='container'>
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
					<Comment.Group>
						<Header as='h2' dividing>Comments</Header>
						{this.state.comments.map(comment => (
							<Comment>
					      <Comment.Content>
					        <Comment.Author as='a' onClick={() => this.handleUserNameClick(comment.id)}>{comment.user}</Comment.Author>
					        <Comment.Metadata>
					          <div>Today at 5:42PM</div>
					        </Comment.Metadata>
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
			</div>
		);
	}
}


export default RecipePage;