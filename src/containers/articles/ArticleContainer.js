import React, {Component} from 'react';

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
        publishedDateTime: new Date().toISOString().split('.')[0]
      },
      categories: null
    }

    this.url = props.url;
    this.makeCategoriesList = this.makeCategoriesList.bind(this);
    this.makeJournalistsDropDown = this.makeJournalistsDropDown.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getArticleCategories = this.getArticleCategories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getArticleCategories(url){

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState({categories: data._embedded.categories.map((category) => {
        return category._links.self;
      })});

    })

  }

  componentDidMount(){

    if (this.url !== '/article/new'){
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({article: data});
        this.getArticleCategories(data._links.categories.href);
      })
    }

  }

  handleSelect(e){

    let values = Array.from(e.target.selectedOptions)
    .map(option => option.value);


  }

  makeCategoriesList(){

    if (this.props.categories){

      const categories = this.props.categories.map((category) => {
        return (<option key={category.id} value={category._links.self.href}>{category.id}: {category.title}</option>);
      })

      return (
        <select name="journalists[]" multiple="multiple" onChange={this.handleSelect}>
          {categories}
        </select>
      )

    } else {
      return (
        <select  name="journalists[]" multiple="multiple" onChange={this.handleSelect}>>
          <li>Loading...</li>
        </select>
      )
    }


  }

  handleChange(event) {

    const value = event.target.value
    const name = event.target.name

    let articleCopy = Object.assign({}, this.state.article);
    articleCopy[name] = value;

    this.setState({article: articleCopy});

  }

  makeJournalistsDropDown(){

    if (this.props.journalists){
      console.log(this.props.journalists);
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
        <select name="journalist">
          <option value="default">-- Select Journalist --</option>
          {journalists}
        </select>
      )


    } else {
      return (
        <select name="journalist">
          <option value="default">-- Loading --</option>
        </select>
      )
    }

  }

  handleSubmit(event){

    event.preventDefault();


    const article = {
      ...this.state.article
    }

    console.log(article);

  }

  render(){

    const categoriesList = this.makeCategoriesList();
    const jouralistsDropDown = this.makeJournalistsDropDown();

    let content = (<div>Loading...</div>);

    if (this.state.article){
      content = (
        <div>
          <h1>{this.state.article.headline}</h1>
          <h4>{this.state.article.subline}</h4>
          <p>{this.state.article.copy}</p>
          {categoriesList}
          {jouralistsDropDown}
        </div>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="input-headline">Headline</label>
        <input
          id="input-headline"
          type="text"
          value={this.state.article.headline}
          onChange={this.handleChange}
          name="headline"/>
          <br/>
        <label htmlFor="input-subline">Subline</label>
        <input
          id="input-subline"
          type="text"
          value={this.state.article.subline}
          onChange={this.handleChange}
          name="subline"/>
          <br/>
        <label htmlFor="input-copy">Copy</label>
        <input
          id="input-copy"
          type="textarea"
          value={this.state.article.copy}
          onChange={this.handleChange}
          name="copy"/>
          <br/>
        <label htmlFor="input-bannerImage">Banner Image</label>
        <input
          id="input-bannerImage"
          type="file"
          value={this.state.article.bannerImage}
          onChange={this.handleChange}
          name="bannerImage"/>
          <br/>
        <label htmlFor="input-thumbnailImage">Thumbnail Image</label>
        <input
          id="input-thumbnailImage"
          type="file"
          value={this.state.article.thumbnailImage}
          onChange={this.handleChange}
          name="thumbnailImage"/>
          <br/>
        <input
          id="input-submit"
          type="submit"
          value="Submit"
          name="submit"/>

      </form>
    )

  }


}




export default ArticleContainer;
