import React, {Component} from 'react';
import ImageUploader from '../../components/imagecomponent/ImageUploader.js';
import ArticleCategories from '../../components/articles/ArticleCategories.js';
import ArticleJournalist from '../../components/articles/ArticleJournalist.js';

class ArticleContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      article: {
        headline: '',
        subline: '',
        copy: '',
        bannerImage: '',
        thumbnailImage: '',
        publishedDateTime: new Date().toISOString().split('.')[0],
        categories: [],
        journalist: null
      },
      categories: [],
      journalist: null
    }

    this.url = props.url;


    this.handleCategorySelectionChange = this.handleCategorySelectionChange.bind(this);
    this.getArticleCategories = this.getArticleCategories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleBannerSelect = this.handleBannerSelect.bind(this);
    this.handleThumbSelect = this.handleThumbSelect.bind(this);

    this.handleDelete = this.handleDelete.bind(this);

    this.isSelectedCategory = this.isSelectedCategory.bind(this);
    this.getCategoryItems = this.getCategoryItems.bind(this);
    this.handleJournalistSelect = this.handleJournalistSelect.bind(this);

    this.getJournalistHyperlink = this.getJournalistHyperlink.bind(this);


  }

  getArticleCategories(url){

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

      const articleCategories = data._embedded.categories.map((category) => {
        return category._links.self.href;
      })

      const articleCopy = {
        ...this.state.article
      }
      articleCopy.categories = articleCategories;
      this.setState({article: articleCopy});
      this.setState({categories: articleCategories});

    })

  }

  getJournalistHyperlink(journalistId){


    let journalistHyperlink = '';
    console.log(this.props.journalists);
    this.props.journalists.map((journalist) => {
      if (journalist.id == journalistId){
        journalistHyperlink = journalist._links.journalist.href;
      }
    })

    return journalistHyperlink;
  }

  componentDidMount(){

    console.log(this.url);

    if (this.url !== "/articles"){
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({article: data});
        this.setState({journalist: this.getJournalistHyperlink(data.journalist.id)});
        if (data._links.categories.href){
          this.getArticleCategories(data._links.categories.href);
        }
      })
    }

  }

  handleBannerSelect(imageFileName){

    const articleCopy = {
      ...this.state.article
    }
    articleCopy.bannerImage = imageFileName;
    this.setState({article: articleCopy});
  }

  handleThumbSelect(imageFileName){

    const articleCopy = {
      ...this.state.article
    }
    articleCopy.thumbnailImage = imageFileName;
    this.setState({article: articleCopy});

  }

  handleCategorySelectionChange(event){

    const articleCopy = {
      ...this.state.article
    }

    let articleCategories = articleCopy.categories;

    const index = articleCategories.indexOf(event.target.dataset.category)

    if (index < 0){
      articleCategories.push(event.target.dataset.category);
    } else {
      articleCategories.splice(index, 1);
    }

    articleCopy.categories = articleCategories;
    this.setState({article: articleCopy});

  }

  isSelectedCategory(category){

    let isCategory = false;

    this.state.article.categories.map((cat) => {
      if (cat.id == category.id){
        isCategory = true;
      }
    });

    return isCategory;
  }

  getCategoryItems(){

    let categoryItems = [];
    if (this.props.categories && (this.state.article.categories.length >= 0)){
      categoryItems = this.props.categories.map((cat) => {
        if(this.isSelectedCategory(cat)){
          cat.selected = true;
        }
        return cat;
      });
    }
    return categoryItems;

  }

  handleChange(event) {

    const value = event.target.value
    const name = event.target.name

    let articleCopy = Object.assign({}, this.state.article);
    articleCopy[name] = value;

    this.setState({article: articleCopy});

  }

  handleJournalistSelect(event){
    this.setState({journalist: event.target.value})
  }

  handleDelete(event){

    fetch(this.url,{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => {
      window.location = "/";
    })
  }

  handleSubmit(event){

    event.preventDefault();

    const article = {
      ...this.state.article
    }
    article.journalist = this.state.journalist;


    let requestType;

    if (article.id != null) {
      requestType = 'PATCH'
    } else {
      requestType = 'POST'
    }
    fetch(this.url,{
      method: requestType,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(article)
    }).then(() => {
      window.location = "/";
    })

  }

  render(){

    const categoryItems = this.getCategoryItems();

    const classes = 'section content-area ' + (this.props.user ? 'is-admin': '');

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let dateTime = '';
    let dateToDisplay = 'Published Date';
    if(this.state.article.publishedDateTime){

      dateTime = this.state.article.publishedDateTime;
      const date = new Date(dateTime);

      var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "2-digit",
        minute: "2-digit"
      };

      dateToDisplay = date.toLocaleDateString("en-GB", options);

    } else {
      dateToDisplay = Date.now().toLocaleDateString("en-GB", options);
    }

    if(this.props.user){
      return(
        <section className={classes}>
          <form className="article-form" onSubmit={this.handleSubmit}>
            <input
              id="input-headline"
              type="text"
              value={this.state.article.headline}
              onChange={this.handleChange}
              name="headline"/>
              <p>{dateToDisplay}</p>
              <ArticleJournalist
                journalists={this.props.journalists}
                articleJournalist={this.state.journalist}
                handleJournalistSelect={this.handleJournalistSelect}
              />
              <ImageUploader
                imageStore={this.props.imageStore}
                title={"Banner Image"}
                type={"banner"}
                handleImageSelect={this.handleBannerSelect}
                imageUrl={this.state.article.bannerImage}
              />
              <input
                id="input-bannerImage"
                type="text"
                disabled="disabled"
                value={this.state.article.bannerImage}
                name="bannerImage"/>


                <input
                  id="input-subline"
                  type="text"
                  value={this.state.article.subline}
                  onChange={this.handleChange}
                  name="subline"/>
                  <br/>

                  <textarea
                    id="article-textarea"
                    value={this.state.article.copy}
                    onChange={this.handleChange}
                    name="copy">

                  </textarea>


                  <ImageUploader
                    imageStore={this.props.imageStore}
                    title={"Thumbnail Image"}
                    type={"thumb"}
                    handleImageSelect={this.handleThumbSelect}
                    imageUrl={this.state.article.thumbnailImage}
                  />

                  <input
                    id="input-thumbnailImage"
                    type="text"
                    disabled="disabled"
                    value={this.state.article.thumbnailImage}
                    name="thumbnailImage"/>

                    <ArticleCategories
                      categoryItems={categoryItems}
                      selectedCategories={this.state.article.categories}
                      handleSelectionChange={this.handleCategorySelectionChange}
                      isAdmin={this.props.user}
                    />
                    <div className="article-controls">
                      <button onClick={this.handleDelete}>Delete</button>
                      <input
                        id="input-submit"
                        type="submit"
                        value="Submit"
                        name="submit"/>
                      </div>
                    </form>

                  </section>
                )
              } else {



                let journalistName = '';
                let journalisthref = '';
                let paragraphs = [];
                let paras = [];
                if (this.state.article.journalist){
                  journalistName = this.state.article.journalist.firstName + " " + this.state.article.journalist.lastName;
                  journalisthref = this.state.article.journalist.id;
                  paragraphs = this.state.article.copy.split("\n");
                  paras = paragraphs.map((content) => {
                    return (<p>{content}</p>);
                  })
                }



                return (
                  <section className={classes}>
                    <h2 className="article-headline">{this.state.article.headline}</h2>
                    <p className="article-date">{dateToDisplay}</p>
                    <p className="article-journalist"><a href={"/journalists/" + journalisthref}>{journalistName}</a></p>
                    <img className="article-banner-img" src={this.props.imageStore + this.state.article.bannerImage}/>
                    <h4 className="article-subline">{this.state.article.subline}</h4>
                    <div className="article-copy">
                      {paras}
                    </div>
                    <ArticleCategories
                      categoryItems={categoryItems}
                      selectedCategories={this.state.article.categories}
                      handleSelectionChange={this.handleCategorySelectionChange}
                      isAdmin={this.props.user}
                    />

                  </section>
                )
              }



            }


          }

          export default ArticleContainer;
