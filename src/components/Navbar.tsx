"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <motion.nav 
        className={styles.nav}
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Behzad</span>
            <span className={styles.dot}>.</span>
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
      </motion.nav>
    </>
  );
}
