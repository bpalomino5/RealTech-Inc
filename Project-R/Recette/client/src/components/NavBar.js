import React, { Component } from 'react';
import { Search, Button, Image, Menu, Icon, Sidebar, Segment, Grid, Header, Responsive, Accordion} from 'semantic-ui-react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import DataStore from '../utils/DataStore';
import ClientTools from '../utils/ClientTools';
import '../layouts/NavBar.css';

class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state={
			session_data: null,
			first_name: '',
			searchData: [], 
			isloggedin: false,
			isLoading: false,
      results: [],
      value: '',
      visible: true,
      redirect: false, 
      page: null,
      mobileSearch: false,
      companyAccordian: false,
		};
		this.AttemptLogin=this.AttemptLogin.bind(this);
    this.AttemptLogout=this.AttemptLogout.bind(this);
    this.OpenProfilePage=this.OpenProfilePage.bind(this);
    this.openMenu=this.openMenu.bind(this);
    this.openMobileSearch=this.openMobileSearch.bind(this);
    this.closeMobileSearch=this.closeMobileSearch.bind(this);
    this.OpenHomePage=this.OpenHomePage.bind(this);
	}

	componentWillMount() {
		let sessionData = DataStore.getSessionData('session_data');
    if(sessionData) this.setState({session_data: sessionData});

		let recipes = DataStore.getData('recipes');
		let ingredients = DataStore.getData('ingredients');
		let styles = DataStore.getData('styles');

		if(ingredients && styles && recipes){
			recipes = recipes.concat(ingredients);
			recipes = recipes.concat(styles);
			this.setState({searchData: recipes})
		}
	}

	componentDidMount() {
		if(this.state.session_data){
			let userData = DataStore.getSessionData('user_data');
			if(userData)
				this.setState({first_name: userData.first_name, isloggedin: true});
			else
				this.getUserData();
		}
		
	}

	async getUserData() {
    let response = await ClientTools.getUserData({user_id:this.state.session_data.user_id, user_token: this.state.session_data.user_token});
    console.log(response);
    if(response!=null){
      if(response.code===1){
        this.setState({first_name: response.data.first_name, isloggedin: true});
        DataStore.storeSessionData('user_data', response.data);
      }
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

	handleResultSelect = (e, { result }) => {
		console.log(result);
		if(result.style_id) this.props.onSearchResultSelect('style',result.style_id);
		if(result.ingredient_id) this.props.onSearchResultSelect('ingredient',result.ingredient_id)
		if(result.id) this.props.onSearchResultSelect('recipe_name', result.id)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.searchData, isMatch),
      })
    }, 500)
  }

  goToPage(page){
    this.setState({redirect: true, page: page})
  }

  AttemptLogin(){
    this.goToPage('/login')
  }

  OpenProfilePage() {
  	if(this.props.path==='/profiles/:id')
  		window.location.reload(); //reload profile page
  	else
    	this.goToPage(`/profiles/${this.state.session_data.user_id}`)
  }

  OpenHomePage(){
  	if(this.props.path==='/')
    	window.location.reload();
    else
    	this.goToPage('/')
  }

  openMenu(){
    this.setState({visible: !this.state.visible})
  }

  resetAll() {
   	this.setState({session_data: null, first_name: '', isloggedin: false});
   	DataStore.removeSessionData('session_data');
   	DataStore.removeSessionData('user_data');
  }

  async AttemptLogout() {
    if(this.state.session_data!=null){
      let response = await ClientTools.logout({user_token: this.state.session_data.user_token});
      console.log(response);
      if(response!=null){
        if(response.code===1){
          this.resetAll()
        }
      }
    }
  }

  openMobileSearch() {
  	this.setState({mobileSearch: true})
  }

  closeMobileSearch() {
  	this.setState({mobileSearch: false});
  }

  toggleCompanyAccordian = () => {
  	this.setState({companyAccordian: !this.state.companyAccordian})
  }


	render() {
		if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

		return(
			<div>
				{/*Computer*/}
				<Responsive minWidth={568}>
				<Menu fixed='top'>
		      <div className="headerContainer">
		        <div className="logoBox" onClick={this.OpenHomePage}>
		          <h1>Recette</h1>
		        </div>
		        <Search 
		            className="searchBox"
		            loading={this.state.isLoading}
		            onResultSelect={this.handleResultSelect}
		            onSearchChange={this.handleSearchChange}
		            results={this.state.results}
		            value={this.state.value}
		            aligned='right'
		        />
		        <div className="buttonBox">
		          <div hidden={!this.state.isloggedin} className="profileBox" onClick={this.OpenProfilePage}>
		            <Image src='https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' />
		            <h2>{this.state.first_name}</h2>
		          </div>
		          <div hidden={this.state.isloggedin}>
		            <Button color='teal' onClick={this.AttemptLogin}>SIGN UP / LOG IN</Button>
		          </div>
		        </div>
		        <Menu.Item onClick={this.openMenu}>
		          <Icon name='bars' size='large' />
		        </Menu.Item>
		      </div>
		    </Menu>
		    <div className="navBoundsBox" />
		    <Sidebar.Pushable>
		      <Sidebar as={'div'} animation='overlay' width='very wide' visible={!this.state.visible} direction='top' icon='labeled' inverted={"true"}>
		        <Segment raised inverted  textAlign='center'>
		           <Grid columns={3} divided inverted verticalAlign='middle'>
		            <Grid.Row>
		              <Grid.Column>
		                <Header size='large' inverted color='grey'>Company</Header>
		                <p>About Recette</p>
		                <p>The Team</p>
		                <p>Contact Us</p>
		              </Grid.Column>
		              <Grid.Column>
		                <Header size='large' inverted color='grey'>Media</Header>
		              </Grid.Column>
		              <Grid.Column>
		                <Header size='large' inverted color='grey'>Log out</Header>
		                <Icon name='power' size='large' inverted link onClick={this.AttemptLogout} />
		              </Grid.Column>
		            </Grid.Row>
		          </Grid>
		        </Segment>
		      </Sidebar>
		      {this.props.children}
		    </Sidebar.Pushable>
		    </Responsive>
		    
		  	{/*MOBILE*/}
		    <Responsive maxWidth={567}>
			    <Sidebar.Pusher>
				    <Menu fixed='top' borderless>
				      {!this.state.mobileSearch && <div className="headerContainer">
				        <div className="logoBox" onClick={this.OpenHomePage}>
				          <h1>Recette</h1>
				        </div>
				        <div className="buttonBox">
					        <Menu.Item onClick={this.openMobileSearch}>
					        	<Icon name='search' size='large' />
					        </Menu.Item>
					        <Menu.Item onClick={this.openMenu}>
					          <Icon name='bars' size='large' />
					        </Menu.Item>
				        </div>
				       </div>
				      }
				    	{this.state.mobileSearch && <div className="headerContainer">
				    		<Menu.Item onClick={this.closeMobileSearch}>
				    			<Icon name='chevron left' size='large' />
				    		</Menu.Item>
				        <Search 
				            className="searchBox"
				            loading={this.state.isLoading}
				            onResultSelect={this.handleResultSelect}
				            onSearchChange={this.handleSearchChange}
				            results={this.state.results}
				            value={this.state.value}
				            aligned='right'
				        />
				      	</div>
				    	}
					  </Menu>
				  	<div className="navBoundsBox" />
			      {this.props.children}
				  </Sidebar.Pusher>
		      <Sidebar as={Segment} animation='overlay' vertical width='wide' visible={!this.state.visible} direction='left' icon='labeled' inverted={"true"}>
						<div className="mobileButtonBox">
		          <div hidden={!this.state.isloggedin} className="profileBox" onClick={this.OpenProfilePage}>
		            <Image src='https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' />
		            <h2>{this.state.first_name}</h2>
		          </div>
		          <div hidden={this.state.isloggedin}>
		            <Button color='teal' onClick={this.AttemptLogin}>SIGN UP / LOG IN</Button>
		          </div>
		          <div className="mobileCloseMenu" onClick={this.openMenu}>
		          	<Icon name='cancel' size='large' />
		          </div>
		        </div>
		      	<Menu inverted fluid vertical>
			      	<Menu.Item link>
			      		<Icon name='home' />Home
			      	</Menu.Item>
			      	<Accordion as={Menu.Item} inverted onClick={this.toggleCompanyAccordian}>
			      		<Accordion.Title>
			      			<Icon name='dropdown' />Company
			      		</Accordion.Title>
			      		<Accordion.Content active={this.state.companyAccordian}>
			      			<p>About Recette</p>
			      			<p>The Team</p>
			      			<p>Contact Us</p>
			      		</Accordion.Content>
			      	</Accordion>
			      	<Menu.Item>
			      		Media
			      	</Menu.Item>
			      	<Menu.Item link onClick={this.AttemptLogout}>
			      		Log out<Icon name='power' inverted link />
			      	</Menu.Item>
		      	</Menu>
		      </Sidebar>			      
		    </Responsive>
	    </div> 
		)
	}
}

export default NavBar