import React from 'react';
import { Container, Paper, Divider, TextareaAutosize, Popover, Typography, IconButton, TextField, Slide, Grid, withStyles, DialogTitle, Button, Dialog, DialogActions, DialogContent, AppBar, Toolbar } from '@material-ui/core';
import { SpeedDial, ToggleButton, ToggleButtonGroup, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Code as CodeIcon, 
        Close as CloseIcon, 
        PlayCircleFilledOutlined as PlayIcon, 
        WallpaperOutlined as WallpaperIcon, 
        FormatQuote as FormatQuoteIcon,
        MoreHoriz as HorizIcon, 
        Delete as DeleteIcon,
        Link as LinkIcon,
        FormatBold as FormatBoldIcon,
        FormatItalic as FormatItalicIcon,
        TextFields as TextFieldsIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import PropTypes from 'prop-types';
import * as elements from './UIelements/GetBlogElements';
import { createTag } from './UIelements/createTag';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledToggleButtonGroup = withStyles(theme => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        padding: theme.spacing(0, 1),
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

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
        padding: '9px 0px 6px',
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
    paper: {
        width: theme.spacing(35),
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
    },
    divider: {
        alignSelf: 'stretch',
        height: 'auto',
        margin: theme.spacing(1, 0.5),
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
            typography: [],
            text: '',
            textType: null,
            textStyle: [],
            videoDialog: false,
            codeDialog: false,
            videoLink: '',
            caption: '',
            code: '',
            videoLinkError: false
        }
        this.fileSelector = React.createRef();
        this.text = React.createRef();
    }

    componentDidMount() {
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

    popEntry = () => {
        let blog = this.state.blog;
        blog.pop();
        this.setState({
            anchor: null,
            selected: -1,
            popoverDialog: false,
            blog: blog,
            ui: this.getUpdatedUi(blog),
        });
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

    addText = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            let blog = this.state.blog;
            if(this.state.textType && this.state.text !== '') {
                switch(this.state.textType) {
                    case('heading'):
                        blog.push(elements.getHeading(this.state.text));
                        break
                    case('subHeading'):
                        blog.push(elements.getSubHeading(this.state.text));
                        break
                    case('quote'):
                        blog.push(elements.getQuote(this.state.text));
                        break
                    default:
                        break
                }
            } else if(this.state.typography.length === 0) {
                blog.push(elements.getEnter());
            } else {
                blog.push(elements.getTypography(this.state.typography));
            }
            this.setState({
                blog: blog,
                ui: this.getUpdatedUi(blog),
                typography: [],
                text: ''
            });
        } else if(e.key === 'Backspace' && this.state.text === '') {
            this.popEntry();
        }
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

    handleTextType = (event, type) => {
        this.setState({
            textType: type,
            textStyle: []
        });
    }

    handleTextStyle = (event, style) => {
        this.setState({
            textStyle: style
        });
    }

    makeBold = () => {
        let startPosition = this.text.current.selectionStart;
        let endPosition = this.text.current.selectionEnd;
        let selectedText = this.text.current.value.substring(startPosition, endPosition);
    }

    testing = () => {
        let startPosition = this.text.current.selectionStart;
        let endPosition = this.text.current.selectionEnd;
        let selectedText = this.text.current.value.substring(startPosition, endPosition);
        console.log(selectedText);
        console.log(this.state.textStyle);
        console.log(this.state.textType);
    }

    render() {
        const { classes } = this.props;
        return(
            <Container maxWidth='md'>
                <div>
                <Paper elevation={0} className={classes.paper}>
                    <StyledToggleButtonGroup
                    size="small"
                    value={this.state.textType}
                    exclusive
                    onChange={this.handleTextType}
                    aria-label="text type"
                    >
                        <ToggleButton value="quote" title="Centered">
                            <FormatQuoteIcon />
                        </ToggleButton>
                        <ToggleButton value="heading" title="Heading">
                            <TextFieldsIcon />
                        </ToggleButton>
                        <ToggleButton value="subHeading" title="Sub Heading">
                            <TextFieldsIcon style={{fontSize: '15px'}} />
                        </ToggleButton>
                        </StyledToggleButtonGroup>
                        <Divider orientation="vertical" className={classes.divider} />
                        <StyledToggleButtonGroup
                        size="small"
                        value={this.state.textStyle}
                        onChange={this.handleTextStyle}
                        aria-label="text style"
                        >
                        <ToggleButton 
                        disabled={this.state.textType?true:false} 
                        value="bold" 
                        title="bold">
                            <FormatBoldIcon />
                        </ToggleButton>
                        <ToggleButton 
                        disabled={this.state.textType?true:false}
                        value="italic" 
                        title="italic">
                            <FormatItalicIcon />
                        </ToggleButton>
                        <ToggleButton 
                        disabled={this.state.textType?true:false}
                        value="link" 
                        title="link">
                            <LinkIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Paper>
                </div>
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
                    <IconButton
                        color="secondary"
                        size='small'
                        onClick={this.deleteEntry}
                    >
                        <DeleteIcon />
                    </IconButton>
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
                        id='text'
                        ref={this.text}
                        value={this.state.text}
                        onChange={this.onChange}
                        onKeyDown={this.addText}
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