import React from 'react';
import PropTypes from 'prop-types';
import { Box, withStyles, Grid, Avatar, Typography, IconButton, Divider } from '@material-ui/core';
import { Favorite as FavoriteIcon, Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { ClientUrls, urlMapper } from '../../utils/Urls';
import { Colors } from '../../utils/Colors';
import ImageViewer from './ImageViewer';
import { nFormatter } from '../../utils/Nformatter';

const styles = theme => ({
    image: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
});

const months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            isBookmarked: false
        };
        let dateTime = new Date(Date.parse(props.time));
        this.dateTime =  months[dateTime.getMonth()]+' '+dateTime.getDate()+', ' + dateTime.getFullYear();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    toggleBookmark = () => {
        this.setState({
            isBookmarked: !this.state.isBookmarked
        });
    }

    render() {
        const { classes } = this.props;
        const { width } = this.state;
        const isMobile = width <= 600;
        return(
            <Box width={this.props.width}>
                <Grid container>
                    <Grid xs={10} style={{
                        display: 'flex'
                        }} item>
                        <Box
                        style={{
                            margin:'0px 10px',
                        }}
                        component={RouterLink} 
                        to={urlMapper({user: this.props.id}, ClientUrls.userView)} 
                        >
                            <Avatar alt={this.props.name} src={this.props.user} className={classes.image}/>
                        </Box>
                        <Box>
                            <Typography
                            variant={isMobile?'body2':'body1'}>
                            <span style={{textTransform: 'capitalize',}}>{this.props.name}</span>
                            </Typography>
                            <Typography
                            variant={isMobile?'body2':'body1'}
                            style={{color: Colors.grey}}>
                                {this.dateTime}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={2} align='right' item>
                        <IconButton 
                            style={{ 
                                backgroundColor: 'transparent',
                                color: Colors.blue,
                                padding: '5px'
                            }} 
                            disableFocusRipple disableRipple 
                            title='Bookmark' 
                            onClick={this.toggleBookmark} >
                            {this.state.isBookmarked?<BookmarkIcon />:<BookmarkBorderIcon />}
                        </IconButton> 
                    </Grid>
                </Grid>
                <br/>
                <Box
                component={RouterLink}
                style={{ textDecoration: 'none' }} 
                to={urlMapper({
                    user: this.props.id,
                    id: this.props.blogId,
                    title: this.props.title,
                }, ClientUrls.view)} 
                pt={0.5}>
                    <ImageViewer
                    src={this.props.image}
                    title={this.props.title}
                    crop={true}
                    height={'250px'}
                    />
                </Box>
                <Grid container>
                    <Grid item xs={isMobile?12:7}>
                        <Typography style={{
                            fontWeight:800,
                            color: Colors.black 
                        }} 
                        variant="h6">
                        {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid xs={isMobile?12:5} align={isMobile?'left':'right'} item>
                        <IconButton
                        style={{ 
                            backgroundColor: 'transparent',
                            color: Colors.red,
                            padding: '5px'
                        }} 
                        disableFocusRipple disableRipple 
                        title='Love' 
                        >
                            <Typography>
                                {nFormatter(this.props.likes,1)}<span> </span>
                            </Typography>
                            <FavoriteIcon fontSize='small'/>
                        </IconButton>
                        <IconButton
                        style={{ 
                            backgroundColor: 'transparent',
                            color: Colors.blue,
                            padding: '5px'
                        }} 
                        disableFocusRipple disableRipple 
                        title='Views' 
                        >
                            <Typography>
                                {nFormatter(this.props.views,1)}<span> </span>
                            </Typography>
                            <VisibilityIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                </Grid>
                
                <br/>
                <Divider/>
                <br/>
            </Box>
        );
    }
}

Card.propTypes = {
    image: PropTypes.string,
    likes: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    time: PropTypes.string,
    blogId: PropTypes.string,
    views: PropTypes.number
};

Card.defaultProps = {
    image : undefined,
    likes : 0,
    user : '/default.png',
    id: 'username',
    name : 'User Name',
    views: 0,
    time : 0,
    title: 'title',
    blogId: 'unDef',
};

export default withStyles(styles)(Card);