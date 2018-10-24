import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./containers/bars/NavBar.js";
import JournalistContainer from "./containers/journalists/JournalistContainer.js";
import ArticleContainer from "./containers/articles/ArticleContainer.js";
import HomeContainer from "./containers/HomeContainer.js";
import SideBar from './containers/sidebar/SideBar.js';
import FooterContainer from './containers/footer/FooterContainer.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: false,
      categories: null,
      journalists: null,
      imageStore: "http://localhost:8080/images/"
    }
    this.toggleUser = this.toggleUser.bind(this);
  }

  toggleUser(){
    this.setState(prevState => {
      return {
        isAdmin: !prevState.isAdmin
      }
    })
  }

  componentDidMount(){
    fetch('/categories')
    .then((res) => res.json())
    .then((categoryData) => {
      this.setState({categories: categoryData._embedded.categories});
    })

    fetch('/journalists')
    .then((res) => res.json())
    .then((journalistData) => {
      this.setState({journalists: journalistData._embedded.journalists});
    })
  }

  render() {
    if(!this.state.categories || !this.state.journalists){
      return null;
    }
    return (

      <Router>
        <div className="wrapper">

          <NavBar user={this.state.isAdmin} handleToggle={this.toggleUser}
            categories={this.state.categories}/>
          <SideBar journalists={this.state.journalists}/>
            <Switch>

              <Route exact path="/" render={(props) => {
                const url = "/articles/"
                return <HomeContainer
                  url={url}
                  user={this.state.isAdmin}
                  journalists={this.state.journalists}
                  categories={this.state.categories}
                  type="articles"/>
                }}/>

                <Route exact path="/journalists/:id" render={(props) => {
                  const url = "/articles/journalist/" + props.match.params.id
                  return <HomeContainer
                    url={url}
                    user={this.state.isAdmin}
                    journalists={this.state.journalists}
                    categories={this.state.categories}
                    type="journalist"/>
                  }}/>

                  <Route exact path="/categories/:id" render={(props) => {
                    const url = "/articles/category/" + props.match.params.id
                    return <HomeContainer
                      url={url}
                      user={this.state.isAdmin}
                      journalists={this.state.journalists}
                      categories={this.state.categories}
                      categoryId={props.match.params.id}
                      type="categories"/>
                    }}/>

                    <Route exact path="/journalist/new" render={(props) => {
                      const url = "/journalists";
                      return <JournalistContainer
                        url={url}
                        user={this.state.isAdmin}/>
                      }}/>

                      <Route exact path="/journalist/:id" render={(props) => {
                        const url = "/journalists/" + props.match.params.id
                        return <JournalistContainer
                          url={url}
                          user={this.state.isAdmin}/>
                        }}/>

                        <Route exact path="/article/:id" render={(props) => {
                          const url = "/articles/" + props.match.params.id + "?projection=embedArticleDetails"
                          return (<ArticleContainer
                            url={url}
                            user={this.state.isAdmin}
                            imageStore={this.state.imageStore}
                            categories={this.state.categories}
                            journalists={this.state.journalists}/>)
                          }}/>

                          <Route exact path='/articles/new' render={(props) => {
                            const url = '/articles'
                            return (
                              <ArticleContainer
                                url={url}
                                user={this.state.isAdmin}
                                imageStore={this.state.imageStore}
                                categories={this.state.categories}
                                journalists={this.state.journalists}/>)
                              }}/>




                            </Switch>
                            <FooterContainer/>
                          </div>
                        </Router>

                      );
                    }
                  }

export default App;
