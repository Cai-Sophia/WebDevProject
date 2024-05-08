// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();
// const port = 5000;
// const url = 'mongodb+srv://al0984528:DemoDataBase@cluster1.wzrcl0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
// const dbName = 'myProject';

// app.use(express.json());

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   if (err) throw err;

//   console.log('Connected successfully to MongoDB');

//   const db = client.db(dbName);
//   const collection = db.collection('documents');

//   app.get('/api/documents', async (req, res) => {
//     const documents = await collection.find({}).toArray();
//     res.json(documents);
//   });

//   // Add more routes for other CRUD operations

//   app.listen(port, () => console.log(`Server is running on port ${port}`));
// });
