const express = require('express')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const FrontendController = require('../controllers/FrontendController')
const TeacherController = require('../controllers/TeacherController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/admin/ContactController')
const auth = require('../middleware/auth')
const router = express.Router()





// FrontendController
router.get('/', FrontendController.home)
router.get('/about', FrontendController.about)
router.get('/contact', FrontendController.contact)
router.get('/blog', FrontendController.blog)
router.get('/details/:id', FrontendController.details)
router.get('/login', FrontendController.login)
router.get('/register', FrontendController.register)
router.get('/bloglist/:name', FrontendController.bloglist)




// Admin Controller
router.get('/admin/dashboard',auth, AdminController.dashboard)
router.post('/adminregister', AdminController.register)
router.post('/verifylogin', AdminController.verifylogin)
router.get('/logout',AdminController.logout)



// blog controller
router.get('/admin/blogdisplay',auth, BlogController.displayBlog)
router.post('/insertblog', BlogController.insertblog)
router.get('/admin/blogview/:id', BlogController.blogview)
router.get('/admin/blogedit/:id', BlogController.blogEdit)
router.post('/admin/blogupdate/:id', BlogController.blogUpdate)
router.get('/admin/blogdelete/:id', BlogController.blogDelete)


// category controller
router.get('/admin/categorydisplay',auth, CategoryController.CategoryDisplay)
router.post('/insertcategory', CategoryController.insertcategory)
router.get('/admin/categoryedit/:id', CategoryController.categoryEdit)
router.post('/admin/categoryupdate/:id', CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id', CategoryController.categoryDelete)


// about controller
router.get('/admin/aboutdisplay',auth, AboutController.AboutDisplay)
router.get('/admin/aboutedit/:id', AboutController.AboutEdit)
router.post('/admin/aboutupdate/:id', AboutController.AboutUpdate)



// contact controller
router.post('/contactinsert', ContactController.contactInsert)
router.get('/admin/contactdisplay',auth, ContactController.contactDisplay)

// teacher
router.get('/teacher/display', TeacherController.display)
router.get('/teacher/create', TeacherController.create)





module.exports = router
