const prisma = require('../prisma/index')

// create a new post  

exports.createPost = async(req,res, next)=>{
    try {
        const {slug, title, body, authorId}  = req.body 
        // validatiom can do 
        const result = await prisma.post.create({
            data:{
                slug,
                title,
                body,
                author: {connect: {id: authorId}}
            }
            
        })
        res.json(result)

    } catch (error) {
        throw new Error(error); 
    }
}

//update an existing post
exports.updatePost = async(req, res, next)=>{
    const {id} = req.params;
    const {title, body} = req.body
    try {
        const result =  await prisma.post.update({
                where: {id: id},
                data: {
                    title: title,
                    body: body
                }
        });
        res.json(result)
    } catch (error) {
        res.json({error: `Post with ${id} does not exixts`})
    }
}

//delete a post 
exports.deletePost = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const result = await prisma.post.delete({
            where: {id: id}
        });
        res.json(result)
    } catch (error) {
        res.json({error: `Post with ${id} does not exixts`})
    }
}

// get all user 
exports.getPost = async(req, res, send)=>{
    try {
        const result = await prisma.post.findMany()
        res.json(result)
    } catch (error) {
        res.json({error: `No post was found`})
    }
}