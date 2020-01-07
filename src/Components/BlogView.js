import React from 'react';
import PropTypes from 'prop-types';
import { Container, CircularProgress, Button, withStyles, Typography, Grid, Avatar, Divider, IconButton } from '@material-ui/core';
import Renderer from './UIelements/Renderer';
import { MoreHoriz as MoreHorizIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon , BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import Blog from './Seed';
import { Link as RouterLink } from 'react-router-dom';
import { urlMapper, ClientUrls } from '../utils/Urls';
import { nFormatter } from '../utils/Nformatter';

const styles = (theme) => ({
    image: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    shareLink: { 
        backgroundColor: 'transparent', 
        padding:'3px', 
        fontSize:'1.125rem',
        verticalAlign: 'middle',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        display:'inline-flex'
    },
    tag: {
        margin: '1.0rem 0.6rem',
        border: '0',
        textTransform: 'capitalize',
        backgroundColor: Colors.lightGrey,
        color: Colors.black
    },
    horizonDot: {
        fontSize: '30px',
        color: Colors.green,
        '@media (min-width:600px)': {
          fontSize: '40px',
        },
    },
});

const user = {
    user : '/default.png',
    name : 'Gurpreet Singh',
    bio: 'Connect me on linked in www.linkedin.in/asjai282500',
    id : 'amansingh9569',
    time : '2019-12-25T08:25:36',
    title: 'How To Make a React App',
} 

const tags = ['programming', 'startup','enterpreneurship','c++','golang','python','artificialinteligence','mahinelearning'] 

const months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isBookmarked: false,
            isLiked: false,
            likes: '11548'
        }
        let dateTime = new Date(Date.parse(user.time));
        this.dateTime =  months[dateTime.getMonth()]+' '+dateTime.getDate()+', ' + dateTime.getFullYear();
    }

    toggleBookmark = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked
        });
    }

    toggleLike = () => {
        this.setState({
            isLiked: !this.state.isLiked
        });
    }

    getTags = () => {
        let htmlTag = [];
        tags.forEach((tag, index)=>{
            htmlTag.push(<Button 
            key={index} 
            variant="contained" 
            className={this.props.classes.tag}
            disabled>
                {tag}
              </Button>);
        })
        return htmlTag;
    }

    componentDidMount() {
        // const { user, id, title } = this.props.match.params;
        setTimeout(()=>{
            this.setState({
                isLoaded: true
            });
        },1000);
    }

    render() {
        const isMobile = this.props.isMobile;
        const { classes } = this.props;
        return(
            <Container style={{
                maxWidth: '800px',
            }} 
            align={this.state.isLoaded?'':"center"} >
            {!this.state.isLoaded?<CircularProgress
            style={{
                color: Colors.green
            }}
            />:(
                <div>
                    <br/>
                    <Typography 
                    variant={isMobile?'h5':'h4'}
                    style={{fontWeight: 700}} >
                        {user.title}
                    </Typography>
                    <br/>
                    <Grid container>
                        <Grid 
                        component={RouterLink} 
                        to={urlMapper({user: user.id}, ClientUrls.userView)} 
                        item xs={2} sm={1}>
                            <Avatar alt={user.name} src={user.user} className={classes.image}/>
                        </Grid>
                        <Grid item xs={!isMobile?7:10} sm={!isMobile?8:11} >
                            <Typography variant={isMobile?'body2':'body1'}>
                            {user.name}<span> </span>
                            {isMobile?null:<RouterLink
                            to={urlMapper({user: user.id}, ClientUrls.userView)} 
                            style={{color: Colors.grey, textDecoration:'underline'}}>
                            @{user.id}
                            </RouterLink>}</Typography>
                            <Typography
                            variant={isMobile?'body2':'body1'}
                            style={{color: Colors.grey}}>
                                {this.dateTime}
                            </Typography>
                        </Grid>
                        <Grid align={!isMobile?'right':'left'} item xs={!isMobile?3:12}>
                            {isMobile?<br/>:null}
                            <IconButton 
                                style={{ 
                                    backgroundColor: 'transparent',
                                    color: Colors.blue
                                }} 
                                disableFocusRipple disableRipple 
                                title='Bookmark' 
                                onClick={this.toggleBookmark} 
                                size='small'>
                                {this.state.isBookmarked?<BookmarkIcon/>:<BookmarkBorderIcon/>}
                            </IconButton>
                            <a 
                                target='_blank' 
                                href={"https://www.linkedin.com/shareArticle?url="+window.location.href+"&title="+user.title+"&summary=By @"+user.id} 
                                className={classes.shareLink}>
                                <LinkedInIcon size='small'/>
                            </a>
                            <a 
                                target='_blank' 
                                href={"https://twitter.com/share?url="+window.location.href+"&text="+user.title+' By @'+user.id} 
                                className={classes.shareLink}>
                                <TwitterIcon size='small'/>
                            </a>
                        </Grid>
                    </Grid>
                    <Container align='center'>
                        <MoreHorizIcon className={classes.horizonDot} />
                    </Container>
                    <Renderer isMobile={isMobile} blog={Blog} />
                    <Divider/>
                    {this.getTags()}
                    <Grid container>
                        <Grid item xs={6}>
                            <IconButton
                            style={{ 
                                backgroundColor: 'transparent',
                                color: Colors.red,
                            }} 
                            disableFocusRipple disableRipple 
                            title='Love' 
                            onClick={this.toggleLike} 
                            >
                            {this.state.isLiked?<FavoriteBorderIcon fontSize='large'/>:<FavoriteIcon fontSize='large'/>}
                            <Typography>
                                {nFormatter(this.state.likes)+' Likes'}
                            </Typography>
                            </IconButton>
                            
                        </Grid> 
                        <Grid align='right' item xs={6} >
                            <IconButton 
                                style={{ 
                                    backgroundColor: 'transparent',
                                    color: Colors.blue
                                }} 
                                disableFocusRipple disableRipple 
                                title='Bookmark' 
                                onClick={this.toggleBookmark} >
                                {this.state.isBookmarked?<BookmarkIcon />:<BookmarkBorderIcon fontSize='medium'/>}
                            </IconButton>
                            <a 
                                target='_blank' 
                                href={"https://www.linkedin.com/shareArticle?url="+window.location.href+"&title="+user.title+"&summary=By @"+user.id} 
                                className={classes.shareLink}>
                                <LinkedInIcon/>
                            </a>
                            <a 
                                target='_blank' 
                                href={"https://twitter.com/share?url="+window.location.href+"&text="+user.title+' By @'+user.id} 
                                className={classes.shareLink}>
                                <TwitterIcon/>
                            </a>
                        </Grid>   
                    </Grid>    
                    <Divider/>
                </div>
                )
            }
            </Container>
        );
    }

}

BlogView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BlogView);