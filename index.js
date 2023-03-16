const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `${process.env.MONGO_DB_URL}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {


        await client.connect();
        console.log("connected");
        const packageCollection = client.db("toursite").collection("packages");

        //routes
        app.get('/package', async (req, res) => {
            const packages = await packageCollection.find().toArray()
            res.send(packages)
        })

        app.post('/package', async (req, res) => {
            const package = req.body
            const result = await packageCollection.insertOne(package)
            res.send({ result })
        })



    } finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Tour is on')
})

app.listen(port, () => {
    console.log(`Tour is listening on ${port}`)
})