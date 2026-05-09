"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "AI / Machine Learning",
    icon: "🧠",
    color: "#34d399",
    skills: ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "FaceNet", "Generative AI", "Vertex AI", "VLMs"]
  },
  {
    title: "Computer Vision",
    icon: "👁️",
    color: "#22d3ee",
    skills: ["OpenCV", "MediaPipe", "Real-time Detection", "Pose Estimation", "Facial Recognition", "Face Mesh"]
  },
  {
    title: "Full-Stack Development",
    icon: "⚡",
    color: "#a78bfa",
    skills: ["React", "Next.js", "Node.js", "Express.js", "Flask", "Django", "MongoDB", "MySQL"]
  }
];

function HoverTiltCard({ children, color, className }: { children: React.ReactNode, color: string, className: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // 3D tilt ranges mapped to mouse pos
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

  return (
    <motion.div 
      className={`${className} hover-target`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        borderColor: `${color}60`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
      {/* Optional CV corners to match aesthetic */}
      <span className={styles.cvCornerTl}></span>
      <span className={styles.cvCornerTr}></span>
      <span className={styles.cvCornerBl}></span>
      <span className={styles.cvCornerBr}></span>
    </motion.div>
  );
}

function TimelineSkillNode({ skill, index, color }: { skill: string, index: number, color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.15"] 
  });

  const isLeft = index % 2 === 0;

  // Fade in, stay, fade out
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // 3D Scroll Transforms
  const z = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-400, 0, 0, -400]); // Depth
  const xOffset = isLeft ? -150 : 150;
  const x = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [xOffset, 0, 0, xOffset]); // Slide in from sides
  const rotateYOffset = isLeft ? -45 : 45;
  const rotateYScroll = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [rotateYOffset, 0, 0, rotateYOffset]); // Spin in

  return (
    <div ref={ref} className={`${styles.skillNodeContainer} ${isLeft ? styles.leftNode : styles.rightNode}`}>
      <motion.div 
        className={styles.timelineCenterDot} 
        style={{ backgroundColor: color, opacity, boxShadow: `0 0 10px ${color}80` }} 
      />
      
      <motion.div 
        className={isLeft ? styles.cardWrapperLeft : styles.cardWrapperRight}
        style={{ 
          opacity, 
          x, 
          z, 
          rotateY: rotateYScroll,
          transformStyle: "preserve-3d"
        }}
      >
        <HoverTiltCard color={color} className={styles.skillNodeCard}>
          <span className={styles.skillNodeText}>{skill}</span>
        </HoverTiltCard>
      </motion.div>
    </div>
  );
}

function CategorySection({ category }: { category: typeof skillCategories[0] }) {
  return (
    <div className={styles.categorySection}>
      {/* Sticky Header for the category */}
      <div className={styles.categoryHeaderContainer}>
        <motion.div 
          className={styles.categoryHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          style={{ borderColor: `${category.color}80`, boxShadow: `0 0 20px ${category.color}20` }}
        >
          <span className={styles.categoryIcon}>{category.icon}</span>
          <h3 className={styles.categoryTitle}>{category.title}</h3>
        </motion.div>
      </div>

      {/* Timeline of individual skills */}
      <div className={styles.skillsTimeline}>
        <div className={styles.timelineLine} />
        {category.skills.map((skill, sIdx) => (
          <TimelineSkillNode 
            key={sIdx} 
            skill={skill} 
            index={sIdx} 
            color={category.color} 
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.title}>
          Technical <span className={styles.accent}>Expertise</span>
        </h2>
        <p className={styles.subtitle}>Scroll to explore my skills</p>
      </motion.div>

      <div className={styles.allCategories}>
        {skillCategories.map((category, idx) => (
          <CategorySection key={idx} category={category} />
        ))}
      </div>
    </section>
  );
}
