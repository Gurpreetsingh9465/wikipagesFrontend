import React from "react";
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

class PasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleChange = (event) => {
        this.props.callBack(event.target.value);
    }

    render() {
        return(
            <TextField
                label={this.props.label}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange}
                InputProps={{endAdornment:(
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        edge="end"
                    >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>)
                }}
            />
        );
    }
}
  
PasswordInput.propTypes = {
    label: PropTypes.string,
    callBack: PropTypes.func
};

PasswordInput.defaultProps = {
    label: 'Password',
    callBack: (value)=>{}
};

export default PasswordInput
  