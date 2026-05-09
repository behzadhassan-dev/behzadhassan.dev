"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 3D Tilt Logic
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 150, damping: 20 });
  const mySpring = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  // Torch Glow Coordinates
  const glowX = useTransform(mxSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mySpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'required_field: name_null';
        else if (value.trim().length < 2) error = 'invalid_data: name_too_short';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = 'required_field: email_null';
        else if (!emailRegex.test(value)) error = 'pattern_mismatch: invalid_email_format';
        break;
      case 'message':
        if (!value.trim()) error = 'required_field: message_null';
        else if (value.trim().length < 10) error = 'invalid_data: message_too_short_min_10_chars';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final validation
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== '')) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);

    const data = new FormData();
    data.append("access_key", "9b3ac790-979d-47f0-bbef-3458ed60ae03");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const resData = await response.json();

      if (resData.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setGeneralError(resData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setGeneralError("Failed to send message. Please check your connection.");
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
        
        <motion.div 
          className={styles.terminalCard}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
        >
          {/* Neon Torch Glow tracking the cursor */}
          <motion.div className={styles.torchGlow} style={{ 
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(52, 211, 153, 0.1) 0%, transparent 50%)` 
          }} />
          <div className={styles.scanLine} />

          <div className={styles.terminalHeader}>
            <div className={styles.dotRed}></div>
            <div className={styles.dotYellow}></div>
            <div className={styles.dotGreen}></div>
            <span className={styles.terminalTitle}>send_message.sh</span>
          </div>
          
          <div className={styles.formContent}>
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
                  $ ./reset.sh
                </button>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`} 
                    placeholder="your name..." 
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required 
                  />
                  {errors.name && <span className={styles.errorText}>[ERROR] {errors.name}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
                    placeholder="your@email.com..." 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required 
                  />
                  {errors.email && <span className={styles.errorText}>[ERROR] {errors.email}</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`} 
                    placeholder="your message..." 
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  ></textarea>
                  {errors.message && <span className={styles.errorText}>[ERROR] {errors.message}</span>}
                </div>
                
                {generalError && <p style={{ color: '#ff5f56', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>[SYSTEM_CRITICAL] {generalError}</p>}
                
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "./sending..." : "./send_message.sh"}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        <div className={styles.socialLinks}>
          <a href="https://github.com/BehzadHassan" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/behzad-hassan-bx28" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            LinkedIn
          </a>
          <a href="mailto:behzadhassan967@gmail.com" className={styles.socialLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email
          </a>
          <a href="https://wa.me/923163607160" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
