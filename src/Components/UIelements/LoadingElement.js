import React from 'react';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { Box, withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
    image: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
});

class LoadingElement extends React.Component {
    getElements = (classes, number) => {
        let elements = [];
        for(let i = 0; i<number;i++) {
            elements.push(
                <Box key={i} width={this.props.width}>
                    <Grid container>
                        <Grid item xs={2} md={1}>
                            <Skeleton className={classes.image} variant='circle'/>
                        </Grid>
                        <Grid item xs={6} md={9} >
                            <Skeleton width="60%" variant='text'/>
                            <Skeleton width="40%" variant='text'/>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Skeleton width='80%' variant='text'/>
                            <Skeleton width='60%' variant='text'/>
                        </Grid>
                    </Grid>
                    <br/>
                    <Skeleton variant="rect" height={150} />
                    <Box pt={0.5}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                    <br/>
                </Box>
            );
        }
        return elements;
    }
    render() {
        const { classes } = this.props;
        const elements = this.getElements(classes, this.props.number);
        return(
            <div>
                {elements}
            </div>
        );
    }
}

LoadingElement.propTypes = {
    width: PropTypes.string,
    number: PropTypes.number,
};
  
LoadingElement.defaultProps = {
    width: '100%',
    number: 1,
};

export default withStyles(styles)(LoadingElement);