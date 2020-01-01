import React from 'react';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { Typography, Container, Box } from '@material-ui/core';
import ImageViewer from './ImageViewer';
import { Colors } from '../../utils/Colors';
import VideoViewer from './VideoViewer';
import Text from './Text';

export const createTag = (tagName, tagAttribute, child, key, classes, onClick = (key)=>{}) => {
    switch(tagName) {
        case('typography'):
            return(
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('quote'):
            return(
                <Box onClick={()=>{onClick(key)}} align='center' key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('img'):
            return(
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <ImageViewer {...tagAttribute} />
                </Box>
            );
        case('break'):
            return(
                <Container onClick={()=>{onClick(key)}} align='center' key={key}>
                    <MoreHorizIcon className={classes.horizonDot} />
                </Container>
            );
        case('enter'):
            return (
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <br/>
                </Box>
            );
        case('video'):
            return (
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <VideoViewer title={key} {...tagAttribute} />
                </Box>
            );
        case('code'):
            return (
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <pre
                    style={{
                        overflow: 'scroll',
                        width: '100%',
                        margin: '0.5rem 0rem 1.5rem 0',
                        backgroundColor: Colors.shadow,
                        border: '0',
                        fontSize: '16px'
                    }}
                    className="prettyprint">
                    {child}
                    </pre>
                </Box>
            );
        case('heading'):
            return (
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <Typography
                    className={classes.heading}>
                        {child}
                    </Typography>
                </Box>
            )
        case('subHeading'):
            return (
                <Box onClick={()=>{onClick(key)}} key={key}>
                    <Typography
                    className={classes.subHeading}>
                        {child}
                    </Typography>
                </Box>
            )
        default:
            return ;
    }
}