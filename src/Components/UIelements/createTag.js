import React from 'react';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { Typography, Container, Box } from '@material-ui/core';
import ImageViewer from './ImageViewer';
import { Colors } from '../../utils/Colors';
import VideoViewer from './VideoViewer';
import Text from './Text';

export const createTag = (tagName, tagAttribute, child, key, classes) => {
    switch(tagName) {
        case('typography'):
            return(
                <div key={key}>
                    <Text textList={child} />
                </div>
            );
        case('quote'):
            return(
                <Box align='center' key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('img'):
            return(
                <div key={key}>
                    <ImageViewer {...tagAttribute} />
                </div>
            );
        case('break'):
            return(
                <Container align='center' key={key}>
                    <MoreHorizIcon className={classes.horizonDot} />
                </Container>
            );
        case('enter'):
            return (
                <div key={key}>
                    <br/>
                </div>
            );
        case('video'):
            return (
                <div key={key}>
                    <VideoViewer title={key} {...tagAttribute} />
                </div>
            );
        case('code'):
            return (
                <div key={key}>
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
                </div>
            );
        case('heading'):
            return (
                <div key={key}>
                    <Typography
                    className={classes.heading}>
                        {child}
                    </Typography>
                </div>
            )
        case('subHeading'):
            return (
                <div key={key}>
                    <Typography
                    className={classes.subHeading}>
                        {child}
                    </Typography>
                </div>
            )
        default:
            return ;
    }
}