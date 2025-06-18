"use client";

import "../app/globals.css";
import styles from "../styles/User.module.css";
import { useEffect, useState } from "react";
import Image from 'next/image'
import UserIcon from "../../public/user.svg";
import Link from 'next/link'


export default function User() {

  return (
        <>
                <div className={styles["container"]}>
                        <Link href={"/user/register"}>
                                <Image 
                                        src={UserIcon}
                                        alt="User İcon Svg resmi"
                                        className={styles["user-icon"]}
                                />
                        </Link>
                </div>
        </>
  );
}