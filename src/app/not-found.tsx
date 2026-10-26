import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>This page doesn’t exist or has moved.</p>
      <a className={styles.button} href="/">
        Back to home
      </a>
    </div>
  );
}
