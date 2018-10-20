import React, {Component} from 'react';

class ArticleContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAdmin: this.props.user,
      article: null
    }

    this.url = props.url;
  }

  componentDidMount(){
    fetch(this.url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState({article: data})
    })
  }

  render(){
    return(
      <div>ArticleContainer</div>
    )
  }


}




export default ArticleContainer;
