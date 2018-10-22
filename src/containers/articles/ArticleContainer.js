import React, {Component} from 'react';
import ArticleList from './ArticleList.js';

class ArticleContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      articles: []
    }

    this.url = props.url;
  }

  componentDidMount(){
    fetch(this.url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState({articles: data})
    })
  }

  render(){
    return(
      <div>ArticleContainer
        <ArticleList articles={this.state.articles} user={this.state.isAdmin}/>
      </div>
    )
  }


}




export default ArticleContainer;
