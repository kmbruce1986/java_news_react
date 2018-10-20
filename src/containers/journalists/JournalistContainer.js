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
    if (this.url != null) {
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({journalist: data})
      })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    let requestType;
    if (JournalistContainer.url != null) {
      requestType = 'PUT'
    } else {
      requestType = 'POST'
    }
    fetch("/journalists",{
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
            <textarea placeholder="Bio" name="bio" cols="30" rows="10"></textarea>
            <input type="text" placeholder="Twitter Handle" name="twitterHandle"/>
            <button type="submit">Save</button>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>
          edit
        </div>
      )
    }
  }
}

export default JournalistContainer;
