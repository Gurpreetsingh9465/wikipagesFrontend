import React from 'react';
import LoadingElement from './UIelements/LoadingElement';
import { Container } from '@material-ui/core';
import Element from './UIelements/Element';

const element = {
    image : 'https://www.adorama.com/alc/wp-content/uploads/2019/07/nathan-lee-allen-landscape-feature-825x465.jpg',
    views : 1578599,
    likes : 5000,
    text : 'This is the best piece i had ever scene and this is the best programing language ever possible',
    user : '/default.png',
    name : 'Gurpreet Singh',
    id : 'amansingh9569',
    time : '2019-12-25T08:25:36',
    title: 'How to make a react app'
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            isLoaded: false
        };
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        setTimeout(()=>{
            this.setState({
                isLoaded: true
            })
        },5000)
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        const { width } = this.state;
        const isMobile = width <= 600;
        return(
            <Container style={{ width:isMobile?'100%':'60vw', height: '1800px'}}>
                {this.state.isLoaded?<Element {...element} width={isMobile?'100%':'55vh'} />:<LoadingElement number={1} width={isMobile?'100%':'55vh'} />}
            </Container>
        );
    }
}

export default Home;