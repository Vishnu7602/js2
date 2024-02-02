import getMongoConnection from "@/components/database";

async function getAllStudents(db) {
  // Assuming you have a collection named 'students' in your MongoDB
  const studentsCollection = db.collection('students');
  
  // Retrieve all documents from the 'students' collection
  const students = await studentsCollection.find().toArray();

  return students;
}

export async function GET(request) {
  console.log(request)
  try {
    const db = await getMongoConnection();
    const students = await getAllStudents(db);

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(`Fetching data from the database failed: ${error.message}`, { status: 500 });
  }
}