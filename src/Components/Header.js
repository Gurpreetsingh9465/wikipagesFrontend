import React from "react";
import { Container, FormControl, TextField, Divider, Grid, Menu, MenuItem, Input, Link, Dialog, IconButton, DialogContent, DialogTitle, Typography, Avatar, useScrollTrigger, Slide, InputBase, Toolbar, AppBar, Button} from "@material-ui/core";
import { Search as SearchIcon, KeyboardBackspace as KeyboardBackspaceIcon, Close as CloseIcon, MailOutline as MailOutlineIcon } from "@material-ui/icons";
import { withStyles, fade } from "@material-ui/core/styles";
import { ClientUrls, urlMapper } from '../utils/Urls';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import PasswordInput from './UIelements/PasswordInput';
import { Colors } from '../utils/Colors';

const styles = theme => ({
  root: {
    margin: 0,
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(1),
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatarBig: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  button: {
    marginLeft: theme.spacing(1),
    textTransform: 'none',
  },
  signInButton: {
    textTransform: 'none',
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  appBar: {
    boxShadow: '0px 2px '+Colors.shadow,
    backgroundColor: Colors.white
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.black,
  },
  searchIconMobile: {
    marginRight: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: Colors.black
  },
  inputRoot: {
    color: Colors.black,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const StyledMenu = withStyles({
  paper: {
    borderLeft: '1px solid '+Colors.lightGrey,
    borderRight: '1px solid '+Colors.lightGrey,
    borderBottom: '1px solid '+Colors.lightGrey,
    marginTop: '17px',
    borderRadius: '10px'
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginDialogEnable: false,
      searchDialogEnable: false,
      showPassword: false,
      anchor: null,
      dialogElement: this.getLoginDialog(props.classes),
    };
  }

  searchQuery = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      this.setState({searchDialogEnable: false});

      // this.props.history.push(urlMapper({query: e.target.value}, ClientUrls.search));
    }
  }
  
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleClick = event => {
    this.setState({
      anchor: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchor: null
    });
  };

  handleClickOpenLoginDialog = () => {
    this.setState({loginDialogEnable: true});
  };

  handleCloseLoginDialog = () => {
    this.setState({
      loginDialogEnable: false,
      dialogElement: this.getLoginDialog(this.props.classes)
    });
  };

  handleBackLoginDialog = () => {
    this.setState({
      dialogElement: this.getLoginDialog(this.props.classes)
    });
  };

  handleClickOpenSearchDialog = () => {
    this.setState({searchDialogEnable: true});
  };

  handleCloseSearchDialog = () => {
    this.setState({searchDialogEnable: false});
  };

  getLoginInfo = (classes) => {
    if(this.props.isLogin) {
      return (<Avatar 
              onClick={this.handleClick}
              id="userInfo"
              className={classes.avatar} 
              alt={this.props.user.name} 
              src={this.props.user.image} />);
    } else {
      return (<Button 
              size="small" 
              className={classes.button}
              onClick={this.handleClickOpenLoginDialog}
              variant="contained"
              color="secondary">Login</Button>);
    }
  }

  getLoginDialog = (classes, type = 'default') => {
    if(type === 'signin') {
      return (
        <div>
          <DialogTitle align="center" disableTypography className={classes.root}>
            <IconButton className={classes.backButton} aria-label="back" onClick={this.handleBackLoginDialog}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography display="block" align="center" variant="h5">
              Join WikiPages.in
            </Typography>
            <p style={{color: Colors.grey}}>
              "There is nothing to writing. All you do is sit down at a typewriter and bleed." ― Ernest Hemingway
            </p>
          </DialogTitle>
          <DialogContent align='center'>
            <FormControl fullWidth autoComplete="off">
              <TextField label="Email" />
              <br/>
              <PasswordInput/>
            </FormControl>
          </DialogContent>
          <DialogContent align="center">
            <Button color="primary" variant="outlined" className={classes.button}>
              Sign In
            </Button>
          </DialogContent>
        </div>
      )
    } else if(type === 'signup') {
      return (
        <div>
          <DialogTitle align="center" disableTypography className={classes.root}>
            <IconButton className={classes.backButton} aria-label="back" onClick={this.handleBackLoginDialog}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography display="block" align="center" variant="h5">
              Join WikiPages.in
            </Typography>
            <p style={{color: Colors.grey}}>
              "There is nothing to writing. All you do is sit down at a typewriter and bleed." ― Ernest Hemingway
            </p>
          </DialogTitle>
          <DialogContent align='center'>
            <FormControl fullWidth autoComplete="off">
              <TextField label="Username" />
              <br/>
              <TextField label="Email" />
              <br/>
              <PasswordInput/>
              <br/>
              <PasswordInput label="Confirm Password" />
            </FormControl>
          </DialogContent>
          <DialogContent align="center">
            <Button color="primary" variant="outlined" className={classes.button}>
              Sign Up
            </Button>
          </DialogContent>
          <DialogContent align="center">
            <p style={{color: Colors.lightGrey}}>
              <span>To make WikiPages.in work, we log user data and share it with service providers. Click "Sign Up" above to accept our </span>
              <Link href="#" style={{textDecoration: 'underline'}} color="inherit" onClick={(e)=>{e.preventDefault()}}>Terms and Privacy Policy</Link>.
            </p>
          </DialogContent>
        </div>
      )
    } else {
      return (<div>
          <DialogTitle align="center" disableTypography className={classes.root}>
            <Typography display="block" align="center" variant="h5">
              Join WikiPages.in
            </Typography>
            <IconButton disableRipple aria-label="close" className={classes.closeButton} onClick={this.handleCloseLoginDialog}>
              <CloseIcon />
            </IconButton>
            <p style={{color: Colors.grey}}>
              "There is nothing to writing. All you do is sit down at a typewriter and bleed." ― Ernest Hemingway
            </p>
          </DialogTitle>
          <DialogContent align="center">
            <Button 
            color="secondary" 
            endIcon={<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path></svg>}
            variant="outlined" 
            className={classes.signInButton}>
              Sign Up With Google 
            </Button>
            <Button onClick={(e)=>{
              this.setState({
                dialogElement: this.getLoginDialog(classes, 'signup')
              })
            }} color="primary" 
            endIcon={<MailOutlineIcon/>} 
            variant="outlined" 
            className={classes.signInButton}>
              Sign Up With Mail 
            </Button>
          </DialogContent>
          <DialogContent align="center">
            <p>Already have an account? <Link onClick={(event)=>{
              event.preventDefault();
              this.setState({
                dialogElement: this.getLoginDialog(classes, 'signin')
              })
            }}>Sign in</Link></p>
          </DialogContent>
          <DialogContent align="center">
            <p style={{color: Colors.lightGrey}}>
              <span>To make WikiPages.in work, we log user data and share it with service providers. Click "Sign Up" above to accept our </span>
              <Link href="#" style={{textDecoration: 'underline'}} color="inherit" onClick={(e)=>{e.preventDefault()}}>Terms and Privacy Policy</Link>.
            </p>
          </DialogContent>
      </div>);
    }
  }

  getSearchBar = (classes, isMobile) => {
    if(isMobile) {
      return(
        <IconButton onClick={this.handleClickOpenSearchDialog}>
          <SearchIcon />
        </IconButton>
      );
    } else {
      return (<div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search wiki"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onKeyPress={this.searchQuery}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>);
    }
  }

  render() {
    const { classes } = this.props;
    const isMobile = this.props.isMobile;
    const open = Boolean(this.state.anchor);
    return(
      <div>
        <HideOnScroll {...this.props}>
          <AppBar className={classes.appBar}>
            <Container>
              <Toolbar>
                <div className={classes.grow}>
                  <RouterLink to={ClientUrls.home}>
                    {isMobile?<img alt="logo" height="40px" src="/logo.png"/>:<img alt="logo" height="50px" src="/full_logo.png"/>}
                  </RouterLink>
                </div>
                {this.getSearchBar(classes, isMobile)}
                {isMobile?null:<Button component={RouterLink} to={ClientUrls.publish} size="small" className={classes.button} variant="outlined" color="default">Publish</Button>}
                {this.getLoginInfo(classes)}
                <StyledMenu
                  id='userInfo'
                  open={open}
                  disableAutoFocusItem={true}
                  anchorEl={this.state.anchor}
                  onClose={this.handleClose}
                  className={classes.menu}
                  getContentAnchorEl={null}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <div>
                        <Avatar 
                          className={classes.avatarBig} 
                          alt={this.props.user.name} 
                          src={this.props.user.image} />
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <p style={{marginBottom:'1px'}}>{this.props.user.name}</p>
                      <p style={{color: Colors.grey, marginTop:'1px', textDecoration:'underline'}}>@{this.props.user.id}</p>
                    </Grid>
                  </Grid>
                  <Divider />
                  <MenuItem onClick={this.handleClose} component={RouterLink} to={ClientUrls.publish} disableRipple={true}>
                    Publish
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} component={RouterLink} to={ClientUrls.stats} disableRipple={true}>
                    Stats
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} component={RouterLink} to={ClientUrls.bookmarks} disableRipple={true}>
                    Bookmarks
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={this.handleClose} component={RouterLink} to={ClientUrls.profile} disableRipple={true}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={this.handleClose} disableRipple={true}>
                    Logout
                  </MenuItem>
                </StyledMenu>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Dialog
          PaperProps={{ style: {
            maxHeight: '600px',
            minHeight: '37vh',
          },}}
          fullScreen={isMobile}
          onClose={this.handleCloseLoginDialog}
          open={this.state.loginDialogEnable}>
          {this.state.dialogElement}
        </Dialog>
        <Dialog
          fullScreen
          onClose={this.handleCloseSearchDialog}
          open={this.state.searchDialogEnable}>
          <DialogTitle disableTypography className={classes.root}>
            <div className={classes.grow}>
              <img alt="logo" height="40px" src="/full_logo.png"/>
            </div>
            <IconButton disableRipple aria-label="close" className={classes.closeButton} onClick={this.handleCloseSearchDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Input 
            onKeyPress={this.searchQuery}
            fullWidth={true} 
            placeholder="Search Wiki">
            </Input>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Header);