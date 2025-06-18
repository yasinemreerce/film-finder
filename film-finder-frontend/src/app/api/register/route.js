import { openDB } from "@/lib/db";

export async function POST(req) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return new Response(JSON.stringify({ error: "Eksik bilgi gönderildi." }), { status: 400 });
  }

  try {
    const db = await openDB();

    await db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );

    return new Response(JSON.stringify({ message: "Kayıt başarılı." }), { status: 200 });
  } catch (error) {
    console.error("Kayıt hatası:", error.message);
    return new Response(JSON.stringify({ error: "Kayıt başarısız." }), { status: 500 });
  }
}
