import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, CircularProgress, Grid, Typography, Avatar, withStyles, Box } from '@material-ui/core';
import Card from './UIelements/Card';
import { Colors } from '../utils/Colors';

const styles = (theme)=> ({
    image: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
});

const blogs = [
    {
        image : 'https://miro.medium.com/max/1880/1*GRghp94F1x2iUQhBGXH8kQ.jpeg',
        likes : 500,
        id: 'amansingh9569',
        user : '/default.png',
        name : 'Aditya Pratap Singh',
        views: 878451,
        time : '2019-12-25T08:25:36',
        title: 'How to get things done as soon as possible',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/1500/1*NVi_psRVbTcMbg3Yy7J0ug.png',
        likes : 1000,
        id: 'amansingh9569',
        views: 8781,
        user : '/default.png',
        name : 'Aditya Pratap Singh',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/4571/0*lAcFXibrRmvZYB3F',
        likes : 1250,
        id: 'amansingh9569',
        user : '/default.png',
        views: 7844,
        name : 'Aditya Pratap Singh',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    }
]


class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            blogs: blogs,
            isLoading: false
        }
        this.container = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        this.setState({
            user: {
                bio: 'I love programming',
                dp : '/default.png',
                name : 'gurpreet singh',
                id : 'amansingh9569',
            }
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    expandBlog = () => {
        this.setState({
            blogs: [...this.state.blogs, ...blogs],
            isLoading: false
        });
    }

    handleScroll = (e) => {

        const bottom = this.container.current?Math.floor(this.container.current.getBoundingClientRect().bottom) <= window.innerHeight:false;
        if (bottom && this.state.isLoading === false) {
            this.setState({
                isLoading: true
            });
            setTimeout(()=>{this.expandBlog()},1000);
        }
    }

    render() {
        const { classes } = this.props;
        const html_blogs = [];
        this.state.blogs.forEach((blog, index)=>{
            html_blogs.push(<Card {...blog} key={index}/>);
        });
        return(
            <Container style={{
                maxWidth: '600px',
            }} ref={this.container} >
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant='h6' style={{
                            fontWeight: 700,
                            textTransform: 'capitalize'
                        }}>
                            {this.state.user.name}
                        </Typography>
                        <Typography variant='body1' style={{
                            color: Colors.grey
                        }}>
                            <span> @</span>
                            {this.state.user.id}
                        </Typography>
                    </Grid>
                    <Grid align='right' item xs={6}>
                        <Avatar alt={this.state.user.name} src={this.state.user.dp} className={classes.image}/>
                    </Grid>
                </Grid>
                <br/>
                <Typography style={{
                    fontWeight: 500
                }}>
                    {this.state.user.bio}
                </Typography>
                <br/>
                <Divider/>
                <br/>
                {html_blogs}
                <Box align='center'>
                    {this.state.isLoading?<CircularProgress
                    style={{
                        color: Colors.green
                    }}/>:null}
                </Box>
            </Container>
        );
    }

}

UserView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(UserView);