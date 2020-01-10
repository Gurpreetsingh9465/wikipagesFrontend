import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, CircularProgress, Grid, Button, Avatar, Typography, Tabs, Tab, withStyles, Box } from '@material-ui/core';
import Card from './UIelements/Card';
import { Link as RouterLink } from 'react-router-dom'
import { Colors } from '../utils/Colors';
import { ClientUrls, urlMapper } from '../utils/Urls';

const styles = (theme)=> ({
    image: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    related: {
        fontSize: '35px',
        fontWeight: '500'
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

const peoples = [
    {
        bio: 'I love programming',
        dp : '/default.png',
        name : 'gurpreet singh',
        id : 'amansingh9569',
        blogNo: 8
    },
    {
        bio: 'I am an author and Co-founder of xyz.ai',
        dp : '/default.png',
        name : 'aditya pratap singh',
        id : 'adiprat2345',
        blogNo: 12
    },
    {
        bio: 'I am a blockchain expert at xyz.block',
        dp : '/default.png',
        name : 'harsh bansal',
        id : 'harch1000',
        blogNo: 5
    },
    {
        bio: 'Coding, machine learning, reading, sleeping, listening, potato. https://blog.contactsunny.com and https://www.linkedin.com/in/sunnysrinidhi/',
        dp : '/default.png',
        name : 'Gulshan gupta',
        id : 'gulu6969',
        blogNo: 12
    },
    {
        bio: 'I am a blockchain expert at xyz.block',
        dp : '/default.png',
        name : 'harsh bansal',
        id : 'harch1000',
        blogNo: 5
    },
    {
        bio: 'Coding, machine learning, reading, sleeping, listening, potato. https://blog.contactsunny.com and https://www.linkedin.com/in/sunnysrinidhi/',
        dp : '/default.png',
        name : 'Gulshan gupta',
        id : 'gulu6969',
        blogNo: 12
    },
]

class Search extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.query);
        this.state = {
            blogs: [],
            peoples: [],
            isLoading: true,
            search: props.match.params.query,
            tabValue: 0
        }
        this.container = React.createRef();
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChange = (e, newValue) => {
        if(newValue === 1) {
            this.setState({
                tabValue: newValue,
                peoples: peoples
            })
        } else {
            this.setState({
                tabValue: newValue
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        this.setState({
            blogs: blogs,
            isLoading: false,
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getPeople = (people, index, classes) => {
        return(<Box key={index}>
                <Grid container>
                    <Grid item xs={8} style={{
                        display: 'flex'
                    }}>
                        <Box style={{
                            margin: '0px 10px'
                        }}>
                            <Avatar alt={people.name} src={people.dp} className={classes.image}/>
                        </Box>
                        <Box>
                            <Typography variant='h6' style={{
                                fontWeight: 700,
                                textTransform: 'capitalize'
                            }}>
                                {people.name}
                            </Typography>
                            <Typography variant='body1' style={{
                                color: Colors.grey
                            }}>
                                <RouterLink
                                to={urlMapper({user: people.id}, ClientUrls.userView)} 
                                style={{color: Colors.grey, textDecoration:'underline'}}>
                                <span> @</span>{people.id}
                                </RouterLink>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid align='right' item xs={4}>
                        <Button 
                        size='small'
                        id={people.id}
                        onClick={(e) => {this.goToProfile(e, people.id);}}
                        variant='outlined'
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        disableElevation
                        style={{
                            backgroundColor: 'transparent',
                            color: Colors.green,
                            textTransform: 'none',
                            margin: '10px',
                            fontSize: '12px',
                            borderRadius: '4px'
                        }}>
                            Blogs
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <Typography style={{
                    fontWeight: 500
                }}>
                    {people.bio}
                </Typography>
                <br/>
                <Divider/>
                <br/>
            </Box>);
    }

    expandBlog = () => {
        if(this.state.tabValue === 0) {
            this.setState({
                blogs: [...this.state.blogs, ...blogs],
                isLoading: false
            });
        } else {
            this.setState({
                peoples: [...this.state.peoples, ...peoples],
                isLoading: false
            });
        }
        
    }

    searchQuery = (e) => {
        if(e.key === 'Enter' && e.target.value.replace(/\s/g,"") !== "") {
          e.preventDefault();
          this.setState({searchDialogEnable: false});
          this.props.history.push(urlMapper({query: e.target.value.trim()}, ClientUrls.search));
        }
    }

    goToProfile = (e, id) => {
        e.preventDefault();
        this.props.history.push(urlMapper({user: id}, ClientUrls.userView));
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
        const html_peoples = [];
        if(this.state.tabValue === 0) {
            this.state.blogs.forEach((blog, index)=>{
                html_blogs.push(<Card {...blog} key={index}/>);
            });
        } else {
            this.state.peoples.forEach((people, index)=>{
                html_peoples.push(this.getPeople(people, index, classes));
            });
        }
        return(
        <Container maxWidth='md'>
            <Box style={{
                maxWidth: '600px',
            }} ref={this.container} >
                <br/>
                <Box>
                    <input
                        placeholder="Search"
                        autoComplete='off'
                        onChange={this.onChange}
                        id='search'
                        value={this.state.search}
                        onKeyPress={this.searchQuery}
                        style={{
                            fontSize: '28px', 
                            fontWeight: 400,
                            width: '100%',
                            border: 0,
                            outline: 'none'
                        }}
                    />
                </Box>
                <br/>
                <Divider/>
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab 
                    disableFocusRipple 
                    disableRipple 
                    disableTouchRipple 
                    style={{
                        textTransform: 'capitalize'
                    }} 
                    label="Blogs" />
                    <Tab 
                    disableFocusRipple 
                    disableRipple 
                    disableTouchRipple 
                    style={{
                        textTransform: 'capitalize'
                    }} 
                    label="Peoples" />
                </Tabs>
                <br/>
                {this.state.tabValue === 0?html_blogs:html_peoples}
                <Box align='center'>
                    {this.state.isLoading?<CircularProgress
                    style={{
                        color: Colors.green
                    }}/>:null}
                </Box>
            </Box>
            {/* <Box>
                this is for ads
            </Box> */}
        </Container>
        );
    }

}

Search.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Search);