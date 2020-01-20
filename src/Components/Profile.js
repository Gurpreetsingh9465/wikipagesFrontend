import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Button, Grid, Avatar, withStyles, TextareaAutosize, IconButton, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { Colors } from '../utils/Colors';
import { urlMapper, ClientUrls, ServerUrl } from '../utils/Urls';
import axios from 'axios';
import { PhotoCamera as CameraIcon, Delete } from '@material-ui/icons';
import { timeDifference, validate } from '../utils/Nformatter';

const styles = (theme)=> ({
    image: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        right: 0,
        width: theme.spacing(10),
        height: theme.spacing(10),
        bottom: 0,
        zIndex: 400,
        content: ''
    },
    textArea: {
        "fontFamily": "'Nunito', sans-serif",
        fontSize: '1rem',
        width: '100%',
        border: 0,
        outline: 'none',
        fontWeight: 400,
        resize: 'none',
    }
});

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            dp : '',
            name : '',
            id : '',
            isLogin: false,
            drafts: [],
            blogs: [],
            tabValue: 0,
        }
        this.fileSelector = React.createRef();
    }

    componentDidMount() {
        axios.get(ServerUrl.getUser).then((res)=>{
            this.setState({
                bio: res.data.user.bio,
                dp : res.data.user.dp,
                name : res.data.user.name,
                id : res.data.user.id,
                isLogin: true
            });
        }).catch(()=>{
        });
        this.updateDrafts();
    }

    updateDrafts = () => {
        axios.get(ServerUrl.getDrafts+this.state.drafts.length).then((res)=>{
            this.setState({
                drafts: [...this.state.drafts,...res.data.drafts]
            });
        }).catch((err)=>{
            this.props.handleOpen(err.response.data.error);
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleTabValueChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        });
    }

    deleteDraft = (id, key) => {
        axios.delete(ServerUrl.deleteDraft+id).then(()=>{
            let drafts = this.state.drafts;
            drafts.splice(key,1);
            this.setState({
                drafts: drafts
            });
            this.props.handleOpen('deleted');
        }).catch((err)=>{
            this.props.handleOpen('something went wrong');
        })
    }

    getDraft = (draft, key) => {
        const date = new Date(draft.updatedAt);
        const current = new Date();
        return (<Box key={key}>
            <br/>
            <Grid container>
                <Grid onClick={()=>{
                this.props.history.push(urlMapper({id: draft._id}, ClientUrls.publish));
                }} item xs={10}>
                    <Typography variant='h5'>
                        {validate(draft.title)?draft.title:'Untitled'}
                    </Typography>
                    <Typography style={{textTransform:'capitalize'}} variant='body1'>
                        {'updated '+timeDifference(current-date)}
                    </Typography>
                </Grid>
                <Grid item xs={2} align='right'>
                    <IconButton 
                    style={{
                        color: Colors.red
                    }}
                    title='delete'
                    onClick={()=>{
                        this.deleteDraft(draft._id, key)
                    }}>
                        <Delete/>
                    </IconButton>
                </Grid>
            </Grid>
            <br/>
            <Divider/>
        </Box>);
    }

    handleFileChange = (e) => {
        if(e.target.files.length > 0) {
            const form = new FormData();
            form.append('file', e.target.files[0]);
            axios.post(ServerUrl.upload, form).then((res)=>{
                this.setState({
                    dp: res.data.url,
                });
            }).catch((err)=>{
                this.props.handleOpen(err.response.data.error);
            });
        }
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.current.click();
    }

    save = (e) => {
        e.preventDefault();
        axios.post(ServerUrl.updateUser,{
            name: this.state.name,
            dp: this.state.dp,
            bio: this.state.bio
        }).then(()=>{
            this.props.handleOpen('account updated');
        }).catch((err)=>{
            this.props.handleOpen(err.response.data.error);
        });
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(urlMapper({id: this.state.id}, ClientUrls.userView));
    }

    render() {
        const { classes } = this.props;
        if(this.state.isLogin) {
            const draftUi = [];
            this.state.drafts.forEach((draft, index)=>{
                draftUi.push(this.getDraft(draft, index));
            })
            return(
                <Container style={{
                    maxWidth: '700px',
                }} >
                    <input 
                    style={{display: 'none'}} 
                    type='file' 
                    ref={this.fileSelector} 
                    onChange={this.handleFileChange}
                    accept='image/png, image/jpg, image/jpeg' />
                    <br/>
                    <Grid container>
                        <Grid item xs={this.props.isMobile?9:10}>
                            <input
                                placeholder="Name"
                                autoComplete='off'
                                onChange={this.onChange}
                                id='name'
                                value={this.state.name}
                                style={{
                                    fontSize: this.props.isMobile?'1.5rem':'2.125rem',
                                    width: '100%',
                                    border: 0,
                                    outline: 'none',
                                    fontWeight: 700,
                                    textTransform: 'capitalize'
                                }}
                            />
                            <TextareaAutosize
                                placeholder="Bio"
                                autoComplete='off'
                                onChange={this.onChange}
                                id='bio'
                                value={this.state.bio}
                                className={classes.textArea}
                            />
                        </Grid>
                        <Grid style={{
                            position: 'relative'
                        }} item xs={this.props.isMobile?3:2}>
                            <Avatar 
                            alt={this.state.name} 
                            src={this.state.dp} 
                            className={classes.image}/>
                            <IconButton 
                            style={{
                                color: 'rgba(255,255,255,0.8)',
                                backgroundColor: 'rgba(0,0,0,0.3)'
                            }}
                            onClick={this.handleFileSelect} 
                            className={classes.overlay} >
                                <CameraIcon fontSize='large'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <br/>
                    <Divider/>
                    <br/>
                    <Button 
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    variant='outlined' 
                    onClick={this.save}
                    style={{
                        color: Colors.green,
                        backgroundColor: 'transparent',
                        textTransform: 'capitalize'
                    }}>
                        Save
                    </Button>
                    <Button 
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    variant='outlined' 
                    onClick={this.cancel}
                    style={{
                        backgroundColor: 'transparent',
                        textTransform: 'capitalize',
                        marginLeft: '5px'
                    }}>
                        Cancel
                    </Button>
                    <br/>
                    <br/>
                    <Divider/>
                    <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleTabValueChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                        <Tab 
                        disableFocusRipple 
                        disableRipple 
                        disableTouchRipple 
                        style={{
                            textTransform: 'capitalize'
                        }} 
                        label="Drafts" />
                        <Tab 
                        disableFocusRipple 
                        disableRipple 
                        disableTouchRipple 
                        style={{
                            textTransform: 'capitalize'
                        }} 
                        label="Blogs" />
                    </Tabs>
                    {this.state.tabValue === 0?draftUi:null}
                </Container>
            );
        } else {
            return(<div></div>);
        }
    }
}

Profile.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Profile);