"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          {isSuccess ? (
            <motion.div 
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className={styles.successTitle}>Message Received!</h3>
              <p className={styles.successText}>Thank you for reaching out. I&apos;ll get back to you shortly.</p>
              <button onClick={() => setIsSuccess(false)} className={styles.resetBtn}>
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Web3Forms Access Key */}
              <input type="hidden" name="access_key" value="9b3ac790-979d-47f0-bbef-3458ed60ae03" />
              
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
              
              {error && <p style={{ color: '#ff5f56', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{error}</p>}
              
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "./sending..." : "./send_message.sh"}
              </button>
            </form>
          )}
        </div>

        <div className={styles.socialLinks}>
          <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
          <a href="https://www.linkedin.com/in/behzad-hassan-bx28" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
          <a href="https://www.kaggle.com/behzadhassan" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Kaggle</a>
          <a href="mailto:behzadhassan967@gmail.com" className={styles.socialLink}>Email</a>
        </div>
      </motion.div>
    </section>
  );
}
