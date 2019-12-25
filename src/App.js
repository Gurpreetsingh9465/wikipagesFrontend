import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from './Components/Header';
import { ClientUrls } from './utils/Urls';
import Home from './Components/Home';
import Bookmark from './Components/Bookmark';
import Profile from './Components/Profile';
import Publish from './Components/Publish';
import Stats from './Components/Stats';

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      user : {
        name: 'Gurpreet Singh',
        id: 'amansingh9569',
        image: 'default.png'
      }
  }};
  render() {
    return (
      <BrowserRouter>
        <Header user={this.state.user} isLogin={false}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Switch>
          <Route exact path={ClientUrls.home}>
            <Home/>
          </Route>
          <Route exact path={ClientUrls.bookmarks}>
            <Bookmark/>
          </Route>
          <Route exact path={ClientUrls.profile}>
            <Profile/>
          </Route>
          <Route exact path={ClientUrls.stats}>
            <Stats/>
          </Route>
          <Route exact path={ClientUrls.publish}>
            <Publish/>
          </Route>
        </Switch>
      </BrowserRouter>
    )};
}

export default App;
