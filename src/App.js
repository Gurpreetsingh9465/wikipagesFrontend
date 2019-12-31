import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Header from './Components/Header';
import { ClientUrls } from './utils/Urls';
import Home from './Components/Home';
import Bookmark from './Components/Bookmark';
import Profile from './Components/Profile';
import Publish from './Components/Publish';
import Stats from './Components/Stats';
import BlogView from './Components/BlogView';
import UserView from './Components/UserView';

const THEME = createMuiTheme({
  typography: {
   "fontFamily": "'Nunito', sans-serif",
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      width: window.innerWidth,
      user : {
        name: 'Gurpreet Singh',
        id: 'amansingh9569',
        image: 'default.png'
      }
  }};

  componentDidMount = () => {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    return (
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <Header isMobile={isMobile} user={this.state.user} isLogin={true}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Switch>
            <Route exact path={ClientUrls.home}>
              <Home isMobile={isMobile} />
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
              <Publish isMobile={isMobile}/>
            </Route>
            <Route exact path={ClientUrls.view}
            render={(routeProps)=>{
              return(
                <BlogView isMobile={isMobile} {...routeProps}/>
            )}}
            />
            <Route exact path={ClientUrls.userView}
            render={(routeProps)=>{
              return(
                <UserView isMobile={isMobile} {...routeProps}/>
            )}}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )};
}

export default App;
