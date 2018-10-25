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
        <div className="sbjourno-list">
          <a href={"/journalists/" + journalist.id}>{journalist.firstName} {journalist.lastName}</a>
        </div>
      )
    })
    return(
      <div className="sidebar">
        <div className="journo-list">
          <h2>Journalists</h2>
          {journalists}
        </div>
        <br/>
        <div className="weather">
          <a class="weatherwidget-io" href="https://forecast7.com/en/55d86n4d25/glasgow-city/" data-label_1="GLASGOW CITY" data-label_2="WEATHER" data-theme="original" >GLASGOW CITY WEATHER</a>

        </div>
      </div>
      )

    }
  }

  export default SideBar;
