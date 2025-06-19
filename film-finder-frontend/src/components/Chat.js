"use client";

import "../app/globals.css";
import styles from "../styles/Chat.module.css";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const bottomRef = useRef(null);

  // Kullanıcıyı localStorage'dan al
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUserId(parseInt(storedId));
    }
  }, []);

  // Mesajları veritabanından çek
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Mesajları alırken hata:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  // Yeni mesaj gelince en alta kaydır
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mesaj gönderme fonksiyonu
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, message: input }),
      });

      setInput("");
      fetchMessages();
    } catch (err) {
      console.error("Mesaj gönderirken hata:", err);
    }
  };

  // Kullanıcı giriş yapmadıysa uyarı göster
  if (!userId) {
    return (
      <div className={styles["container"]}>
        <div className={styles["chat-container"]}>
          <h2 className={`${styles["chat-header"]} promt-bold`}>Chat</h2>
          <div className={styles["chat-box"]}>
            <div className={styles["chat-area"]}>
              <p>Lütfen önce giriş yapın.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["chat-container"]}>
        <h2 className={`${styles["chat-header"]} promt-bold`}>Chat</h2>

        <div className={styles["chat-box"]}>
          <div className={`${styles["chat-area"]} promt-medium`}>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <p key={msg.id} className="promt-regular">
                  <strong className="promt-medium">{msg.username || "Bilinmeyen"}:</strong> {msg.message}
                </p>
              ))
            ) : (
              <p className="promt-medium">Henüz mesaj yok.</p>
            )}
            <div ref={bottomRef} />
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Mesaj yaz..."
          />
          <button onClick={sendMessage}>Gönder</button>
        </div>
      </div>
    </div>
  );
}
