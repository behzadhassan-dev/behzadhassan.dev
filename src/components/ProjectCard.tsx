"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './ProjectCard.module.css';

interface ProjectProps {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  isFeatured?: boolean;
  category: string;
}

export default function ProjectCard({ title, description, techStack, github, isFeatured, category }: ProjectProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={`${styles.card} ${isFeatured ? styles.featured : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(github, '_blank')}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className={styles.contentWrapper}>
        {isFeatured && <span className={styles.featuredBadge}>FEATURED</span>}
        <div className={styles.content}>
          <span className={styles.category}>{category}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.techStack}>
            {techStack.map((tech, idx) => (
              <span key={idx} className={styles.tech}>{tech}</span>
            ))}
          </div>
          <div className={styles.links}>
            <span className={styles.githubLink}>
              View Project →
            </span>
          </div>
        </div>
      </div>
      <div className={styles.glowOverlay} />
    </motion.div>
  );
}
