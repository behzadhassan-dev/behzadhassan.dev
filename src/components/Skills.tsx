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

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.title}>Technical <span className={styles.accent}>Expertise</span></h2>
      <div className={styles.grid}>
        {skillCategories.map((category, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillList}>
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className={styles.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
