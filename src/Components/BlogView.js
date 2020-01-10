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
import Card from './UIelements/Card';

const recommend = [
    {
        image : 'https://miro.medium.com/max/1880/1*GRghp94F1x2iUQhBGXH8kQ.jpeg',
        likes : 500,
        views: 87845,
        id: 'amansingh9569',
        user : '/default.png',
        name : 'aman',
        time : '2019-12-25T08:25:36',
        title: 'How to get things done as soon as possible',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/1500/1*NVi_psRVbTcMbg3Yy7J0ug.png',
        likes : 1000,
        user : '/default.png',
        views: 12154,
        id: 'adiprat100',
        name : 'aditya pratap singh',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/4571/0*lAcFXibrRmvZYB3F',
        likes : 1250,
        user : '/default.png',
        id: 'madmax784',
        views: 874511,
        name : 'Mad Max',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    }
]

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
        display:'inline-flex',
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
        const { userId, id, title } = props.match.params;
        this.userId = userId;
        this.id = id;
        this.title = title;
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

    getRecommend = () => {
        const htmlRec = [];
        recommend.forEach((ele, index)=>{
            htmlRec.push(
            (<Grid key={index} item sm={12} md={4} >
                <Card {...ele} />
            </Grid>));
        })
        return htmlRec;
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
            <div>
                {!this.state.isLoaded?<Container align='center'>
                    <CircularProgress
                    style={{
                        color: Colors.green
                    }}/>
                </Container>:(
                    <div>
                        <Container style={{
                            maxWidth: '800px',
                        }}>
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
                                        rel="noopener noreferrer"
                                        href={"https://www.linkedin.com/shareArticle?url="+window.location.href+"&title="+user.title+"&summary=By @"+user.id} 
                                        className={classes.shareLink}>
                                        <LinkedInIcon size='small'/>
                                    </a>
                                    <a 
                                        target='_blank' 
                                        rel="noopener noreferrer"
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
                                            {nFormatter(this.state.likes)+' Love It'}
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
                                        {this.state.isBookmarked?<BookmarkIcon />:<BookmarkBorderIcon />}
                                    </IconButton>
                                    <a 
                                        target='_blank' 
                                        rel="noopener noreferrer"
                                        href={"https://www.linkedin.com/shareArticle?url="+window.location.href+"&title="+user.title+"&summary=By @"+user.id} 
                                        className={classes.shareLink}>
                                        <LinkedInIcon/>
                                    </a>
                                    <a 
                                        target='_blank' 
                                        rel="noopener noreferrer"
                                        href={"https://twitter.com/share?url="+window.location.href+"&text="+user.title+' By @'+user.id} 
                                        className={classes.shareLink}>
                                        <TwitterIcon/>
                                    </a>
                                </Grid>   
                            </Grid>   
                            <Button 
                            variant='outlined' 
                            disableFocusRipple
                            component={RouterLink}
                            to={urlMapper({blogId: this.id}, ClientUrls.comments)} 
                            disableElevation
                            disableRipple
                            style={{
                                color: Colors.green,
                                textTransform: 'capitalize',
                                width: '100%',
                                backgroundColor: 'transparent',
                                fontSize: '1.2rem',
                                margin: '0.2rem',
                                border: '1px solid '+ Colors.green
                            }}>
                                Comments
                            </Button>
                        </Container>
                        <br/>
                        <Container>
                            <Typography variant='h6' style={{
                                fontWeight: 700
                            }}>
                               From WikiPages
                            </Typography>
                            <Divider/>
                            <br/>
                            <Grid container spacing={2}>
                                {this.getRecommend()}
                            </Grid>
                        </Container>
                    </div>
                    )
                }
            </div>
        );
    }

}

BlogView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BlogView);