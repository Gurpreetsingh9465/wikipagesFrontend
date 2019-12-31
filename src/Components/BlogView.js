import React from 'react';
import PropTypes from 'prop-types';
import { Container, CircularProgress, withStyles, Typography, Grid, Avatar } from '@material-ui/core';
import Renderer from './UIelements/Renderer';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import Blog from './Seed';
import { Link as RouterLink } from 'react-router-dom';
import { urlMapper, ClientUrls } from '../utils/Urls';

const styles = (theme) => ({
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
    },
});

const user = {
    user : '/default.png',
    name : 'Gurpreet Singh',
    id : 'amansingh9569',
    time : '2019-12-25T08:25:36',
    title: 'How To Make a React App',
} 

const months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
        let dateTime = new Date(Date.parse(user.time));
        this.dateTime =  months[dateTime.getMonth()]+' '+dateTime.getDate()+', ' + dateTime.getFullYear();
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
                        <Grid item xs={8} sm={10} >
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
                    </Grid>
                    <Container align='center'>
                        <MoreHorizIcon className={classes.horizonDot} />
                    </Container>
                    <Renderer isMobile={isMobile} blog={Blog} />
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