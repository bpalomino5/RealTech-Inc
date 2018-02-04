import React, { Component } from 'react';
import Client from './Client';
import StackGrid from "react-stack-grid";


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', data: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <h3>Recipes</h3>
        <StackGrid
          columnWidth={150}>
          {this.state.data.map(recipe => (
            <div>{recipe}</div>
          ))}
        </StackGrid>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
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

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default Todo;