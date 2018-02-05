import React, { Component } from 'react';
import Client from './Client';
import StackGrid from "react-stack-grid";
import Card from './Card';

const PostsData = [
  {
    "category": "News",
    "title": "CNN Acquire BEME",
    "text": "CNN purchased Casey Neistat's Beme app for $25million.",
    "image": "https://source.unsplash.com/user/erondu/600x400"
  },
  {
    "category": "Travel",
    "title": "Nomad Lifestyle",
    "text": "Learn our tips and tricks on living a nomadic lifestyle",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "Development",
    "title": "React and the WP-API",
    "text": "The first ever decoupled starter theme for React & the WP-API",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  },
  {
    "category": "News",
    "title": "CNN Acquire BEME",
    "text": "CNN purchased Casey Neistat's Beme app for $25million.",
    "image": "https://source.unsplash.com/user/erondu/600x400"
  },
  {
    "category": "Travel",
    "title": "Nomad Lifestyle",
    "text": "Learn our tips and tricks on living a nomadic lifestyle",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "Development",
    "title": "React and the WP-API",
    "text": "The first ever decoupled starter theme for React & the WP-API",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  }
]

// class Title extends Component {
//   render() {
//     return <section className="app-title">
//       <div className="app-title-content">
//         <h1>Latest News</h1>
//         <p>Covering March & April 2015</p>
//         <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank">Design from <i className="fa fa-dribbble"></i></a>
//       </div>
//     </section>
//   }
// }


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', data: [], posts: {}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({posts: PostsData});
  }

  componentDidMount(){
    this.getData();
  }

  async getData(){
    var data = await Client.getRecipes();
    this.setState({data: data.recipes});
  }

  render() {
    return (
      <div>
        <div className="images">
          <img src={'images/burger3.jpg'} />
        </div>
        <h2 className="recipe-header">Recipes</h2>
        <StackGrid
          columnWidth={300}>
          {this.state.data.map(recipe => (
            // <div>{recipe}</div>
            <Card details={{title:recipe,text:'description'}}/>
          ))}
        </StackGrid>
        
        {/*<TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        
        <StackGrid
          columnWidth={150}>
          <div className="app-card-list" id="app-card-list">
            {
              Object
              .keys(this.state.posts)
              .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
            }
          </div>

        </StackGrid>
        */}        
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

// class TodoList extends React.Component {
//   render() {
//     return (
//       <ul>
//         {this.props.items.map(item => (
//           <li key={item.id}>{item.text}</li>
//         ))}
//       </ul>
//     );
//   }
// }

export default Todo;