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