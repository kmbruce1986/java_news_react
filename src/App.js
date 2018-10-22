import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./containers/bars/NavBar.js";
import JournalistContainer from "./containers/journalists/JournalistContainer.js";
import ArticleContainer from "./containers/articles/ArticleContainer.js";
import HomeContainer from "./containers/HomeContainer.js";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: true,
      categories: null,
      journalists: null
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
    return (

      <Router>
        <div className="wrapper">
          <NavBar user={this.state.isAdmin} handleToggle={this.toggleUser}
            categories={this.state.categories}/>
            <Switch>

              <Route exact path="/" render={(props) => {
                const url = "/articles"
                return <HomeContainer url={url} user={this.state.isAdmin}
                  journalists={this.state.journalists}
                  categories={this.state.categories}/>
                }}/>

                <Route exact path="/journalists/:id" render={(props) => {
                  const url = "/articles/journalist/" + props.match.params.id
                  return <HomeContainer url={url} user={this.state.isAdmin}
                    journalists={this.state.journalists}
                    categories={this.state.categories}}/>
                  }}/>

                  <Route exact path="/categories/:id" render={(props) => {
                    const url = "/articles/category/" + props.match.params.id
                    return <HomeContainer url={url} user={this.state.isAdmin}
                      journalists={this.state.journalists}
                      categories={this.state.categories}/>
                    }}/>

                    <Route exact path="/articles/:id" render={(props) => {
                      const url = "/articles/" + props.match.params.id
                      return <ArticleContainer url={url}
                        user={this.state.isAdmin}
                        journalists={this.state.journalists}
                        categories={this.state.categories}/>
                      }}/>




                    </Switch>
                    {/* footer goes here */}
                  </div>
                </Router>

              );
            }
          }

          export default App;


          {/* <Route exact path="/journalists" render={() => {
            const url = "/journalists";
            return <JournalistContainer url={url} user={this.state.isAdmin}/>
          }} /> */}


          {/* <Route exact path="/home/category/:id" render={(props) => {
            const url = "/articles/" + props.match.params.id
            return <ArticleContainer url={url}
            user={this.state.isAdmin}/>
          }}/>

          <Route exact path="/home/journalist/:id" render={(props) => {
          const url = "/articles/" + props.match.params.id
          return <ArticleContainer url={url}
          user={this.state.isAdmin}/>
        }}/> */}
