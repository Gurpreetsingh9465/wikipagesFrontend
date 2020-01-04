import React from 'react';
import { Container, TextareaAutosize, Popover, Typography, IconButton, TextField, Slide, Grid, withStyles, DialogTitle, Button, Dialog, DialogActions, DialogContent, AppBar, Toolbar } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Code as CodeIcon, Close as CloseIcon, PlayCircleFilledOutlined as PlayIcon, WallpaperOutlined as WallpaperIcon, MoreHoriz as HorizIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import PropTypes from 'prop-types';
import * as elements from './UIelements/GetBlogElements';
import { createTag } from './UIelements/createTag';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    text: {
        width: '100%',
        border: 0,
        fontSize: '18px',
        outline: 'none',
        padding: '8px 0px 7px',
    },
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
    },
    codeArea: {
        width: '100%',
        border: 0,
        outline: 'none'
    },
});

class Publish extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            blog: [],
            anchor: null,
            selected: -1,
            popoverDialog: false,
            ui: [],
            videoDialog: false,
            codeDialog: false,
            videoLink: '',
            caption: '',
            code: '',
            videoLinkError: false
        }
    }

    componentDidMount() {
        this.fileSelector = React.createRef();
        document.addEventListener("keydown", this._handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown);
    }

    _handleKeyDown = (event) => {
        if((event.ctrlKey || event.metaKey) && event.which === 83) {
            event.preventDefault();
            this.saveBlog();
        }
    }

    saveBlog = () => {
        console.log(this.state.blog);
    } 

    handleFileChange = (e) => {
        if(e.target.files.length > 0) {
            this.addImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    handleOpenCodeDialog = () => {
        this.setState({
            codeDialog: true
        });
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.current.click();
    }

    handleCloseCodeDialog = () => {
        this.setState({
            codeDialog: false,
            code: ''
        });
    }

    addCode = () => {
        let blog = this.state.blog;
        blog.push(elements.getCode(this.state.code));
        this.setState({
            blog: blog,
            ui: this.getUpdatedUi(blog),
            code: '',
            codeDialog: false
        });
        this.runCodePrettify();
    }

    addImage = (src) => {
        let blog = this.state.blog;
        blog.push(elements.getImage(src));
        this.setState({
            blog: blog,
            ui: this.getUpdatedUi(blog),
        });
    }

    handleOpenVideoDialog = () => {
        this.setState({
            videoDialog: true
        });
    }

    handleCloseVideoDialog = () => {
        this.setState({
            videoDialog: false,
            videoLinkError: false,
            videoLink: '',
            caption: ''
        });
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
    
    deleteEntry = () => {
        if(this.state.selected !== -1) {
            let blog = this.state.blog;
            blog.splice(this.state.selected,1);
            this.setState({
                anchor: null,
                selected: -1,
                popoverDialog: false,
                blog: blog,
                ui: this.getUpdatedUi(blog),
            });
        }
    }

    clickEvent = (e, key) => {
        this.setState({
            selected: key,
            anchor: e.currentTarget,
            popoverDialog: true
        });
    }

    handleClosePopOverDialog = () => {
        this.setState({
            selected: -1,
            anchor: null,
            popoverDialog: false,
        });
    }

    getUpdatedUi = (blog) => {
        let ui =[];
        blog.forEach((value, key) => {
            ui.push(createTag(value[0], 
                value[1].attributes, 
                value[1].child, 
                key, 
                this.props.classes, 
                this.clickEvent,
                true));
        });
        return ui;
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    addBreakPoint = () => {
        let blog = this.state.blog;
        blog.push(elements.getBreakPoint());
        this.setState({
            blog: blog,
            ui: this.getUpdatedUi(blog)
        });
    }

    addVideo = () => {
        if(this.state.videoLink.includes('vimeo') || this.state.videoLink.includes('youtube')) {
            let blog = this.state.blog;
            blog.push(elements.getVideo(this.state.videoLink, this.state.caption));
            this.setState({
                blog: blog,
                ui: this.getUpdatedUi(blog),
                videoLink: '',
                caption: '',
                videoDialog: false,
                videoLinkError: false
            });
        } else {
            this.setState({
                videoLinkError: true
            });
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Container maxWidth='md'>
                <Popover
                    open={this.state.popoverDialog}
                    anchorEl={this.state.anchor}
                    onClose={this.handleClosePopOverDialog}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.deleteEntry}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </Popover>
                <input 
                style={{display: 'none'}} 
                type='file' 
                ref={this.fileSelector} 
                onChange={this.handleFileChange}
                accept='image/png, image/jpg, image/jpeg, image/gif' />
                <Dialog id='video' open={this.state.videoDialog} onClose={this.handleCloseVideoDialog}>
                    <DialogTitle>
                        Paste Video URL from Youtube/Vimeo
                    </DialogTitle>
                    <DialogContent>
                    <TextField
                        error={this.state.videoLinkError}
                        autoFocus
                        id="videoLink"
                        margin="dense"
                        onChange={this.onChange}
                        label="Video URL"
                        fullWidth
                        helperText={this.state.videoLinkError?'Invalid URL':''}
                    />
                    <TextField
                        id="caption"
                        onChange={this.onChange}
                        margin="dense"
                        label="Caption"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCloseVideoDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.addVideo} color="primary">
                        Add Video
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullScreen open={this.state.codeDialog} onClose={this.handleCloseCodeDialog} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleCloseCodeDialog} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            Enter Your Code
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.addCode}>
                            Add Code
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{margin:'0.2rem'}} >
                        <TextareaAutosize
                        autoFocus
                        rowsMin={30}
                        placeholder="Code"
                        id='code'
                        className={classes.codeArea}
                        onChange={this.onChange}
                        />
                    </DialogContent>
                </Dialog>
                <p style={{color: Colors.grey}}>Press Ctrl+s To save in draft</p>
                <Grid container spacing={0}>
                    <Grid item xs={2} sm={1}>
                    </Grid>
                    <Grid item xs={10} sm={11}>
                    <input
                    placeholder="Title"
                    style={{
                        fontSize: '34px', 
                        fontWeight: 700,
                        width: '100%',
                        border: 0,
                        outline: 'none'
                    }}
                    />
                    </Grid>
                </Grid>
                <br/>
                {this.state.ui}
                <Grid container spacing={0}>
                    <Grid item xs={2} sm={1}>
                        <SpeedDial
                        className={classes.speedDial}
                        ariaLabel="Add Image, Video etc.."
                        icon={<SpeedDialIcon />}
                        FabProps={{ 
                            size: "small", 
                            style: { backgroundColor: Colors.blue 
                        }}}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        open={this.state.open}
                        direction='down'
                        >
                        <SpeedDialAction
                            icon={<PlayIcon/>}
                            tooltipTitle="Add YouTube, Vimeo Video"
                            onClick={this.handleOpenVideoDialog}
                        />
                        <SpeedDialAction
                            icon={<WallpaperIcon/>}
                            tooltipTitle="Add Image"
                            onClick={this.handleFileSelect}
                        />
                        <SpeedDialAction
                            icon={<HorizIcon/>}
                            tooltipTitle="Add Break Point"
                            onClick={this.addBreakPoint}
                        />
                        <SpeedDialAction
                            icon={<CodeIcon/>}
                            tooltipTitle="Add Code"
                            onClick={this.handleOpenCodeDialog}
                        />
                        </SpeedDial>
                    </Grid>
                    <Grid item xs={10} sm={11}>
                        <TextareaAutosize
                        className={classes.text}
                        placeholder="Express Your Thoughts.."
                        onFocus={this.closeToggle}
                        size='medium'
                        margin="normal"
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

Publish.propTypes = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Publish);