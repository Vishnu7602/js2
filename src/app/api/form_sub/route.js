import getMongoConnection from "@/components/database";

export async function POST(req) {
  const row = await req.json();
  console.log('Request body:', row);

  try {
    const db = await getMongoConnection();

    // Assuming you have a collection named 'students' in your MongoDB
    const studentsCollection = db.collection('students');

    // Insert the data into MongoDB
    await studentsCollection.insertOne({
      name: row.name,
      age: row.age,
      gender: row.gender,
      college: row.college,
    });

    return new Response(JSON.stringify({ message: 'Data inserted successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error inserting data' }), { status: 500 });
  }
}