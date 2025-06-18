"use client";

import "../../../app/globals.css";
import styles from "./../style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation"; 


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); 


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Giriş başarılı. Hoş geldin, " + data.user.username);
        setTimeout(() => {
          router.push("/"); 
        }, 1500);
      } else {
        setMessage("❌ " + (data.error || "Giriş başarısız."));
      }

    } catch (err) {
      console.error("Hata:", err);
      setMessage("❌ Sunucu hatası.");
    }
  };

  return (
    <div className={styles["container"]}>
      <h1>Giriş Yap</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="emre@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Şifre</label>
        <input
          type="password"
          value={password}
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="submit" value="Giriş Yap" />
      </form>

      {message && <p style={{ marginTop: "1rem", color: "#444" }}>{message}</p>}
    </div>
  );
}
