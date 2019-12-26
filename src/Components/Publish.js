import React from 'react';
import { Container, TextField, IconButton, Grid, Grow } from '@material-ui/core';
import { AddCircleOutline as AddCircleIcon, PlayCircleFilledOutlined as PlayIcon, WallpaperOutlined as WallpaperIcon, MoreHoriz as HorizIcon } from '@material-ui/icons';
import './assets/css/rotate.css';
import PropTypes from 'prop-types';

class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateClass: '',
            checked: false
        }
    }
    toggle = () => {
        if(this.state.rotateClass === 'rotateClock') {
            this.setState({
                checked: false,
                rotateClass: 'rotateAntiClock'
            });
        } else {
            this.setState({
                checked: true,
                rotateClass: 'rotateClock'
            });
        }
    }

    closeToggle = () => {
        this.setState({
            checked: false,
            rotateClass: this.state.rotateClass===''?'':'rotateAntiClock',
        });
    }

    render() {
        const buttonStyle = {
            backgroundColor: 'transparent',
            paddingLeft:'0',
            paddingRight:'0'
        }
        const isMobile = this.props.isMobile;
        return(
            <Container maxWidth='md'>
                <p aria-label="ctrl+s" style={{color:'#757575'}}>Whatever You write will saved in draft</p>
                <TextField
                placeholder="Title"
                size='medium'
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <Grid container spacing={0}>
                    <Grid style={{maxWidth:'min-content'}} item xs={2} sm={1}>
                        <IconButton
                        title="Add Image, Video etc.."
                        className={this.state.rotateClass} 
                        onClick={this.toggle} 
                        style={buttonStyle} 
                        disableRipple >
                            <AddCircleIcon  
                            fontSize='large'/>
                        </IconButton>
                        <Grow in={this.state.checked}>
                            <IconButton
                            title="Add YouTube Video" 
                            style={buttonStyle} 
                            disableRipple >
                                <PlayIcon fontSize='large'/>
                            </IconButton>
                        </Grow>
                        <Grow in={this.state.checked}>
                            <IconButton
                            title="Add Image"
                            style={buttonStyle} 
                            disableRipple >
                                <WallpaperIcon fontSize='large'/>
                            </IconButton>
                        </Grow>
                        <Grow in={this.state.checked}>
                            <IconButton
                            title="Add Break Point"
                            style={buttonStyle} 
                            disableRipple >
                                <HorizIcon fontSize='large'/>
                            </IconButton>
                        </Grow>
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
                </Grid>
            </Container>
        );
    }
}

Publish.propTypes = {
    isMobile: PropTypes.bool.isRequired,
}

export default Publish;