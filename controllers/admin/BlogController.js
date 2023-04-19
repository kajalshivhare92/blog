const BlogModel = require('../../models/Blog')
const CategoryModel =require('../../models/Category')
var cloudinary = require('cloudinary').v2;



cloudinary.config({
    cloud_name: 'dbteh0acf',
    api_key: '927442271426694',
    api_secret: 'FLaUleLiB6truUcyoF1r5fz7cUo',
    // secure: true
});


class BlogController {

    static displayBlog = async (req, res) => {

        try {
            const data = await BlogModel.find().sort({_id:-1})
            const Category =await CategoryModel.find().sort({_id:-1})
            //console.log(data)
            res.render('admin/blog/display', { d: data,c:Category })

        } catch (error) {
            console.log(error)
        }
    }
    static insertblog = async (req, res) => {
        try {
            //console.log(req.files.image)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogImage'
            })
            //console.log(myimage)

            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                c_name:req.body.c_name,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/blogdisplay')

        } catch (error) {
            console.log(error)
        }

    }

    static blogview = async (req, res) => {
        try {
            //console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view', { view: result })
        } catch (error) {
            console.log(error)

        }

    }

    static blogEdit = async (req, res) => {

        try {
            //console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/blog/edit', { edit: result })
        }
        catch (error) {
            console.log(error)

        }

    }

    
    static blogUpdate = async (req, res) => {

        try {
            // console.log(req.body)
            // console.log(req.params.id)
            // first delete the image
            if (req.files) {
                const blog = await BlogModel.findById(req.params.id)
                const imageid = blog.image.public_id

                //  console.log(imageid)
                await cloudinary.uploader.destroy(imageid)

                // second update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'blogImage'
                })



                var data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                }

            }

            else {
                var data = {
                    title: req.body.title,
                    description: req.body.description
                }
            }
            const update = await BlogModel.findByIdAndUpdate(req.params.id, data)
            await update.save()
            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    static blogDelete = async (req, res) => {

        try {
            // delete image code
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            //  console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            await BlogModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    

    



}




module.exports = BlogController