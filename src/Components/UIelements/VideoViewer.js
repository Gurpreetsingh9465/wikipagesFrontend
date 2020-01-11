import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../utils/Colors';

const overlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    right: 0,
    width: '100%',
    bottom: 0,
    zIndex: 400,
    content: ''
}

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
            <div>
                <Box style={{display: 'block', position: 'relative'}} align="center">
                    {isMobile?null:<br/>}
                    <iframe
                    title={this.props.title}
                    width="100%" 
                    height={isMobile?'260':'394'}
                    src={this.getVideoSrc()}
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen>
                    </iframe>
                    {this.props.overlay?<div 
                    onClick={(e)=>{this.props.onClick(e);}} 
                    style={overlay}>
                    </div>:null}
                    {this.props.overlay?null:<Typography
                    style={{
                        color: Colors.grey,
                        marginBottom: '2%'
                    }}
                    align='center'>
                        {this.props.caption}
                    </Typography>}
                </Box>
            </div>
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