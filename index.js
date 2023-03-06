const { MongoClient, ServerApiVersion } = require('mongodb');


const express = require('express');
const cors = require('cors');
const app =express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xak2ylo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)


async function run(){
    try{
        const ProductsCollection = client.db('allProducts').collection('Products');

        app.get('/products', async(req, res)=>{
            const query ={};
            const products = await ProductsCollection.find(query).toArray();
            res.send(products);
        })
        app.get('/products/:category', async(req, res)=>{
            const category = req.params.category;
            const query ={categoryName:category};
            const products = await ProductsCollection.find(query).toArray();
            res.send(products);
        })
    }
    finally{

    }
}


app.get('/' , async(req, res) => {
    res.send('hello i am mm mishrat');
})
app.listen(port , (req, res) => {
    console.log('hello my name is mishrat')
})
run().catch(console.dir);
