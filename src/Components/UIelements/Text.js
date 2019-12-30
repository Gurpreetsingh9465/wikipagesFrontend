import React from 'react';
import { Box, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../utils/Colors';

const styles = theme => ({
    typography: {
        fontSize: '18px'
    },
    italic: {
        fontStyle: 'italic'
    },
    body1: {},
    bold: {
        fontWeight: '700'
    },
    link: {
        color: Colors.black,
        fontStyle: 'italic',
        borderRadius: '5px',
        backgroundColor: Colors.lightGreen,
        "&:hover": {
            backgroundColor: Colors.smoothGreen,
        }
    },
});


class Text extends React.Component {

    generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    getElement(classes) {
        let element = [];
        this.props.textList.forEach((ele, index) => {
            if(ele.type === 'body1') {
                element.push((
                    <span key={this.generateKey(index)} className={classes[ele.type]}>
                        {ele.value+' '}
                    </span>
                ));
            } else if(ele.type === 'bold' || ele.type === 'italic') {
                element.push((
                    <span key={this.generateKey(index)} className={classes[ele.type]}>
                        {ele.value+' '}
                    </span>
                ))
            } else if(ele.type === 'link') {
                element.push((
                    <a target='_blank' rel="noopener noreferrer" href={ele.src} key={this.generateKey(index)} className={classes[ele.type]}>
                        {ele.value+' '}
                    </a>
                ))
            }
        });
        return element;
    }

    render() {
        const { classes } = this.props;
        return(
            <Box>
                <Typography
                className={classes.typography}>
                    {this.getElement(classes)}
                </Typography>
            </Box>
        );
    }

}

Text.propType = {
    textList: PropTypes.arrayOf(Object).isRequired,
}


export default withStyles(styles)(Text);