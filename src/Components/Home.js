import React from 'react';
import LoadingElement from './UIelements/LoadingElement';
import { Container } from '@material-ui/core';
import Element from './UIelements/Element';
import PropTypes from 'prop-types';

const element = {
    image : 'https://www.adorama.com/alc/wp-content/uploads/2019/07/nathan-lee-allen-landscape-feature-825x465.jpg',
    views : 1578599,
    likes : 5000,
    text : 'This is the best piece i had ever scene and this is the best programing language ever possible',
    user : '/default.png',
    name : 'Gurpreet Singh',
    id : 'amansingh9569',
    time : '2019-12-25T08:25:36',
    title: 'How-to make a react app',
    blogId: '6187ahsa81hs1bja81',
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                isLoaded: true
            })
        },200)
    }

    render() {
        const isMobile = this.props.isMobile;
        return(
            <Container maxWidth={isMobile?'md':'sm'} >
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
                {this.state.isLoaded?<Element {...element} />:<LoadingElement number={1}  />}
            </Container>
        );
    }
}

Home.propTypes = {
    isMobile: PropTypes.bool.isRequired,
}

export default Home;