const mongoos = require('mongoose');

const blogSchema = new mongoos.Schema({
    title : String,
    description : String,
    blogId : String,
})

module.exports = mongoos.model("blogs", blogSchema)