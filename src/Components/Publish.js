import React from 'react';
import { Container, TextField, Grid } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Code as CodeIcon, PlayCircleFilledOutlined as PlayIcon, WallpaperOutlined as WallpaperIcon, MoreHoriz as HorizIcon } from '@material-ui/icons';
import { Colors } from '../utils/Colors';
import PropTypes from 'prop-types';


class Publish extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
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

    render() {
        return(
            <Container maxWidth='md'>
                <p style={{color: Colors.grey}}>Whatever You write will saved in draft</p>
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
                    <Grid item xs={2} sm={1}>
                    <SpeedDial
                    ariaLabel="Add Image, Video etc.."
                    icon={<SpeedDialIcon fontSize='small' />}
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
                        onClick={this.handleClose}
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
                </Grid>
            </Container>
        );
    }
}

Publish.propTypes = {
    isMobile: PropTypes.bool.isRequired,
}

export default Publish;