import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';

class UserView extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { user } = this.props.match.params;
        console.log(user);
    }

    render() {
        const isMobile = this.props.isMobile;
        return(
            <Container maxWidth={isMobile?'md':'sm'} >
                i am user
            </Container>
        );
    }

}

UserView.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default UserView;