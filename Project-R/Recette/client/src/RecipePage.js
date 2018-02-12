import React, { Component } from 'react';
import './RecipePage.css';
import Client from './Client';
import { Divider } from 'semantic-ui-react';


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
					   	<h2 className='textStyle'>Directions </h2>
					    <Divider />
							<div className='display-linebreak'>{item.instruction}</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}


export default RecipePage;