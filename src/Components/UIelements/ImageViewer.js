import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../utils/Colors';

class ImageViewer extends React.Component {

    render() {
        const isMobile = this.props.isMobile;
        return(
            <Box>
                <img 
                width='100%' src={this.props.src} alt={this.props.caption}/>
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
    caption: PropTypes.string.isRequired
}

ImageViewer.defaultProps = {
    caption: ''
}

export default ImageViewer;