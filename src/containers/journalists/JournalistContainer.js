import React, { Component } from 'react';

class JournalistContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      journalist: null
    }
    this.url = props.url;
  }

  componentDidMount(){
    fetch(this.url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState({journalist: data})
    })
  }


  render(){
    return (
      <div>JournalistContainer</div>
    )
  }
}

export default JournalistContainer;
