'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar({ onClose, isOpen }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h2>Science Olympiad</h2>
          <p>ADBS</p>
        </div>
        {onClose && isOpen && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
        >
          <span className={styles.icon}>🏠</span>
          <span>Home</span>
        </Link>

        <div className={styles.adminSection}>
          <div className={styles.adminTitle}>Admin Panel</div>
          
          <Link
            href="/admin/students"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/students') ? styles.active : ''}`}
          >
            <span className={styles.icon}>👥</span>
            <span>Add Students</span>
          </Link>

          <Link
            href="/admin/centers"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/centers') ? styles.active : ''}`}
          >
            <span className={styles.icon}>🏢</span>
            <span>Add Centers</span>
          </Link>

          <Link
            href="/admin/subjects"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/subjects') ? styles.active : ''}`}
          >
            <span className={styles.icon}>📚</span>
            <span>Add Subjects</span>
          </Link>

          <Link
            href="/admin/exams"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/exams') ? styles.active : ''}`}
          >
            <span className={styles.icon}>📝</span>
            <span>Add Exams</span>
          </Link>

          <Link
            href="/admin/results"
            className={`${styles.navItem} ${pathname?.startsWith('/admin/results') ? styles.active : ''}`}
          >
            <span className={styles.icon}>✅</span>
            <span>Add Results</span>
          </Link>
        </div>
      </nav>

      <div className={styles.footer}>
        <p>Science Olympiad © 2025</p>
      </div>
    </aside>
  );
}
