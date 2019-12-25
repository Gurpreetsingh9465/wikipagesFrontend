import React from 'react';
import PropTypes from 'prop-types';
import { Box, withStyles, Grid, Avatar, Typography } from '@material-ui/core';

const nFormatter = (num, digits) => {
    let si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const styles = theme => ({
    image: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
});

const months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
        let dateTime = new Date(Date.parse(props.time));
        this.dateTime =  months[dateTime.getMonth()]+' '+dateTime.getDate()+', ' + dateTime.getFullYear();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        const { classes } = this.props;
        const { width } = this.state;
        const isMobile = width <= 600;
        return(
            <Box width={this.props.width}>
                <Grid container>
                    <Grid item xs={2} md={1}>
                        <Avatar alt={this.props.name} src={this.props.user} className={classes.image}/>
                    </Grid>
                    <Grid item xs={6} md={9} >
                        <Typography>
                        {this.props.name}<span> </span>
                        {isMobile?null:<span 
                        style={{color:'#757575', textDecoration:'underline'}}>
                        @{this.props.id}
                        </span>}</Typography>
                        <Typography
                        style={{color:'#757575'}}>
                            {this.dateTime}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Typography
                        style={{
                            fontWeight: 400,
                            color: '#7E7E7E',
                            fontSize: '15px'
                        }}>
                        { nFormatter(this.props.views,1) + ' views'}</Typography>
                        <Typography
                        style={{
                            fontWeight: 400,
                            color: '#7E7E7E',
                            fontSize: '15px'
                        }}>{ nFormatter(this.props.likes,1) + ' likes'}</Typography>
                    </Grid>
                </Grid>
                <br/>
                <img
                    src={this.props.image}
                    alt={this.props.title}
                    width='100%'
                    height={150}
                />
                <Box pt={0.5}>
                    <Typography style={{
                        fontWeight:800
                    }} 
                    variant="h6">
                    {this.props.title}
                    </Typography>
                    <Typography style={{color:'#7E7E7E'}}>
                        {this.props.text}
                    </Typography>
                </Box>
                <br/>
            </Box>
        );
    }
}

Element.propTypes = {
    width: PropTypes.string,
    image: PropTypes.string,
    views: PropTypes.number,
    likes: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    time: PropTypes.string,
};

Element.defaultProps = {
    width: '100%',
    image: undefined,
    views: 0,
    likes: 0,
    text: '',
    user: 'default.png',
    title: 'title',
    name: 'User Name',
    id: 'username',
    time: 0,
};

export default withStyles(styles)(Element);