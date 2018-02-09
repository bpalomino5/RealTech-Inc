import React, { Component } from 'react';
import './RecipePage.css';
import Client from './Client';
import { Image } from 'semantic-ui-react';


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
		// if(this.props.location.state){
			var data = await Client.getRecipeByID(this.props.match.params.id);
			// console.log(data)
			this.setState({data: [...this.state.data, data.recipeInfo]});
			// console.log(this.state.data);
		// }
	}

	render() {
		return(
			<div className='body'>
				{this.state.data.map(item => (
					<div>
						<h2>{item.name}</h2>
						<Image src={`../../${item.image_location}`} size='large'/>
						<br></br>
						<h3>Instructions</h3>
						<div className='display-linebreak'>{item.instruction}</div>
					</div>
				))}
			</div>
		);
	}
}


export default RecipePage;