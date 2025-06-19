import { openDB } from "@/lib/db";

// 📥 Mesaj ekleme
export async function POST(req) {
  try {
    const { user_id, message } = await req.json();

    if (!user_id || !message) {
      return new Response(JSON.stringify({ error: "user_id veya mesaj eksik." }), { status: 400 });
    }

    const db = await openDB();
    await db.run(
      `INSERT INTO messages (user_id, message) VALUES (?, ?)`,
      [user_id, message]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Mesaj ekleme hatası:", err);
    return new Response(JSON.stringify({ error: "Sunucu hatası." }), { status: 500 });
  }
}

// 📤 Mesajları listeleme
export async function GET() {
  try {
    const db = await openDB();

    const messages = await db.all(`
      SELECT messages.id, messages.message, messages.created_at, users.username
      FROM messages
      JOIN users ON messages.user_id = users.id
      ORDER BY messages.created_at ASC
    `);

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.error("Mesaj çekme hatası:", err);
    return new Response(JSON.stringify({ error: "Sunucu hatası." }), { status: 500 });
  }
}
