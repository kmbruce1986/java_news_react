import React, { Component } from 'react';
import Category from '../../components/categories/Category.js';
import {Link} from 'react-router-dom';


class NavBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      categories: this.props.categories
    }
    this.handleToggle = this.props.handleToggle.bind(this);
  }

  render(){

    return (
      <header className="header">
        <div className="logo">
          <a  href="/"><img className="logo" src="/SGNN.png" alt="SGNNlogo"/></a>
        </div>
        <nav className="nav">
          <Category categories={this.state.categories}></Category>
        </nav>
        <div className="login">
          <label className="switch">
            <input
              type="checkbox"
              value={this.state.isAdmin}
              checked={this.props.user === true ? "checked" : ""}
              onChange={this.handleToggle}/>
              <br/>
              <span className="slider round"/>
              <a href="/articles/new">New Article</a>
              <br/>

            </label>
            <a href="/journalist/new">New Journalist</a>
          </div>
        </header>
      )
    }
  }

  export default NavBar;
