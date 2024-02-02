const { MongoClient } = require('mongodb');

async function getMongoConnection() {
  const uri = 'mongodb+srv://vishnu8701:vishnu@initial.jzbibyc.mongodb.net/?retryWrites=true&w=majority';

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Return the database object
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

export default getMongoConnection;