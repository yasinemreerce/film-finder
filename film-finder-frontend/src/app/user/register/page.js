"use client";

import "../../../app/globals.css";
import styles from "./../style.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Kayıt başarılı 🎉 Yönlendiriliyor...");
        setTimeout(() => {
          router.push("/user/login"); 
        }, 1500);
      } else {
        setMessage(data.error || "Bir hata oluştu.");
      }
    } catch (err) {
      console.error("Hata:", err);
      setMessage("Sunucu hatası.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/user/login"); 
  }

  return (
    <>
      <h1>Register</h1>

      <div className={styles["container"]}>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input type="submit" value="Kayıt Ol" />
        </form>
        <p onClick={handleLoginRedirect}>Hesabınız var ise giriş yapın...</p>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
