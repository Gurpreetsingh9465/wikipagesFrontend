import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Colors } from '../../utils/Colors';
import { createTag } from './createTag';

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

class Renderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ui: []
        };
        this.runCodePrettify();
    }

    componentDidMount() { 
        let ui =[];
        this.props.blog.forEach((value, key) => {
            ui.push(createTag(value[0], value[1].attributes, value[1].child, key, this.props.classes));
        });
        this.setState({
            ui: ui
        });
    }

    runCodePrettify() {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }

    render() {
        const isMobile = this.props.isMobile;
        return (
            <div>
                <div style={{
                    fontSize: isMobile?'18px':'21px'
                }}>
                    {this.state.ui}
                </div>
            </div>
        );
    }

}

Renderer.propType = {
    blog: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Renderer);