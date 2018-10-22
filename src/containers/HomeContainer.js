import React, {Component} from 'react';
import ArticleList from './articles/ArticleList.js';

import ArticleHead from '../components/heads/ArticleHead.js';
import CategoryHead from '../components/heads/CategoryHead.js';
import JournalistHead from '../components/heads/JournalistHead.js';

class HomeContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      articles: null,
      categoryId: props.categoryId,
      categories: props.categories,
      category: props.categories.find((cat) => {
        return cat.id === props.categoryId;
      })
    }

    this.state.contentType = '';
    this.url = props.url;

  }

  componentDidMount(){

    fetch(this.url)
    .then((res) => res.json())
    .then((data) => {

      console.log(this.url);
      console.log(data);

      if (this.props.type === 'articles'){
        this.setState({contentType: "toparticle"})
      } else if (this.props.type === 'categories') {
        this.setState({contentType: "category"})
      } else{
        this.setState({contentType: "journalist"})
      }

      this.setState({articles: data});

    })

  }

  render(){
    if(this.state.articles === null){
      return(
        <div>Loading...</div>
      )
    } else {
      switch(this.state.contentType){
        case 'toparticle':
        return (
          <div>
            <ArticleHead
              article={this.state.articles[0]}/>
            <ArticleList articles={this.state.articles.slice(1)}/>
          </div>
        )
        break;
        case 'category':
        return (
          <div>
            <CategoryHead
              category={this.state.category}
            />
            <ArticleList articles={this.state.articles}/>
          </div>
        )
        break;
        case 'journalist':
        return (
          <div>
            <JournalistHead
              article={this.state.articles[0]}/>
            <ArticleList articles={this.state.articles}/>
          </div>
        )
        break;
        default:
        return (
          <div>Loading...</div>
        )


      }






    }
  }


}




export default HomeContainer;
{/* <HeadContent articles={this.state.articles} url = {this.url} type={this.props.type} >HC</HeadContent> */}
