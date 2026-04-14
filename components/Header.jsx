'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/',               label: 'Home' },
  { href: '/precision-pick', label: 'Precision Pick' },
  { href: '/compare',        label: 'Compare' },
  { href: 'https://sentimetrics.zapier.app', label: 'AI Chatbot' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.senti}>Senti</span>
          <span className={styles.metrics}>metrics</span>
        </Link>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => {
            const isExternal = href.startsWith('http');
            if (isExternal) {
              return (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
