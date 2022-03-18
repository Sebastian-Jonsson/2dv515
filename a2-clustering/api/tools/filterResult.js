const filterResult = {}


filterResult.filteringData = (result) => {
    let filtered = []

    for (let i = 0; i < result.length; i++) {
        filtered.push({Cluster: "Cluster"+ (i + 1), Assignments: []})

        for (const blog of result[i].assignments) {
            filtered[i].Assignments.push(blog.blogName)
        }
    }
    
    return filtered
}


module.exports = filterResult