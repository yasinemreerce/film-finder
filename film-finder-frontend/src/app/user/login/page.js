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
        localStorage.setItem("user_id", data.user.id);
      } else {
        setMessage("❌ " + (data.error || "Giriş başarısız."));
      }

    } catch (err) {
      console.error("Hata:", err);
      setMessage("❌ Sunucu hatası.");
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/user/register"); 
  }

  return (
    <>
      <div className={styles["login-container"]}>
        <h1 className="promt-bold">Login</h1>
        <div className={styles["container"]}>

          <form onSubmit={handleLogin}>
              <label className="promt-regular text">Email</label>
              <br />
              <input
                type="email"
                value={email}
                placeholder="emre@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br />
            <label className="promt-regular">Şifre</label>
            <br />
            <input
                type="password"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <input type="submit" value="Giriş Yap" className="submit"/>
          </form>

          <p onClick={handleRegisterRedirect}>Hesabınız yoksa kayıt...</p>
            {message && <p style={{ marginTop: "1rem", color: "#444" }}>{message}</p>}
        </div>
      </div>
    </>
  );
}
