import React, { Component } from 'react';
import { Search, Button, Image, Menu, Icon, Sidebar, Segment, Grid, Header} from 'semantic-ui-react';
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
			ingredients: [],
			isloggedin: false,
			isLoading: false,
      results: [],
      value: '',
      visible: true,
      redirect: false, 
      page: null,
		};
		this.AttemptLogin=this.AttemptLogin.bind(this);
    this.AttemptLogout=this.AttemptLogout.bind(this);
    this.OpenProfilePage=this.OpenProfilePage.bind(this);
    this.openMenu=this.openMenu.bind(this);
	}

	componentWillMount() {
		let sessionData = DataStore.getSessionData('session_data');
    if(sessionData){
      this.setState({session_data: sessionData});
    }

		let ingredientsData = DataStore.getData('ingredients');
		if(ingredientsData){
			this.setState({ingredients: ingredientsData});
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
		this.props.onSearchResultSelect(result.id)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.ingredients, isMatch),
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
    this.goToPage(`/profiles/${this.state.session_data.user_id}`)
  }

  refreshPage(){
    window.location.reload();
  }

  openMenu(){
    this.setState({visible: !this.state.visible})
  }

  resetAll() {
   	this.setState({session_data: null, first_name: '', isloggedin: false});
   	DataStore.removeSessionData('session_data');
   	DataStore.removeSessionData('user_data');
    // this.props.history.replace({
    //   pathname: this.props.location.pathname,
    //   state: {}
    // });
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

	render() {
		if(this.state.redirect){
      return <Redirect push to={{pathname: this.state.page}} />;
    }

		return(
			<div>
				<Menu fixed='top'>
		      <div className="headerContainer">
		        <div className="logoBox" onClick={this.refreshPage}>
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
	    </div> 
		)
	}
}

export default NavBar