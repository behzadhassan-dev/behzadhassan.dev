import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoText}>BH</span><span className={styles.dot}>.dev</span>
            <p className={styles.tagline}>Engineering the future of vision.</p>
          </div>
          
          <div className={styles.linksGroup}>
            <h4 className={styles.groupTitle}>Navigation</h4>
            <a href="#about" className={styles.link}>About</a>
            <a href="#skills" className={styles.link}>Skills</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </div>
          
          <div className={styles.linksGroup}>
            <h4 className={styles.groupTitle}>Social</h4>
            <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
            <a href="https://www.linkedin.com/in/behzad-hassan-bx28" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            <a href="https://www.kaggle.com/behzadhassan" target="_blank" rel="noopener noreferrer" className={styles.link}>Kaggle</a>
            <a href="https://www.credly.com/users/behzad-hassan" target="_blank" rel="noopener noreferrer" className={styles.link}>Credly</a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} <span className={styles.accent}>Behzad Hassan</span>. Built with Next.js
          </p>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            Available for new opportunities
          </div>
        </div>
      </div>
    </footer>
  );
}
