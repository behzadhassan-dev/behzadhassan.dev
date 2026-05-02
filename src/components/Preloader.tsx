"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return oldProgress + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={styles.preloader}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className={styles.content}>
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.name}>Behzad</span>
              <span className={styles.dot}>.</span>
            </motion.div>
            
            <div className={styles.barContainer}>
              <motion.div 
                className={styles.bar} 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className={styles.status}>
              <span className={styles.terminal}>$</span>
              <span className={styles.text}>Initializing terminal... {Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
