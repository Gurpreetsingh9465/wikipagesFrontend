import React from 'react';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { Typography, Container, Box, TextareaAutosize } from '@material-ui/core';
import ImageViewer from './ImageViewer';
import { Colors } from '../../utils/Colors';
import VideoViewer from './VideoViewer';
import Text from './Text';

const textArea = {
    "fontFamily": "'Nunito', sans-serif",
    fontSize: '1rem',
    width: '100%',
    border: 0,
    outline: 'none',
    fontWeight: 400,
    resize: 'none',
    color: Colors.grey,
    textAlign: 'center'
}

export const createTag = (tagName, tagAttribute, child, key, classes, onClick = (key)=>{}, overlay = false, changeCaption = ()=>{}, caption = '') => {
    switch(tagName) {
        case('typography'):
            return(
                <Box onClick={(e)=>{onClick(e, key)}} key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('quote'):
            return(
                <Box onClick={(e)=>{onClick(e, key)}} align='center' key={key}>
                    <Text textList={child} />
                </Box>
            );
        case('img'):
            return(
                <Box align='center' key={key}>
                    <ImageViewer overlay={overlay} onClick={(e)=>{onClick(e, key)}} {...tagAttribute} />
                    {overlay?
                    <TextareaAutosize
                        // value={caption}
                        placeholder="Caption"
                        autoComplete='off'
                        style={textArea}
                        onChange={(e)=>{changeCaption(e,key)}}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />
                    :null}
                </Box>
            );
        case('break'):
            return(
                <Container onClick={(e)=>{onClick(e, key)}} align='center' key={key}>
                    <MoreHorizIcon className={classes.horizonDot} />
                </Container>
            );
        case('enter'):
            return (
                <Box onClick={(e)=>{onClick(e, key)}} key={key}>
                    <br/>
                </Box>
            );
        case('video'):
            return (
                <Box key={key}>
                    <VideoViewer overlay={overlay} onClick={(e)=>{onClick(e, key)}} title={key} {...tagAttribute} />
                    {overlay?
                    <TextareaAutosize
                        // value={caption}
                        placeholder="Caption"
                        autoComplete='off'
                        style={textArea}
                        onChange={(e)=>{changeCaption(e,key)}}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />
                    :null}
                </Box>
            );
        case('code'):
            return (
                <Box onClick={(e)=>{onClick(e, key)}} key={key}>
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
                <Box onClick={(e)=>{onClick(e, key)}} key={key}>
                    <Typography
                    className={classes.heading}>
                        {child}
                    </Typography>
                </Box>
            )
        case('subHeading'):
            return (
                <Box onClick={(e)=>{onClick(e, key)}} key={key}>
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