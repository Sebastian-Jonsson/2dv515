const Blog = require('../models/blog')

const blogCreator = {}

blogCreator.createBlogs = (blogs) => {
    let newBlogList = []

    for (const blog of Object.entries(blogs.BlogWords)) {
        let name = blog.shift()
        let newBlog = new Blog(name, blog)
        
        newBlogList.push(newBlog)
    }

    return newBlogList
}


module.exports = blogCreator