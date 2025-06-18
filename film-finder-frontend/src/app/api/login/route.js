import { openDB } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email ve şifre gerekli." }), { status: 400 });
    }

    const db = await openDB();

    const user = await db.get(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "Geçersiz email veya şifre." }), { status: 401 });
    }

    // Giriş başarılı
    return new Response(JSON.stringify({ message: "Giriş başarılı.", user: { id: user.id, username: user.username } }), {
      status: 200,
    });

  } catch (err) {
    console.error("Login error:", err.message);
    return new Response(JSON.stringify({ error: "Sunucu hatası." }), { status: 500 });
  }
}
