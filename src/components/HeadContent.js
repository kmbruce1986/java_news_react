import React, {Component} from 'react';
import ArticleList from '../containers/articles/ArticleList.js';

class HeadContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin = this.props.user,
      articles = [],
      headContentType = null
    }
  }

// this will need to have three if statements to account for all three options - viewing all articles, all articles by category, and all articles by journalist.
  componentDidMount(){
    fetch(this.url)
    .then((res) => res.json())
    .then((data) => {
      if (data UNSURE WHAT GOES HERE){
      this.setState({articles: data});
      this.setState({headContentType: ALL})
    } else if (data UNSURE WHAT GOES HERE) {
      this.setState({articles: data});
      this.setState({headContentType: CATEGORY})
    } else {
      this.setState({articles: data});
      this.setState({headContentType: JOURNALIST})
    }
  })
  }



  render(){
    return (
      <div>HeadContent
        <ArticleList articles={this.state.articles}/>
      </div>
    )
  }
}

export default HeadContent;
