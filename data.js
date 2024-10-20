const { MongoClient } = require('mongodb');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://rudrsharma103:rudrdb@victara-cluster.outgk.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection
    const database = client.db("victara-user"); // replace with your database name
    const collection = database.collection("items"); // replace with your collection name
    //insert user
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
