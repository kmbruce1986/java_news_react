import React, { Component } from 'react';


class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user
    }
    this.handleToggle = this.props.handleToggle.bind(this);
  }

  handleToggle(event){
    console.log(event);
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
    </div>
  )
  }
}

export default NavBar;
