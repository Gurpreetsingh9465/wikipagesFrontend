import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Avatar, withStyles, Container, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { urlMapper, ClientUrls } from '../../utils/Urls';
import { Colors } from '../../utils/Colors';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';
import Text from './Text';

const styles = theme => ({
    image: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    horizonDot: {
        fontSize: '30px',
        color: Colors.green,
        '@media (min-width:600px)': {
          fontSize: '40px',
        },
    }
});

const months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

const createTag = (tagName, tagAttribute, child, key, classes) => {
    tagName = tagName.match(/[a-zA-Z]+/g)[0];
    switch(tagName) {
        case('typography'):
            return(
                <div key={key}>
                    <Text textList={child} />
                </div>
            );
        case('quote'):
            return(
                <Box align='center' key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('img'):
            return(
                <div key={key}>
                    <ImageViewer {...tagAttribute} />
                </div>
            );
        case('break'):
            return(
                <Container align='center' key={key}>
                    <MoreHorizIcon className={classes.horizonDot} />
                </Container>
            );
        case('enter'):
            return (
                <div key={key}>
                    <br/>
                </div>
            );
        case('video'):
                return (
                    <div key={key}>
                        <VideoViewer title={key} {...tagAttribute} />
                    </div>
                );
        case('code'):
                return (
                    <div key={key}>
                        <pre
                        style={{
                            overflow: 'scroll',
                            width: '100%',
                            margin: '0rem 0rem 1.5rem 0',
                            backgroundColor: Colors.shadow,
                            border: '0',
                            fontSize: '16px'
                        }}
                        className="prettyprint">
                        {child}
                        </pre>
                    </div>
                )
        default:
            return ;
    }
}

class Renderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ui: []
        };
        let dateTime = new Date(Date.parse(props.time));
        this.dateTime =  months[dateTime.getMonth()]+' '+dateTime.getDate()+', ' + dateTime.getFullYear();
        this.runCodePrettify();
    }

    componentDidMount() { 
        let ui =[];
        let id = 0;
        Object.entries(this.props.blog).forEach(([key,value])=>{
            ui.push(createTag(key, value.attributes, value.child, id, this.props.classes));
            id+=1;
        });
        this.setState({
            ui: ui
        });
    }

    runCodePrettify() {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
    
        script.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=default';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }

    render() {
        const { classes } = this.props;
        const isMobile = this.props.isMobile;
        return (
            <div>
                <br/>
                <Typography 
                variant={isMobile?'h5':'h4'}
                style={{fontWeight: 700}} >
                    {this.props.title}
                </Typography>
                <br/>
                <Grid container>
                    <Grid 
                    component={RouterLink} 
                    to={urlMapper({user: this.props.id}, ClientUrls.userView)} 
                    item xs={2} sm={1}>
                        <Avatar alt={this.props.name} src={this.props.user} className={classes.image}/>
                    </Grid>
                    <Grid item xs={8} sm={10} >
                        <Typography variant={isMobile?'body2':'body1'}>
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
                </Grid>
                <Container align='center'>
                    <MoreHorizIcon className={classes.horizonDot} />
                </Container>
                <div style={{
                    fontSize: isMobile?'18px':'21px'
                }}>
                    {this.state.ui}
                </div>
            </div>
        );
    }

}

Renderer.propType = {
    title: PropTypes.string.isRequired,
    blog: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
}

export default withStyles(styles)(Renderer);