import React from 'react';
import PropTypes from 'prop-types';

const createTag = (tagName, tagAttribute, child) => {
    let element = '<'+tagName+' ';
    Object.entries(tagAttribute).forEach(([key,value])=>{
        element+=(key+'={'+value+'} ');
    });
    element+=('>'+child);
    element+=('<'+tagName+'/>');
    return element;
}

class Renderer extends React.Component {

    constructor(props) {
        super(props);
        this.ui = [];
    }

    componentDidMount() {
        Object.entries(this.props.blog).forEach(([key,value])=>{
            this.ui.push(createTag(key,{},value));
        });
        console.log(this.ui)
    }

    render() {
        return (
            <div>
                {this.ui}
            </div>
        );
    }

}

Renderer.propType = {
    blog: PropTypes.object.isRequired
}

export default Renderer;