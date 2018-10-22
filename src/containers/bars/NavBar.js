import React, { Component } from 'react';
import Category from '../../components/categories/Category.js';


class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      categories: this.props.categories
    }
    this.handleToggle = this.props.handleToggle.bind(this);
  }

  handleToggle(event){
    this.props.handleToggle();
    this.setState(prevState => {
      return {
        isAdmin: !prevState.isAdmin
      }
    })
  }

  render(){

    return (
    <div>
      <input type="checkbox" value={this.state.isAdmin} checked={this.state.isAdmin?"checked":""} onChange={this.handleToggle}/>
      <Category categories={this.state.categories}></Category>
    </div>
  )
  }
}

export default NavBar;
