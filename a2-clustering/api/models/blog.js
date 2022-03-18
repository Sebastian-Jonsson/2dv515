class Blog {

    constructor(name, blog) {
       this.blogName = name
       this.blogContent = blog
       this.blogContent[0].shift()
    }

    word_count(i) {
        return parseInt(this.blogContent[0][i])
    }

}


module.exports = Blog