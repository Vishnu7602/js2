import getMongoConnection from "@/components/database";
import { revalidatePath } from "next/cache";


export async function GET(request) {
   console.log(request);
  try { 
    const db = await getMongoConnection();
    const students = await db.collection('students').find().toArray();
    revalidatePath('/api/result_sub');

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response('Fetching data from the database failed: ${error.message}', { status: 500 });
  }
}