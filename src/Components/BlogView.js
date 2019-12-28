import React from 'react';
import PropTypes from 'prop-types';
import { Container, CircularProgress } from '@material-ui/core';
import Renderer from './UIelements/Renderer';
import { Colors } from '../utils/Colors';
import Blog from './Seed';
const user = {
    user : '/default.png',
    name : 'Gurpreet Singh',
    id : 'amansingh9569',
    time : '2019-12-25T08:25:36',
    title: 'How To Make a React App',
} 

class BlogView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
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
        return(
            <Container style={{
                maxWidth: '720px',
            }} 
            align={this.state.isLoaded?'':"center"} >
            {!this.state.isLoaded?<CircularProgress
            style={{
                color: Colors.green
            }}
            />:(
                    <Renderer {...user} isMobile={isMobile} blog={Blog} />
                )
            }
            </Container>
        );
    }

}

BlogView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default BlogView;