"use client";

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      {/* Top gradient line */}
      <div className={styles.gradientLine}></div>
      
      <div className={styles.container}>
        {/* Main footer content */}
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>Behzad</span>
              <span className={styles.logoDot}>.</span>
            </div>
            <p className={styles.tagline}>
              Building intelligent systems at the intersection of AI, Computer Vision, and Web Development.
            </p>
            {/* Status indicator */}
            <div className={styles.statusWrap}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>Available for work</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={styles.linksGroup}>
            <h4 className={styles.groupTitle}>Navigate</h4>
            <a href="#about" className={styles.link}>About</a>
            <a href="#skills" className={styles.link}>Skills</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </div>
          
          {/* Social Links */}
          <div className={styles.linksGroup}>
            <h4 className={styles.groupTitle}>Connect</h4>
            <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkIcon}>→</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/behzad-hassan-bx28" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkIcon}>→</span> LinkedIn
            </a>
            <a href="https://www.kaggle.com/behzadhassan" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkIcon}>→</span> Kaggle
            </a>
            <a href="https://www.credly.com/users/behzad-hassan" target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkIcon}>→</span> Credly
            </a>
          </div>

          {/* Tech Stack */}
          <div className={styles.linksGroup}>
            <h4 className={styles.groupTitle}>Built With</h4>
            <div className={styles.techPills}>
              <span className={styles.techPill}>Next.js</span>
              <span className={styles.techPill}>React</span>
              <span className={styles.techPill}>TypeScript</span>
              <span className={styles.techPill}>Framer Motion</span>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className={styles.terminalPrefix}>$</span> &copy; {currentYear} <span className={styles.accent}>Behzad Hassan</span>. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="mailto:behzadhassan967@gmail.com" className={styles.bottomLink}>behzadhassan967@gmail.com</a>
            <span className={styles.divider}>·</span>
            <a href="https://behzadhassan.dev" className={styles.bottomLink}>behzadhassan.dev</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
