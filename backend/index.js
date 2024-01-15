const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//===========MongoDB details================================================
const MONGODB_URI = 'mongodb+srv://debjitsingharoy007:O2b13SGjjeIUJ4Jg@cluster0.gdcevv7.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'Users';
const COLLECTION_NAME = 'usersdb';

//============Declaraing Port==========
const port = process.env.PORT || 5000; 


//======================Making MongoDB connection=============================
const client = new MongoClient(MONGODB_URI);
let users;
client.connect().then(() => {
    const db = client.db(DB_NAME );
    users = db.collection(COLLECTION_NAME);
    console.log("Connected to MongoDB");
}).catch(err => console.error(err));

const allowedOrigins=['https://user-management-app-okfe.onrender.com','http://localhost:3000'];
app.use(cors({
    origin: allowedOrigins ,  // Replace with your client's actual origin
    credentials: true,
}));

//============Fetching the data while loading the first page of frontend
app.get('/', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to the database");
        const db = client.db(DB_NAME);
        const users = db.collection(COLLECTION_NAME);
        const result = users.find({})
        const documents = await result.toArray();
        console.log("Retrieved documents");
        console.log(documents);
        res.json(documents);
    }
    catch (e) {
        console.error(e);
    }
})

//=============Adding New User=========================
app.post('/addUser', async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        userDetails = { name: name, email: email, contact: contact }
        const result = await users.insertOne(userDetails);
        res.status(201).json({ status: 201, message: "New User Added" })
        console.log(result);
    }
    catch (e) {
        console.log(e);
        res.send({ message: "User not added" });
    }
})


//=============Deleting a User==============================
app.delete('/deleteUser/:id', async (req, res) => {
    try{
        const id = req.params.id
        const result=await users.deleteOne({ _id: new ObjectId(id) });
        console.log(result);
        if (result.deletedCount === 1) {
            res.status(201).json({ status: 201, message: "User Deleted" });
        } else {
            res.status(404).json({ status: 404, message: "User not found" });
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({status:500, message: "Internal Server Error" });
    }
})

//====================Updating a User========================
app.put('/updateUser/:id',async (req, res) => {
    try{
        const id = req.params.id
        const updateData={
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact
        };
        const result=await users.updateOne({_id:new ObjectId(id)},{$set:updateData})
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(201).json({status:201, message: 'User Updated Successfully' });
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

})


//===============Getting the values into the Update form while updating the values===============
app.get('/getUser/:id',async (req, res) => {
    try{
        const id = req.params.id
        const result=await users.findOne({ _id:new ObjectId(id) })
        console.log("Yo:",result);
        res.status(201).json(result);
    }
    catch(error)
    {
        console.log(error);
    }
})


//====================Connecting to the Port=================================
app.listen(port, () => {
    console.log(`Connected to Port ${port}`);
})
