"use client";

import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Get In <span className={styles.accent}>Touch</span></h2>
          <p className={styles.subtitle}>Have a project in mind or just want to say hi? My terminal is always open.</p>
        </div>
        
        <div className={styles.terminalForm}>
          <div className={styles.terminalHeader}>
            <div className={styles.dotRed}></div>
            <div className={styles.dotYellow}></div>
            <div className={styles.dotGreen}></div>
            <span className={styles.terminalTitle}>send_message.sh</span>
          </div>
          
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>$ name</label>
              <input type="text" id="name" name="name" className={styles.input} placeholder="your name..." required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>$ email</label>
              <input type="email" id="email" name="email" className={styles.input} placeholder="your@email.com..." required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>$ message</label>
              <textarea id="message" name="message" className={styles.textarea} placeholder="your message..." required></textarea>
            </div>
            
            <button type="submit" className={styles.submitBtn}>
              ./send_message.sh
            </button>
          </form>
        </div>

        <div className={styles.socialLinks}>
          <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
          <a href="https://www.linkedin.com/in/behzad-hassan-bx28" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
          <a href="https://www.kaggle.com/behzadhassan" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Kaggle</a>
          <a href="mailto:behzad@behzadhassan.dev" className={styles.socialLink}>Email</a>
        </div>
      </motion.div>
    </section>
  );
}
