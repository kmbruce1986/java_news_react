import React, { Component } from 'react';

class ArticleJournalist extends Component {

  constructor(props){
    super(props)

    this.makeDropDown = this.makeDropDown.bind(this);
    this.getSelectedHyperlink = this.getSelectedHyperlink.bind(this);
  }

getSelectedHyperlink(articleJournalist){

  let selectedHyperlink = '';

  this.props.journalists.map((journalist) => {

    if (journalist.id == articleJournalist.id){
      selectedHyperlink = journalist._links.self.href;
    }

    if (journalist._links.self.href == articleJournalist){
      selectedHyperlink = journalist._links.self.href ;
    }

  })

  return selectedHyperlink;

}

makeDropDown(){

  if (this.props.journalists && this.props.articleJournalist){

    const journalists = this.props.journalists.map((journalist) => {
      return(
        <option
          key={journalist.id}
          value={journalist._links.self.href}>
          {journalist.firstName} {journalist.lastName}
        </option>
      )
    })

    return (

        <select
          name="journalist"
          value={this.getSelectedHyperlink(this.props.articleJournalist)}
          onChange={this.props.handleJournalistSelect}
          >
          <option value="default">-- Select Journalist --</option>
          {journalists}
        </select>
      
    )

  } else if (this.props.journalists) {

    const journalists = this.props.journalists.map((journalist) => {
      return(
        <option
          key={journalist.id}
          value={journalist._links.self.href}>
          {journalist.firstName} {journalist.lastName}
        </option>
      )
    })

    return (
      <label>Journalist
        <select
          name="journalist"
          onChange={this.props.handleJournalistSelect}
          >
          <option value="default">-- Select Journalist --</option>
          {journalists}
        </select>
      </label>
    )


  } else {
    return (
      <label>Journalist
        <select name="journalist">
          <option value="default">-- Loading --</option>
        </select>
      </label>
    )
  }

}

  render(){

    return (
      <div className="article-journalist">
        {this.makeDropDown()}
      </div>
    )
  }

}

export default ArticleJournalist;
