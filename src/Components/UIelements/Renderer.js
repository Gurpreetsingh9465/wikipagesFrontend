import React from 'react';
import PropTypes from 'prop-types';

class Renderer extends React.Component {

    constructor(props) {
        super(props)
    }

}

Renderer.prototype = {
    blog: PropTypes.object.isRequired
}

export default Renderer;