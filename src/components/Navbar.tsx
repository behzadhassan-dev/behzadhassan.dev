import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>BH</span>
          <span className={styles.dot}>.dev</span>
        </Link>
        <div className={styles.links}>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#skills" className={styles.link}>Skills</Link>
          <Link href="#projects" className={styles.link}>Projects</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.cta}>
          <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
