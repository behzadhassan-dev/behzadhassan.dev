"use client";

import { motion, Variants } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "AI / Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "FaceNet", "Generative AI", "Vertex AI", "VLMs"]
  },
  {
    title: "Computer Vision",
    skills: ["OpenCV", "MediaPipe", "Real-time Detection", "Pose Estimation", "Facial Recognition", "Face Mesh"]
  },
  {
    title: "Full-Stack Development",
    skills: ["React", "Next.js", "Node.js", "Express.js", "Flask", "Django", "MongoDB", "MySQL"]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Technical <span className={styles.accent}>Expertise</span>
      </motion.h2>
      
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skillCategories.map((category, idx) => (
          <motion.div key={idx} variants={itemVariants} className={styles.card}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillList}>
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className={styles.skillBadge}>{skill}</span>
              ))}
            </div>
            <div className={styles.glowOverlay}></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
