import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../utils/Colors';

class VideoViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        }
    }

    getVideoSrc = () => {
        if(this.props.src.includes('youtube')) {
            let id = this.props.src.split('?v=')[1];
            return (
                "https://www.youtube.com/embed/"+id
            );
        } else if(this.props.src.includes('vimeo')) {
            let id = this.props.src.split('.com/')[1];
            return (
                "https://player.vimeo.com/video/"+id 
            );
        } else {
            return this.props.src
        }
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
            <Box align="center">
                {isMobile?null:<br/>}
                <iframe 
                title={this.props.title}
                width="100%" 
                height={isMobile?'260':'405'}
                src={this.getVideoSrc()}
                frameBorder="0" 
                allow="autoplay; fullscreen" 
                allowFullScreen>
                </iframe>
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

VideoViewer.propType = {
    isMobile: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}

VideoViewer.defaultProps = {
    caption: ''
}

export default VideoViewer;