"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './ProjectCard.module.css';

interface ProjectProps {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  isFeatured?: boolean;
  category: string;
  model?: string;
  speed?: string;
  metric?: string;
  confidence?: number;
  accentClass?: string;
  liveUrl?: string;
}

function useTypewriter(text: string, active: boolean, charDelay = 35) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplay(""); setDone(false); return; }
    let i = 0;
    const iv = setInterval(() => {
      setDisplay(text.substring(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, charDelay);
    return () => clearInterval(iv);
  }, [text, active, charDelay]);
  return { display, done };
}

function useConfidenceCounter(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    let start = 0;
    const step = target / 30;
    const iv = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(iv); }
      else setValue(Math.round(start * 10) / 10);
    }, 25);
    return () => clearInterval(iv);
  }, [target, active]);
  return value;
}

export default function InferenceCard({ project, phase, isActive }: {
  project: ProjectProps;
  phase: number;
  isActive: boolean;
}) {
  const { title, description, techStack, github, category, model, speed, metric, confidence = 95, accentClass, liveUrl } = project;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 200, damping: 20 });
  const mySpring = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const { display: typedTitle, done: titleDone } = useTypewriter(title, phase >= 3);
  const confidenceVal = useConfidenceCounter(confidence, phase >= 4);

  const accent = accentClass ? styles[accentClass] : styles.accentDefault;
  const phaseClasses = [
    phase >= 1 ? styles.phase1 : '',
    phase >= 2 ? styles.phase2 : '',
    phase >= 3 ? styles.phase3 : '',
    phase >= 4 ? styles.phase4 : '',
  ].join(' ');

  return (
    <motion.div
      className={`${styles.card} ${accent} ${phaseClasses}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: isActive ? rotateX : 0, rotateY: isActive ? rotateY : 0, transformStyle: "preserve-3d" }}
    >
      {/* Scan line */}
      <div className={styles.scanLine} />
      <div className={styles.scanFlash} />

      {/* CV Corners */}
      <span className={`${styles.cvCorner} ${styles.cvTl}`} />
      <span className={`${styles.cvCorner} ${styles.cvTr}`} />
      <span className={`${styles.cvCorner} ${styles.cvBl}`} />
      <span className={`${styles.cvCorner} ${styles.cvBr}`} />

      {/* Layer 1: Status */}
      <div className={styles.layerStatus}>
        <div className={styles.statusLine}>
          <span className={styles.statusCategory}>{category}</span>
          <span className={styles.statusSpeed}>
            <span className={styles.statusDot} />
            {speed || "< 50ms"}
          </span>
        </div>
      </div>

      {/* Layer 2: Body */}
      <div className={styles.layerBody}>
        <h3 className={styles.title}>
          {phase >= 3 ? typedTitle : '\u00A0'}
          <span className={`${styles.titleCursor} ${titleDone ? styles.cursorHidden : ''}`} />
        </h3>
        <p className={styles.metricLead}>{metric || `${model || title}`}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.divider} />
        <div className={styles.techRow}>
          {techStack.map((t, i) => <span key={i} className={styles.techPill}>{t}</span>)}
        </div>
      </div>

      {/* Layer 3: Actions */}
      <div className={styles.layerActions}>
        <div className={styles.confidenceRow}>
          <span className={styles.confidenceLabel}>{confidenceVal.toFixed(1)}%</span>
          <div className={styles.confidenceTrack}>
            <div className={styles.confidenceFill} style={{ '--conf-width': `${confidence}%` } as React.CSSProperties} />
          </div>
        </div>
        <div className={styles.actionFooter}>
          <a href={liveUrl || github} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} onClick={e => e.stopPropagation()}>→ Live Demo</a>
          <a href={github} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary} onClick={e => e.stopPropagation()}>{"{ }"} Code</a>
        </div>
        <span className={styles.classifiedStamp}>CLASSIFIED ✓</span>
      </div>
    </motion.div>
  );
}
