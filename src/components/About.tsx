"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import styles from './About.module.css';

const BrainIcon = () => (
  <svg className={styles.spinningIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const CodeIcon = () => (
  <svg className={styles.spinningIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

function Typewriter({ text, delay, start }: { text: string, delay: number, start: boolean }) {
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setContent(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, start, delay]);
  return <>{content}</>;
}

function HoverTiltTextCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={styles.glassCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  );
}

function Hover3DTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0);
  };

  useEffect(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div className={styles.terminalWrapper} ref={ref}>
      <motion.div 
        className={styles.terminal}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <div className={styles.terminalHeader}>
          <div style={{width:12, height:12, borderRadius:'50%', background:'#ff5f56'}}></div>
          <div style={{width:12, height:12, borderRadius:'50%', background:'#ffbd2e'}}></div>
          <div style={{width:12, height:12, borderRadius:'50%', background:'#27c93f'}}></div>
          <span className={styles.terminalTitle}>behzad@ai-core: ~</span>
        </div>
        <div className={styles.terminalBody}>
          <p><span className={styles.label}>OS:</span> <span className={styles.value}><Typewriter text="Sukkur IBA University v2026" delay={200} start={isInView}/></span></p>
          <p><span className={styles.label}>Location:</span> <span className={styles.value}><Typewriter text="Sukkur, Pakistan" delay={1400} start={isInView}/></span></p>
          <p><span className={styles.label}>Role:</span> <span className={styles.value}><Typewriter text="AI/ML Engineer & Developer" delay={2200} start={isInView}/></span></p>
          <p>
            <span className={styles.label}>Status:</span> 
            <span className={styles.value}>
              {isInView && <span className={styles.liveIndicator} style={{ animationDelay: '3.4s', opacity: 0, animationFillMode: 'forwards', animationName: 'statusPulse' }} />}
              <Typewriter text="Open to Work" delay={3400} start={isInView}/>
            </span>
          </p>
          <p><span className={styles.label}>Email:</span> <span className={styles.value}><Typewriter text="behzadhassan967@gmail.com" delay={4200} start={isInView}/></span><span className={styles.cursor}></span></p>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>

      <motion.h2 
        className={styles.title}
        style={{ opacity, y }}
      >
        About <span className={styles.accent}>Me</span>
      </motion.h2>

      <div className={styles.grid}>
        <motion.div className={styles.textColumn} style={{ opacity, y, transformStyle: "preserve-3d" }}>
          
          <HoverTiltTextCard>
            <CodeIcon />
            <p className={styles.cardText}>
              <strong>AI/ML Engineer and Computer Vision Specialist</strong> specializing in Python, machine learning, and full-stack web development. My passion lies in bridging the gap between cutting-edge AI models and production-ready applications.
            </p>
          </HoverTiltTextCard>

          <HoverTiltTextCard>
            <BrainIcon />
            <p className={styles.cardText}>
              Currently conducting research on <strong>benchmarking Vision Language Models (VLMs)</strong> 
              on Pakistani medical imaging data, focusing on chest X-rays, CT scans, and brain MRIs to evaluate AI diagnostic capabilities.
            </p>
          </HoverTiltTextCard>

        </motion.div>

        <motion.div style={{ opacity, y, transformStyle: "preserve-3d" }}>
          <Hover3DTerminal />
        </motion.div>

      </div>
    </section>
  );
}
