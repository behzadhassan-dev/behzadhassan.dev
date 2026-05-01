import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "VLM Benchmarking",
    description: "Benchmarking 5 open-source Vision Language Models on Pakistani medical imaging data (Chest X-ray, CT scan, Brain MRI). Featuring a live Next.js dashboard.",
    techStack: ["Python", "PyTorch", "VLMs", "React", "Next.js"],
    github: "https://github.com/BehzadHassan",
    isFeatured: true,
    category: "AI Research"
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
    title: "Budget Tracker",
    description: "Full-stack MERN application for personal finance with JWT authentication, transaction management, and secure password reset.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/BehzadHassan/Budget-Tracker",
    category: "Full-Stack"
  },
  {
    title: "Face-Match",
    description: "Facial recognition app using FaceNet embeddings to match query images against a target directory with ranked similarity scores.",
    techStack: ["Python", "FaceNet", "Flask", "Deep Learning"],
    github: "https://github.com/BehzadHassan/Face-Match",
    category: "Deep Learning"
  },
  {
    title: "3D Body Tracking GUI",
    description: "Desktop application for real-time human body pose detection driving a 3D model via live landmark data.",
    techStack: ["Python", "MediaPipe", "CustomTkinter", "3D"],
    github: "https://github.com/BehzadHassan",
    category: "Computer Vision"
  }
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Selected <span className={styles.accent}>Projects</span></h2>
        <p className={styles.subtitle}>A collection of my work in AI, Computer Vision, and Web Development.</p>
      </div>
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
