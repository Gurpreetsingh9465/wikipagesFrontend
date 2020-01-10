import React from 'react';
import { Typography, Container, Divider, Box, CircularProgress } from '@material-ui/core';
import Card from './UIelements/Card';
import { Colors } from '../utils/Colors';

const blogs = [
    {
        image : 'https://miro.medium.com/max/1880/1*GRghp94F1x2iUQhBGXH8kQ.jpeg',
        likes : 500,
        id: 'amansingh9569',
        user : '/default.png',
        name : 'Aditya Pratap Singh',
        isBookmarked: true,
        views: 878451,
        time : '2019-12-25T08:25:36',
        title: 'How to get things done as soon as possible',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/1500/1*NVi_psRVbTcMbg3Yy7J0ug.png',
        likes : 1000,
        id: 'amansingh9569',
        views: 8781,
        isBookmarked: true,
        user : '/default.png',
        name : 'Aditya Pratap Singh',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    },{
        image : 'https://miro.medium.com/max/4571/0*lAcFXibrRmvZYB3F',
        likes : 1250,
        id: 'amansingh9569',
        isBookmarked: true,
        user : '/default.png',
        views: 7844,
        name : 'Aditya Pratap Singh',
        time : '2019-12-25T08:25:36',
        title: 'How-to make a react app',
        blogId: '6187ahsa81hs1bja81',
    }
]

class Bookmark extends React.Component {

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
        let html_blogs = [];
        blogs.forEach((blog, index) => {
            html_blogs.push((
                <Card key={index} {...blog}/>
            ))
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
        const html_blogs = [];
        this.state.blogs.forEach((blog, index)=>{
            html_blogs.push(<Card {...blog} key={index}/>);
        });
        return(
            <Container 
            style={{
                maxWidth: '600px'
            }} ref={this.container} >
                <Typography 
                style={{
                    fontWeight: '600',
                    fontSize: '24px'
                }}>
                    Bookmarks
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

export default Bookmark;