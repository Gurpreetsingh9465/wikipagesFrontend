import React from 'react';
import { Container, Typography, Divider } from '@material-ui/core';

class Comments extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            user: {},
        }
        const { blogId } = props.match.params;
        this.blogId = blogId;
    }

    componentDidMount() {
        this.setState({
            user: {
                id: 'amansingh9569',
                image: '/default.png',

            }
        });
    }

    render() {
        return(
            <Container style={{
                maxWidth: '800px',
            }}>
                <Typography variant='h5' style={{fontWeight: '700'}} align='center'>
                    Thanks for using wikiPages.in
                </Typography>
                <Divider/>
                <br/>
                <Typography align='center' variant='h6' >
                    This feature will be available shortly.
                </Typography>
            </Container>
        );
    }
}

export default Comments;