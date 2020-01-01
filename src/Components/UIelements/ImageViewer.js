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
            imageWidth: ''
        }
        this.image = React.createRef();
    }

    handleLoad = () => {
        let width = '100%';
        let aspectRatio = this.image.current.height/this.image.current.width;
        if(aspectRatio <= 0.8) {
            width = '100%'
        } else if(aspectRatio > 0.8 && aspectRatio <= 1.2) {
            width = '70%'
        } else {
            width = '50%'
        }
        this.setState({
            isLoaded: true,
            imageWidth: width
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
            <Box align='center'>
                <Skeleton 
                style={{display: this.state.isLoaded?'none':''}}
                variant="rect" 
                height={this.props.height?this.props.height:isMobile?240:350} />
                <img 
                style={{display: !this.state.isLoaded?'none':'', maxHeight:'800px'}}
                onLoad={this.handleLoad}
                width={isMobile?'100%':this.state.imageWidth}
                ref={this.image}
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