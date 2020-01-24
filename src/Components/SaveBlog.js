import React from 'react';
import { Container, CircularProgress, Box, Typography, Button, withStyles } from '@material-ui/core';
import Renderer from './UIelements/Renderer';
import { ServerUrl } from '../utils/Urls';
import axios from 'axios';
import { Colors } from '../utils/Colors';
import { validate } from '../utils/Nformatter';

const tags = ['programming', 'startup','enterpreneurship','c++','golang','python','artificialinteligence','mahinelearning'] 

const styles = (theme) => ({
    tag: {
        margin: '1.0rem 0.6rem 1.0rem 0rem',
        border: '0',
        textTransform: 'capitalize',
        backgroundColor: Colors.lightGrey,
        color: Colors.black
    }
});

class SaveBlog extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            blog: [],
            id: props.match.params.id,
            isLoading: true,
            title: '',
            tags: tags
        }
    }

    componentDidMount() {
        axios.get(ServerUrl.getDraft+this.state.id).then((res)=>{
            this.setState({
                blog: res.data.draft.blog,
                title: res.data.draft.title,
                isLoading: false
            });
        }).catch((err)=>{
            this.props.handleOpen(err.response.data.error);
        })
    }

    addTag = (e) => {
        if(e.key === 'Enter' && validate(e.target.value)) {
            const tags = this.state.tags;
            tags.push(e.target.value.trim());
            this.setState({
                tags: tags
            })
        }
    }

    render() {
        const isMobile = this.props.isMobile;
        const htmlTag = [];
        this.state.tags.forEach((tag, index)=>{
            htmlTag.push(<Button 
            key={index} 
            variant="contained" 
            className={this.props.classes.tag}
            disabled>
                {tag}
              </Button>);
        })
        return(
            <Container maxWidth='md'>
                <Box style={{
                    maxWidth: '600px'
                }}>
                    <Typography 
                    variant={isMobile?'h5':'h4'}
                    style={{fontWeight: 700}} >
                        {this.state.title}
                    </Typography>
                    {this.state.isLoading?<CircularProgress
                    style={{
                        color: Colors.green
                    }}/>:<Renderer isMobile={isMobile} blog={this.state.blog} />}
                </Box>
                <Box style={{
                    position: 'fixed',
                    top: '200px',
                    right: '50px',
                    maxWidth: '650px'
                }}>
                    <input
                        placeholder="Search"
                        autoComplete='off'
                        id='search'
                        value={this.state.search}
                        onKeyPress={this.addTag}
                        style={{
                            fontSize: '28px', 
                            fontWeight: 400,
                            width: '100%',
                            border: 0,
                            outline: 'none'
                        }}
                    />
                    <div>
                        {htmlTag}
                    </div>
                    <Button style={{
                        textTransform: 'capitalize',
                    }} variant='outlined' size='small'>
                        publish blog
                    </Button>
                </Box>
                
            </Container>
        );
    }
}

export default withStyles(styles)(SaveBlog);