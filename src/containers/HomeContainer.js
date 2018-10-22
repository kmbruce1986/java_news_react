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
        <section className="content-area">Loading...</section>
      )
    } else {
      switch(this.state.contentType){
        case 'toparticle':
        return (
          <section className="content-area">
            <ArticleHead
              article={this.state.articles[0]}/>
            <ArticleList articles={this.state.articles.slice(1)}/>
          </section>
        )
        break;
        case 'category':
        return (
          <section className="content-area">
            <CategoryHead
              category={this.state.category}
            />
            <ArticleList articles={this.state.articles}/>
          </section>
        )
        break;
        case 'journalist':
        return (
          <section className="content-area">
            <JournalistHead
              article={this.state.articles[0]}/>
            <ArticleList articles={this.state.articles}/>
          </section>
        )
        break;
        default:
        return (
          <section className="content-area">Loading...</section>
        )


      }

    }
  }


}


export default HomeContainer;
