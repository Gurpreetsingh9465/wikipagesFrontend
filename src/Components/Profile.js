import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Button, Grid, Avatar, withStyles, TextareaAutosize, IconButton } from '@material-ui/core';
import { Colors } from '../utils/Colors';
import { urlMapper, ClientUrls } from '../utils/Urls';
import { PhotoCamera as CameraIcon } from '@material-ui/icons';

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
        textTransform: 'capitalize'
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
        }
        this.fileSelector = React.createRef();
    }

    componentDidMount() {
        this.setState({
            bio: 'I love programming',
            dp : '/default.png',
            name : 'gurpreet singh',
            id : 'amansingh9569',
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleFileChange = (e) => {
        if(e.target.files.length > 0) {
            this.setState({
                dp: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.current.click();
    }

    save = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.history.push(urlMapper({user: this.state.id}, ClientUrls.userView));
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push(urlMapper({user: this.state.id}, ClientUrls.userView));
    }

    render() {
        const { classes } = this.props;
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
            </Container>
        );
    }

}

Profile.propType = {
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Profile);