"use client";

import "../app/globals.css";
import styles from "../styles/Chat.module.css";
import { useEffect, useState } from "react";


export default function Chat() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState("Misafir"); // ya da giriş yapan kullanıcı adı

  // Mesajları çek
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    // 5 saniyede bir güncelle
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mesaj gönder
  const sendMessage = async () => {
    if (!input.trim()) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, content: input }),
    });

    setInput("");
    // Mesajları hemen yenile
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div className="container">
        <div className="chat-container">
                <h2 className={`promt-bold`}>Chat</h2>
                <div className="chat-box">
                    <div className={styles["chat-area"]}>
                      {messages.length > 0 && (
                        messages.map((msg) => (
                          <p key={msg.id}>
                            <strong>{msg.sender}:</strong> {msg.content}
                          </p>
                        ))
                      )}
                    </div>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mesaj yaz..." />
                    <button onClick={sendMessage}>Gönder</button>
                </div>
        </div>
    </div>
  );
}