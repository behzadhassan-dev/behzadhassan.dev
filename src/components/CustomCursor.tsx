"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', updateHoverState);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`${styles.cvCursor} ${isHovering ? styles.hovering : ''}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        rotate: isHovering ? 45 : 0,
        scale: isHovering ? 1.5 : 1,
      }}
    >
      <div className={`${styles.cvCorner} ${styles.tl}`}></div>
      <div className={`${styles.cvCorner} ${styles.tr}`}></div>
      <div className={`${styles.cvCorner} ${styles.bl}`}></div>
      <div className={`${styles.cvCorner} ${styles.br}`}></div>
      {isHovering && <div className={styles.cvCrosshair}></div>}
    </motion.div>
  );
}
