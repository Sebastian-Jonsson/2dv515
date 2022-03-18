const dataReader = require('../tools/dataReader')
const kMeans = require('../tools/kMeansClustering')
const blogCreator = require('../tools/blogCreator')
const fResult = require('../tools/filterResult')

const clusterController = {}

clusterController.getBlogs = async (req, res, next) => {
    try {
        let blogs = await dataReader.getJSONBlog()
        let blogList = blogCreator.createBlogs(blogs)
        let result = kMeans.startpoint(blogList)
        let filteredResult = fResult.filteringData(result)
        
        res.status(200).json(filteredResult)
        
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = clusterController