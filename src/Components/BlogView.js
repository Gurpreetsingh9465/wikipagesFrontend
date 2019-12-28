import React from 'react';
import PropTypes from 'prop-types';
import { Container, CircularProgress } from '@material-ui/core';
import Renderer from './UIelements/Renderer';
import { Colors } from '../utils/Colors';
import Blog from './Seed';

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
        // const isMobile = this.props.isMobile;
        return(
            <Container align={this.state.isLoaded?'':"center"} maxWidth='md' >
                {!this.state.isLoaded?<CircularProgress
                style={{
                    color: Colors.green
                }}
                />:(
                        <Renderer blog={Blog} />
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