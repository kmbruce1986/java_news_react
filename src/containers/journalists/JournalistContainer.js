import React, { Component } from 'react';

class JournalistContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      journalist: null
    }
    this.url = props.url;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if (this.url != null) {
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({journalist: data})
      })
    }
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({journalist: name[value]});
  }

  handleSubmit(event){
    event.preventDefault();
    let requestType;
    let journalistId = null;
    let fetchURL = "/journalists"
    if (this.state.journalist != null) {
      requestType = 'PUT'
      journalistId = this.state.journalist.id
      fetchURL = "/journalists/" + journalistId
    } else {
      requestType = 'POST'
    }
    console.log(fetchURL);
    fetch(fetchURL,{
      method: requestType,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "firstName": event.target.firstName.value,
        "lastName": event.target.lastName.value,
        "jobTitle": event.target.jobTitle.value,
        "portraitURL": event.target.portraitURL.value,
        "bio": event.target.bio.value,
        "twitterHandle": event.target.twitterHandle.value
      })
    }).then(() => {
      window.location = "/";
    })
  }


  render(){
    if (!this.state.journalist) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="First Name" name="firstName"/>
            <input type="text" placeholder="Last Name" name="lastName"/>
            <input type="text" placeholder="Job Title" name="jobTitle"/>
            <input type="text" placeholder="Portrait Link" name="portraitURL"/>
            <textarea placeholder="Bio" name="bio" cols="30" rows="10"/>
            <input type="text" placeholder="Twitter Handle" name="twitterHandle"/>
            <button type="submit">Save</button>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.journalist.firstName} onChange={this.handleChange} name="firstName"/>
            <input type="text" value={this.state.journalist.lastName} onChange={this.handleChange} name="lastName"/>
            <input type="text" value={this.state.journalist.jobTitle} onChange={this.handleChange} name="jobTitle"/>
            <input type="text" value={this.state.journalist.portraitURL} onChange={this.handleChange} name="portraitURL"/>
            <textarea value={this.state.journalist.bio} onChange={this.handleChange} name="bio" cols="30" rows="10"/>
            <input type="text" value={this.state.journalist.twitterHandle} onChange={this.handleChange} name="twitterHandle"/>
            <button type="submit">Save</button>
          </form>
        </div>
      )
    }
  }
}

export default JournalistContainer;
