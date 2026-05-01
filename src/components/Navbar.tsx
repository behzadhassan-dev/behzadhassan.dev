"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>BH</span>
          <span className={styles.dot}>.dev</span>
        </Link>
        
        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          <Link href="#about" className={styles.link} onClick={() => setIsOpen(false)}>About</Link>
          <Link href="#skills" className={styles.link} onClick={() => setIsOpen(false)}>Skills</Link>
          <Link href="#projects" className={styles.link} onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="#contact" className={styles.link} onClick={() => setIsOpen(false)}>Contact</Link>
        </div>

        <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          <div className={`${styles.bar} ${isOpen ? styles.bar1 : ''}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar2 : ''}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar3 : ''}`}></div>
        </button>

        <div className={styles.cta}>
          <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
