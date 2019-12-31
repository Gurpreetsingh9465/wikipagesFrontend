import React from 'react';
import { Container, TextField, Grid, withStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Code as CodeIcon, PlayCircleFilledOutlined as PlayIcon, WallpaperOutlined as WallpaperIcon, MoreHoriz as HorizIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import PropTypes from 'prop-types';
import * as elements from './UIelements/GetBlogElements';
import { createTag } from './UIelements/createTag';

const styles = theme => ({
    horizonDot: {
        fontSize: '30px',
        color: Colors.green,
        '@media (min-width:600px)': {
          fontSize: '40px',
        },
    },
    heading: {
        fontSize: '24px',
        fontWeight: 700,
        '@media (min-width:600px)': {
          fontSize: '34px',
        },
    },
    subHeading: {
        fontSize: '20px',
        fontWeight: 500,
        '@media (min-width:600px)': {
          fontSize: '30px',
        },
    }
});

class Publish extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            blog: [],
            ui: []
        }
        this.runCodePrettify();
    }

    runCodePrettify() {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }

    handleOpen = () => {
        this.setState({
            open: true
        }); 
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    getUpdatedUi = (blog) => {
        let ui =[];
        blog.forEach((value, key) => {
            ui.push(createTag(value[0], value[1].attributes, value[1].child, key, this.props.classes));
        });
        return ui;
    }

    addBreakPoint = () => {
        let blog = this.state.blog;
        blog.push(elements.getBreakPoint());
        this.setState({
            blog: blog,
            ui: this.getUpdatedUi(blog)
        });
    }

    addVideo = (src, caption=undefined) => {
        let blog = this.state.blog;
        blog.push(elements.getVideo(src, caption));
        this.setState({
            blog: blog,
            ui: this.getUpdatedUi(blog)
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Container maxWidth='md'>
                <p style={{color: Colors.grey}}>Press Ctrl+s To save in draft</p>
                <TextField
                placeholder="Title"
                size='medium'
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                {this.state.ui}
                <Grid container spacing={0}>
                    <Grid item xs={2} sm={1}>
                        <SpeedDial
                        className={classes.speedDial}
                        size="small"
                        ariaLabel="Add Image, Video etc.."
                        icon={<SpeedDialIcon />}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        open={this.state.open}
                        direction='down'
                        >
                        <SpeedDialAction
                            icon={<PlayIcon/>}
                            tooltipTitle="Add YouTube, Vimeo Video"
                            onClick={this.handleClose}
                        />
                        <SpeedDialAction
                            icon={<WallpaperIcon/>}
                            tooltipTitle="Add Image"
                            onClick={this.handleClose}
                        />
                        <SpeedDialAction
                            icon={<HorizIcon/>}
                            tooltipTitle="Add Break Point"
                            onClick={this.addBreakPoint}
                        />
                        <SpeedDialAction
                            icon={<CodeIcon/>}
                            tooltipTitle="Add Code"
                            onClick={this.handleClose}
                        />
                        </SpeedDial>
                    </Grid>
                    <Grid item xs={10} sm={11}>
                        <TextField
                        placeholder="Express Your Thoughts.."
                        fullWidth
                        onFocus={this.closeToggle}
                        size='medium'
                        margin="normal"
                        style={{marginLeft:'5px'}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </Grid>
                    <TextField
                    placeholder="Paste Video Link from Youtube/Vimeo And Press Enter"
                    fullWidth
                    size='medium'
                    margin="normal"
                    onKeyDown = {(e)=>{
                        if (e.key === 'Enter') {
                            this.addVideo(e.target.value);
                        }
                    }}
                    style={{marginLeft:'5px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>
            </Container>
        );
    }
}

Publish.propTypes = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Publish);