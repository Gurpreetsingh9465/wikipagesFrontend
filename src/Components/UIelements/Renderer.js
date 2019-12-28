import React from 'react';
import PropTypes from 'prop-types';

class Renderer extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.blog);
    }

    render() {
        return (
            <p>as</p>
        );
    }

}

Renderer.propType = {
    blog: PropTypes.object.isRequired
}

export default Renderer;