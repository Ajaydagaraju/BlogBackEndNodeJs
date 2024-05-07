const express = require('express');
const cors = require('cors')
require('./db/config');
const Blog = require("./db/blog");
const app = express();
app.use(express.json());
app.use(cors());


app.post('/create' , async (req, res) => {
    let blog = new Blog(req.body);
    try {
      let result = await blog.save();
      res.send(result);
    } catch (error) {
        console.log("Error adding blog", error)
      res.status(500).send({ error: 'Internal Server Error' });
    }
})

app.get('/read',  async (req, res)=> {
    let blog = await Blog.find();
    if(blog.length > 0){
        res.send(blog)
    }else{
        res.send({result: "No result Found"})
    }
})

app.delete('/delete/:id',  async (req, res) => {
    let result = await Blog?.deleteOne({_id: req?.params?.id});
    if(result){
        res.send(result)
    }else{
        res.send({resultIs : "No Record found related to this Id."})
    }
})

app.get('/read/:id',  async (req, res) => {
    let result = await Blog.findOne({_id : req.params.id});
    console.log(result, "result dfsd")
    if(result){
        res.send(result)
    }else{
        res.send({resultIs : "No Record Found!"})
    }
})

app.put('/update/:id',  async(req,res) => {
    let result = await Blog.updateOne(
        {_id : req.params.id},
        {
            $set : req.body
        }
    );
    res.send(result)
})

app.get('/search/:key',  async (req, res) => {
    let result = await Blog.find({
        "$or" : [
            {title : {$regex : req.params.key}},
            {description : {$regex : req.params.key} },
        ]
    })
    res.send(result)
} )

app.listen(6600);