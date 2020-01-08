import React from 'react';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        const { blogId } = props.match.params;
        this.blogId = blogId;
    }
    render() {
        return(
            <div>
                i am Comments of id {this.blogId}
            </div>
        );
    }
}

export default Comments;