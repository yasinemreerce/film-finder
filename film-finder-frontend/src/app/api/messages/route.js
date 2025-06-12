import { initializeDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await initializeDB();
    return new Response(
      JSON.stringify({ message: "Veritabanı ve tablolar oluşturuldu" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
