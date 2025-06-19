"use client";

import "../app/globals.css";
import styles from "../styles/User.module.css";
import { useEffect, useState } from "react";
import Image from 'next/image'
import UserIcon from "../../public/user.svg";
import Link from 'next/link'


export default function User() {
        const [userId, setUserId] = useState(null);
        useEffect(() => {
                const storedId = localStorage.getItem("user_id");
                if (storedId) {
                        setUserId(parseInt(storedId));
                }
        }, []);

        const handleLogout = () => {
                localStorage.removeItem("user_id");
                window.location.href = "/"; // Anasayfaya yönlendir
        };
        return (
                <>
                        <div className={styles["container"]}>
                                {!userId ? (
                                // Kullanıcı giriş yapmamışsa sadece simgeyi göster
                                <Link href={"/user/register"}>
                                <Image 
                                        src={UserIcon}
                                        alt="User Icon SVG"
                                        className={styles["user-icon"]}
                                />
                                </Link>
                                ) : (
                                // Kullanıcı giriş yaptıysa hoş geldin mesajı ve çıkış butonu
                                <>
                                <p onClick={handleLogout} className={`${styles["logout-button"]} promt-regular`}>
                                        Çıkış Yap
                                </p>
                                </>
                                )}
                                </div>

                </>
        );
}