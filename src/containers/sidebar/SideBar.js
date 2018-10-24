import React, { Component } from 'react';

class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      journalists: this.props.journalists
    }
  }

  render(){
    const journalists = this.state.journalists.map((journalist) => {
      return(
        <div>
          <a href={"/journalists/" + journalist.id}>{journalist.firstName} {journalist.lastName}</a>
        </div>
      )
    })
      return(
      <div className="sidebar">
        <h2>Journalists</h2>
        {journalists}
      </div>
    )
  }
}

export default SideBar;
