import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import the Link component
import styles from '../styles/Login.module.css';

export default function Login() {
  // ... your existing Login component code ...

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ... your login form fields ... */}
        <button type="submit" className={styles.button}>Log In</button>
      </form>
      <p className={styles.registerLink}>
        Don't have an account? <Link href="/register">Sign up here</Link>
      </p>
    </div>
  );
}
