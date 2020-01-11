export default [
    [
        'img',
        {
            attributes: {
                caption: 'adorable view',
                src: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2017/10/horizon-4K.jpg'    
            }
        }
    ],
    ['typography', {
        child: [
            {
                type: 'italic',
                value: `Have you guys heard of Inktober?`
            }, {
                type: 'body1',
                value: `It’s a drawing challenge "developed by fellow illustrator", Jake Parker in 2009. Every October, artists and art-enthusiasts around the world create an ink drawing daily for the month, sharing their work each day online with the #Inktober hashtags.
                Sounds pretty easy, right? I mean c’mon, we’re all creatives here. How hard can it be to carve out a few minutes to draw a lil’`
            }, {
                type: 'bold italic',
                value: `something each day?`
            }, {
                type: 'link',
                src: 'https://www.youtube.com/watch?v=9Us1TCBBEAo',
                value: 'Pop Hit 2019'
            }
        ]
    }],
    ['video', {
        attributes: {
            caption: 'Best Song test Best Song test Best Song test Best Song test Best Song test Best Song test Best Song test Best Song test',
            src: 'https://www.youtube.com/watch?v=ERMRWk1bwqo'    
        }
    }],
    ['video', {
        attributes: {
            caption: 'Sample Video',
            src: 'https://vimeo.com/9011932'
        }
    }],
    ['typography', {
        child: [
            {
                type: 'bold italic',
                value: `Welp, it turns out it’s very hard. I remember not too long ago when I struggled so much with drawing consistently. I wanted to be drawing every day. I desperately wanted to. I knew I should be, and I told myself I would, over and over. But somehow, the hours and then the days would slip by and I wouldn’t draw a single line.
                I’d get busy with all the other things I had to do. I’d get overwhelmed not knowing what to draw. I’d be afraid I would draw something terrible and end up feeling worse. But a lot of times, I’d just choose not to draw because it was easier. I’ll do it tomorrow…
                Inktober was the kick in the butt I needed. I forget now exactly which year it was, but the year I found out about Inktober marked a major shift in my drawing output. I saw a tweet about it and thought, “Yes! This is what I need! This will give me the motivation and accountability to actually draw every day!”
                Developing a Drawing Habit`
            }
        ]
    }],
    ['typography', {
        child: [
            {
                type: 'body1',
                value: `1. How we are building`
            }
        ]
    }],
    ['typography', {
        child: [
            {
                type: 'body1',
                value: `2. Code`
            }
        ]
    }],
    ['typography', {
        child: [
            {
                type: 'body1',
                value: `3. Coffeee`
            }
        ]
    }],
    ['typography', {
        child: [
            {
                type: 'body1',
                value: `4. Hard Work`
            }
        ]
    }],
    ['enter', {}],
    ['quote', {
        child: [
            {type: 'bold',
            value: `"If You Are Good At Something, Never Do it For free"`
        }]
    }],
    ['break', {}],
    ['typography', {
        child: [
            {type: 'body1',
            value: ` And surprisingly, it did. Did I draw every single day that first Inktober? No. I missed a couple days in the beginning. It wasn’t perfect. But having the ongoing motivation, and knowing that I was supposed to be posting on Instagram each day, made me jump back on the drawing wagon way quicker than I had before. All in all, I only missed a few days. It was more than I had ever drawn. But more importantly, it was the most consistent I had ever drawn.
            A funny thing happened while I was going through that first monthly challenge. I started to want to draw each day. Once I had gotten over the hump of the first week or so, and had dragged myself to my sketchbook for days in a row, something clicked in my brain that made me start to crave drawing. I no longer had to work as hard to convince myself to draw. I just wanted to.`
        }]
    }],
    ['enter', {}],
    ['heading', {
        child: 'Codes'
    }],
    ['code', {
        child: `def fun(fun2):
    fun2()
def test():
    print('hello world')
fun(test)`
    }],
    ['break', {}],
    ['subHeading', {
        child: 'React Code'
    }],
    ['code', {
        child: `class CodePrettyComponent extends Component {
    static getHeadOrBody() {
        return document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
    }
    
    static codePrettify() {
        // Check if PR object already exists
        if (typeof PR !== 'undefined') {
            return;
        }
    
        // Inject if not
        CodePrettyComponent.getHeadOrBody().appendChild(
        Object.assign(
            document.createElement('script'),
            {
            type: 'text/javascript',
            async: true,
            src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js'
            }
        )
        );
    }
    
    componentDidMount() {
        // Injecting lib into document
        CodePrettyComponent.codePrettify();
        
        // Waiting for lib to be loaded and invoke
        setTimeout(() => { PR.prettyPrint(); }, 1500);
    }
    
    render() {
        return (
        <pre class = "prettyprint" >
            <code class = "language-groovy" >
            <!-- your code here -->
            </code>
        </pre>
        );
    };
    };`
    }]
]