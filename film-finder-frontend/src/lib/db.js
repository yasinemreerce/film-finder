import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {
  return open({
    filename: `${process.cwd()}/database/mydb.sqlite`, // database dosya yolu
    driver: sqlite3.Database,
  });
}

export async function initializeDB() {
  const db = await openDB();

  // Tabloları oluştur (örnek: kullanıcılar tablosu)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE NOT NULL,
      password TEXT
    );
  `);

  // Örneğin chat mesajları tablosu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  return db;
}
