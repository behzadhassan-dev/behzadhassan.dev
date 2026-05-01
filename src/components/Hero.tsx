"use client";

import styles from './Hero.module.css';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          Available for opportunities
        </motion.div>
        
        <motion.div variants={itemVariants} className={styles.terminal}>
          <span className={styles.command}>$ whoami</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className={styles.title}>
          Hi, I&apos;m <span className={styles.name}>Behzad Hassan</span>
        </motion.h1>
        
        <motion.div variants={itemVariants} className={styles.roles}>
          <span className={styles.role}>Python Developer</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>AI/ML Engineer</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>Computer Vision Specialist</span>
        </motion.div>
        
        <motion.p variants={itemVariants} className={styles.description}>
          Final-year CS student at Sukkur IBA University specializing in building end-to-end AI systems, 
          real-time computer vision applications, and full-stack web solutions.
        </motion.p>
        
        <motion.div variants={itemVariants} className={styles.actions}>
          <a href="#projects" className={styles.primaryBtn}>
            <span className={styles.btnText}>View My Work</span>
            <div className={styles.btnGlow}></div>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Let&apos;s Talk
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
