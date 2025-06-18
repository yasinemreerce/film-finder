import { initializeDB } from "@/lib/db";

export async function GET() {
  try {
    await initializeDB();
    return new Response(JSON.stringify({ message: "Veritabanı kuruldu." }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
