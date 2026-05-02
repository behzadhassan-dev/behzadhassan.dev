"use client";

import { motion, Variants } from 'framer-motion';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "VLM Benchmarking",
    description: "Benchmarking 5 open-source Vision Language Models on Pakistani medical imaging data (Chest X-ray, CT scan, Brain MRI). Featuring a live Next.js dashboard.",
    techStack: ["Python", "PyTorch", "VLMs", "React", "Next.js"],
    github: "https://medical-vlm-evaluation.vercel.app/",
    isFeatured: true,
    category: "AI Research"
  },
  {
    title: "ROZA Luxury Store",
    description: "A premium, high-end e-commerce frontend featuring fluid swipe navigation, dynamic hover-zoom product inspection, and a sophisticated minimalist design system.",
    techStack: ["Next.js", "React", "CSS Modules", "UI/UX Design"],
    github: "https://roza-store.vercel.app", // The user provided this link
    isFeatured: true,
    category: "Full-Stack Design"
  },
  {
    title: "SegFormer.AI",
    description: "A premium, production-grade web application for real-time semantic segmentation of urban road scenes using the state-of-the-art SegFormer-B5 Transformer architecture.",
    techStack: ["Transformer", "FastAPI", "Computer Vision", "SegFormer", "Cityscapes"],
    github: "https://segformerai.vercel.app",
    category: "AI / Computer Vision"
  },
  {
    title: "SympScan",
    description: "AI Disease Prediction system using Random Forest Classifier trained on 96,000+ records. Delivers personalized treatment and workout plans.",
    techStack: ["Flask", "React", "scikit-learn", "Pandas"],
    github: "https://github.com/BehzadHassan/SympScan",
    category: "AI / Health Tech"
  },
  {
    title: "Mouse Tracking System",
    description: "Production-ready biometric fingerprinting for long-term individual identification in video sequences with real-time performance.",
    techStack: ["Python", "OpenCV", "Computer Vision"],
    github: "https://github.com/BehzadHassan/mouse-tracking-system",
    category: "Computer Vision"
  },
  {
    title: "3D Pose & Hand Detector",
    description: "A lightweight, production-ready module that reconstructs and tracks 3D human pose and hand landmarks in real-time.",
    techStack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/BehzadHassan/3D-Pose-Detector",
    category: "Computer Vision"
  },
  {
    title: "Face-Match",
    description: "Facial recognition app using FaceNet embeddings to match query images against a target directory with ranked similarity scores.",
    techStack: ["Python", "FaceNet", "Flask", "Deep Learning"],
    github: "https://github.com/BehzadHassan/Face-Match",
    category: "Deep Learning"
  },
  {
    title: "Face Mesh Detector",
    description: "A high-performance facial landmark system that reconstructs a 468-point 3D mesh in real-time. Leverages MediaPipe for precision face tracking, AR applications, and detailed 3D facial analysis.",
    techStack: ["Python", "OpenCV", "MediaPipe", "Real-time", "AI"],
    github: "https://github.com/BehzadHassan/face-mesh-detector",
    category: "Computer Vision"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>Selected <span className={styles.accent}>Projects</span></h2>
        <p className={styles.subtitle}>A collection of my work in AI, Computer Vision, and Web Development.</p>
      </motion.div>
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
