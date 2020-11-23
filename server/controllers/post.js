const Post = require('../models/post')
const slugify = require('slugify')

exports.create = (req, res) => {
    const{title, content, user, show_user_name, age} = req.body
    const slug = slugify(title)


    //validation 
    switch(true){
        case !title:
            return res.status(400).json({error: 'Įžvalga privaloma'});
            break;
        case !content:
            return res.status(400).json({error: 'Įžvalgos istorija privaloma'});
            break;
    }


    Post.create({title, content, user, slug, show_user_name,age}, (err, post) =>{
        if(err) {
            console.log(err)
            res.status(400).json({error: 'Įžvalga jau egzistuoja'})
        }
        res.json(post);
    })
}    


exports.list = (req, res) => {
    Post.find({})
        .sort({createdAt: -1})
        .exec((err, posts) => {
            if(err )console.log(err);
            res.json(posts);
    })
}

exports.read = (req, res) => {
    const {slug} = req.params

    Post.findOne({slug})
        .exec((err, posts) => {
            if(err )console.log(err);
            res.json(posts);
    })
}

    exports.update = (req, res) => {
        const { slug } = req.params;
        const { title, content, user, show_user_name, age  } = req.body;
        Post.findOneAndUpdate({ slug }, { title, content, user, show_user_name, age }, { new: true }).exec((err, post) => {
            if (err) console.log(err);
            res.json(post);
        });
    };
    
    exports.remove = (req, res) => {
        // console.log(req.pramas.slug)
        const { slug } = req.params;
        Post.findOneAndRemove({ slug }).exec((err, post) => {
            if (err) console.log(err);
            res.json({
                message: 'Įžvalga ištrinta'
            });
        });
    };

