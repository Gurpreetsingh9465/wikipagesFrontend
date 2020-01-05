export const getBreakPoint = () => {
    return (['break', {}]);
}


export const getImage = (src, caption= undefined) => {
    return ([
        'img',
        {
            attributes: {
                caption: caption,
                src: src    
            }
        }
    ]);
}

export const getVideo = (src, caption = undefined) => {
    return (
        ['video', {
            attributes: {
                caption: caption,
                src: src
            }
        }]
    );
}

export const getCode = (code) => {
    return(['code', {
        child: code
    }]);
}

export const getHeading = (heading) => {
    return(['heading', {
            child: heading
        }]);
}

export const getSubHeading = (subheading) => {
    return (['subHeading', {
        child: subheading
    }]);
}

export const getTypography = (child) => {
    return(['typography', {
        child: child
    }])
}

export const getText = (value, type='body1') => {
    return ({
        type: type,
        value: value
    })
}

export const getLink = (src, value) => {
    return ({
        type: 'link',
        src: src,
        value: value
    });
}

export const getQuote = (quote) => {
    return(['quote', {
        child: [{
            type: 'bold',
            value: quote
        }]
    }]);
}

export const getEnter = () => {
    return (['enter', {}]);
}