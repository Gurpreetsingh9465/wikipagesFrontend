import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

class BlogView extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { user, id, title } = this.props.match.params;
        console.log(user,id,title);
    }

    render() {
        const isMobile = this.props.isMobile;
        return(
            <Container maxWidth={isMobile?'md':'sm'} >
                yo
            </Container>
        );
    }

}

BlogView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default BlogView;