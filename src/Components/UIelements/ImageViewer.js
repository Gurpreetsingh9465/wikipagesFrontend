import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { Colors } from '../../utils/Colors';

class ImageViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            width: window.innerWidth,
        }
    }

    handleLoad = () => {
        this.setState({
            isLoaded: true
        })
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
        const { width } = this.state;
        const isMobile = width <= 600;
        return(
            <Box>
                <Skeleton 
                style={{display: this.state.isLoaded?'none':''}}
                variant="rect" 
                height={this.props.height?this.props.height:isMobile?240:350} />
                <img 
                style={{display: !this.state.isLoaded?'none':''}}
                onLoad={this.handleLoad}
                width='100%'
                height={this.props.height}
                src={this.props.src}
                alt={this.props.title?this.props.title:this.props.caption}/>
                <Typography
                style={{
                    color: Colors.grey,
                    marginBottom: '2%'
                }}
                align='center'>
                    {this.props.caption}
                </Typography>
            </Box>
        );
    }

}

ImageViewer.propType = {
    isMobile: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    height: PropTypes.number,
    title: PropTypes.string
}

ImageViewer.defaultProps = {
    caption: ''
}

export default ImageViewer;