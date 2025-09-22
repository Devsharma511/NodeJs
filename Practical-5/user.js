const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('testDB');
    const users = database.collection('users');

    const user = { name: "Devansh Sharma", age: 20, email: "devansh@example.com" };

    const result = await users.insertOne(user);
    console.log("User inserted with ID:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
