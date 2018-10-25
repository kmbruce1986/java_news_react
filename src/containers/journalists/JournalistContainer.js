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
    if (this.url !== "/journalists") {
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
    let tempJournalist = {...this.state.journalist};
    tempJournalist[name] = value;
    this.setState({journalist: tempJournalist});
  }

  handleSubmit(event){
    event.preventDefault();
    let requestType;
    let journalistId = null;
    if (this.state.journalist != null) {
      requestType = 'PUT'
    } else {
      requestType = 'POST'
    }
    fetch(this.url,{
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

    if (this.props.user){
      if (!this.state.journalist) {
        return (
          <div className="addjourno">
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="First Name" name="firstName"/>
              <br/>
              <input type="text" placeholder="Last Name" name="lastName"/>
              <br/>
              <input type="text" placeholder="Job Title" name="jobTitle"/>
              <br/>
              <textarea placeholder="Bio" name="bio" cols="30" rows="10"/>
              <br/>
              <input type="text" placeholder="Twitter Handle" name="twitterHandle"/>
              <br/>
              <button type="submit">Save</button>
            </form>
          </div>
        )
      }
      else {
        return (
          <div className="addjourno">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.journalist.firstName} onChange={this.handleChange} name="firstName"/>
              <br/>
              <input type="text" value={this.state.journalist.lastName} onChange={this.handleChange} name="lastName"/>
              <br/>
              <input type="text" value={this.state.journalist.jobTitle} onChange={this.handleChange} name="jobTitle"/>
              <br/>
              <textarea value={this.state.journalist.bio} onChange={this.handleChange} name="bio" cols="30" rows="10"/>
              <br/>
              <input type="text" value={this.state.journalist.twitterHandle} onChange={this.handleChange} name="twitterHandle"/>
              <br/>
              <button type="submit">Save</button>
            </form>
          </div>
        )
      }
    }
    else {
      return (
      <div>Admin-mode</div>
    )
    }
  }
}

export default JournalistContainer;
