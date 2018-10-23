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

  // handleToggle(event){
  //
  //   this.props.handleToggle();
  //   this.setState(prevState => {
  //     console.log("handleToggle", prevState.isAdmin);
  //     return {
  //       isAdmin: !prevState.isAdmin
  //     }
  //   })
  //
  // }

  render(){

    return (
    <header>
      <label className="switch">
      <input
        type="checkbox"
        value={this.state.isAdmin}
        checked={this.props.user === true ? "checked" : ""}
        onChange={this.handleToggle}/>
      <span className="slider round"/>
      </label>
      <Category categories={this.state.categories}></Category>
    </header>
  )
  }
}

export default NavBar;
