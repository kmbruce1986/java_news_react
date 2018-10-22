import React, {Component} from 'react';
import ArticleList from '../containers/articles/ArticleList.js';
import ArticleHead from './heads/ArticleHead.js';
import CategoryHead from './heads/CategoryHead.js';
import JournalistHead from './heads/JournalistHead.js';

class HeadContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      article: this.props.article,
      headContentType: null
    }


  }
  //
  // componentDidMount(){
  //   fetch(this.url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (this.props.type === 'articles'){
  //     this.setState({articles: data});
  //     this.setState({headContentType: "toparticle"})
  //   } else if (this.props.type === 'categories') {
  //     this.setState({articles: data});
  //     this.setState({headContentType: "category"})
  //   } else{
  //     this.setState({articles: data});
  //     this.setState({headContentType: "journalist"})
  //   }
  // })
  // }



  render(){
    console.log(this.state.article);
    //const output = this.determineOutput();

    // let article = null;
    // if(this.state.articles.length > 0){
    //   article = this.state.articles[0];
    // }

return (
  <
)

    // if (this.state.headContentType === "toparticle"){
    //   return (<ArticleHead article={article}/>);
    // } else if (this.state.headContentType === "category") {
    //   return (<CategoryHead />);
    // } else {
    //   return (<JournalistHead />);
    // }
  }
}

export default HeadContent;
