import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="animate-fade-in">
        <div className={styles.terminal}>
          <span className={styles.command}>$ whoami</span>
        </div>
        <h1 className={styles.title}>
          Hi, I&apos;m <span className={styles.name}>Behzad Hassan</span>
        </h1>
        <div className={styles.roles}>
          <span className={styles.role}>Python Developer</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>AI/ML Engineer</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>Computer Vision Specialist</span>
        </div>
        <p className={styles.description}>
          Final-year CS student at Sukkur IBA University specializing in building end-to-end AI systems, 
          real-time computer vision applications, and full-stack web solutions.
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={styles.primaryBtn}>View My Work</a>
          <a href="#contact" className={styles.secondaryBtn}>Let&apos;s Talk</a>
        </div>
      </div>
    </section>
  );
}
