"use client";

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { motion, Variants, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

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

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const particles: any[] = [];
    const particleCount = Math.floor((width * height) / 15000); // Responsive particle count
    
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    for(let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
    
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Magnetic effect
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 200) {
          // Attract towards mouse
          p.x += dx * 0.01;
          p.y += dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.5)';
        ctx.fill();
        
        for(let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const ddist = Math.sqrt(ddx*ddx + ddy*ddy);
          
          if (ddist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.2 - ddist/600})`;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} 
    />
  );
}


export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 150, damping: 20 });
  const springY = useSpring(my, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className={styles.hero} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <ParticleNetwork />
      <div className={styles.perspectiveGrid}></div>

      <motion.div 
        className={styles.content}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
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
        
        {/* 5. Role Badges with Z-Axis Hover */}
        <motion.div variants={itemVariants} className={styles.roles}>
          <span className={styles.role}>Computer Vision Engineer</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>AI/ML Specialist</span>
          <span className={styles.divider}>·</span>
          <span className={styles.role}>Full-Stack Developer</span>
        </motion.div>
        
        <motion.p variants={itemVariants} className={styles.description}>
          AI & Computer Vision Engineer specializing in building end-to-end intelligent systems, 
          real-time visual recognition pipelines, and high-performance production deployments.
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
