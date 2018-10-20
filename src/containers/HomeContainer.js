import React, {Component} from 'react';

class HomeContainer extends Component{
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
      <div>HomeContainer</div>
    )
  }


}




export default HomeContainer;
