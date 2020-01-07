import React from 'react';
import PropTypes from 'prop-types';
import { Box, withStyles, Grid, Avatar, Typography } from '@material-ui/core';
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

class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
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

    render() {
        const { classes } = this.props;
        const { width } = this.state;
        const isMobile = width <= 600;
        return(
            <Box width={this.props.width}>
                <Grid container>
                    <Grid 
                    component={RouterLink} 
                    to={urlMapper({user: this.props.id}, ClientUrls.userView)} 
                    item xs={2} md={1}>
                        <Avatar alt={this.props.name} src={this.props.user} className={classes.image}/>
                    </Grid>
                    <Grid item xs={6} md={9} >
                        <Typography
                        variant={isMobile?'body2':'body1'}>
                        {this.props.name}<span> </span>
                        {isMobile?null:<RouterLink
                        to={urlMapper({user: this.props.id}, ClientUrls.userView)} 
                        style={{color: Colors.grey, textDecoration:'underline'}}>
                        @{this.props.id}
                        </RouterLink>}</Typography>
                        <Typography
                        variant={isMobile?'body2':'body1'}
                        style={{color: Colors.grey}}>
                            {this.dateTime}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Typography
                        variant={isMobile?'body2':'body1'}
                        style={{
                            fontWeight: 400,
                            color: Colors.grey,
                        }}>
                        { nFormatter(this.props.views,1) + ' views'}</Typography>
                        <Typography
                        variant={isMobile?'body2':'body1'}
                        style={{
                            fontWeight: 400,
                            color: Colors.grey,
                        }}>{ nFormatter(this.props.likes,1) + ' likes'}</Typography>
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
                    height={150}
                    />
                    <Typography style={{
                        fontWeight:800,
                        color: Colors.black 
                    }} 
                    variant="h6">
                    {this.props.title}
                    </Typography>
                    <Typography
                    variant={isMobile?'body2':'body1'}
                    style={{color: Colors.grey}}>
                        {this.props.text}
                    </Typography>
                </Box>
                <br/>
            </Box>
        );
    }
}

Element.propTypes = {
    width: PropTypes.string,
    image: PropTypes.string,
    views: PropTypes.number,
    likes: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    time: PropTypes.string,
    blogId: PropTypes.string,
};

Element.defaultProps = {
    width: '100%',
    image: undefined,
    views: 0,
    likes: 0,
    text: '',
    user: 'default.png',
    title: 'title',
    name: 'User Name',
    id: 'username',
    time: 0,
    blogId: 'undef',
};

export default withStyles(styles)(Element);