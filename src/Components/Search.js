import React from 'react';
import { Container, withStyles } from '@material-ui/core';

const styles = (theme) => ({
    
});

class Search extends React.Component {

    constructor(props) {
        super(props);
        const { query } = props.match.params;
        console.log(query);
    }

    render() {
        return(
            <Container>
                {this.props.match.params.query}
            </Container>
        );
    }
}

export default withStyles(styles)(Search);