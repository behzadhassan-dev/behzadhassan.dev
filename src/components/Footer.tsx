"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true }) + " UTC");
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Top Metadata Bar */}
        <div className={styles.metaHeader}>
          <div className={styles.metaLeft}>
            <span className={styles.sysTag}>[SYSTEM_V01]</span>
            <span className={styles.sysStatus}>
              <span className={styles.pulseDot} />
              CORE_OPERATIONAL
            </span>
          </div>
          <div className={styles.metaRight}>
            <span className={styles.timestamp}>{time || "--:--:-- UTC"}</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Brand/Identity */}
          <div className={`${styles.gridCol} ${styles.brandCol}`}>
            <div className={styles.logoWrap}>
              <span className={styles.logoText}>BEHZAD</span>
              <span className={styles.logoSuffix}>.</span>
            </div>
            <p className={styles.description}>
              Architecting high-performance AI workstations and computer vision pipelines for the next generation of intelligent systems.
            </p>
            <div className={styles.systemReadout}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>UPTIME:</span>
                <span className={styles.statValue}>99.98%</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>LATENCY:</span>
                <span className={styles.statValue}>14ms</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>NODE:</span>
                <span className={styles.statValue}>PAK_CORE</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className={`${styles.gridCol} ${styles.linksCol}`}>
            <h4 className={styles.colTitle}>SYSTEM_INDEX</h4>
            <nav className={styles.nav}>
              {[
                { id: 'about', label: '01_ABOUT' },
                { id: 'projects', label: '02_PROJECTS' },
                { id: 'skills', label: '03_STACKS' },
                { id: 'contact', label: '04_CONNECT' },
              ].map((item) => (
                <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                  <motion.span
                    whileTap={{
                      x: [0, -3, 3, -2, 0],
                      color: ["#fff", "var(--accent-primary)", "#fff"]
                    }}
                    transition={{ duration: 0.2 }}
                    className={styles.linkText}
                  >
                    {item.label}
                  </motion.span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social / External */}
          <div className={`${styles.gridCol} ${styles.linksCol}`}>
            <h4 className={styles.colTitle}>COMM_TERMINALS</h4>
            <nav className={styles.nav}>
              {[
                { href: 'https://github.com/BehzadHassan', label: 'GITHUB' },
                { href: 'https://www.linkedin.com/in/behzad-hassan-bx28', label: 'LINKEDIN' },
                { href: 'https://wa.me/923163607160', label: 'WHATSAPP' },
                { href: 'mailto:behzadhassan967@gmail.com', label: 'EMAIL' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  <motion.span
                    whileTap={{
                      scale: 0.95,
                      x: [0, -4, 4, 0],
                      color: ["#fff", "var(--accent-secondary)", "#fff"]
                    }}
                    className={styles.linkText}
                  >
                    {item.label}
                  </motion.span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright/Final Info */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} ALL_RIGHTS_RESERVED // BH_STATION
          </div>
          <div className={styles.credits}>
            DESIGNED_BY_BEHZAD // BUILT_WITH_NEXTJS
          </div>
        </div>
      </div>
    </footer>
  );
}
