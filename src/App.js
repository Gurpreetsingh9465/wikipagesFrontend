import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Header from './Components/Header';
import { ClientUrls } from './utils/Urls';
import { fontFamily } from './utils/Strings';
import Home from './Components/Home';
import Bookmark from './Components/Bookmark';
import Profile from './Components/Profile';
import Publish from './Components/Publish';
import Stats from './Components/Stats';
import BlogView from './Components/BlogView';
import UserView from './Components/UserView';
import Comments from './Components/Comments';
import Search from './Components/Search';
import axios from 'axios';

axios.get('/getCsrfToken').then((response) => {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data._csrf;
}, (err) => {
  console.log(err.response)
});

const THEME = createMuiTheme({
  typography: {
   "fontFamily": fontFamily,
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      width: window.innerWidth,
      open: false,
      message: '',
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

  handleClose = () => {
    this.setState({
      open: false,
      message: ''
    });
  }

  handleOpen = (message) => {
    this.setState({
      open: true,
      message: message
    });
  }
 
  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    return (
        <MuiThemeProvider theme={THEME}>
          <BrowserRouter>
            <Header handleOpen={this.handleOpen} isMobile={isMobile} user={this.state.user} isLogin={false}/>
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
              <Route exact path={ClientUrls.profile}
              render={(routeProps)=>{
                return(
                  <Profile isMobile={isMobile} {...routeProps}/>
              )}}
              />
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
              <Route exact path={ClientUrls.comments}
              render={(routeProps)=>{
                return(
                  <Comments isMobile={isMobile} {...routeProps}/>
              )}}
              />
              <Route exact path={ClientUrls.search}
              render={(routeProps)=>{
                return(
                  <Search isMobile={isMobile} {...routeProps}/>
              )}}
              />
            </Switch>
          </BrowserRouter>
          <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }} open={this.state.open} 
          style={{
            fontSize: '1rem',
            textTransform: 'capitalize'
          }}
          autoHideDuration={6000} 
          onClose={this.handleClose}
          message={this.state.message}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          />
        </MuiThemeProvider>
    )};
}

export default App;
