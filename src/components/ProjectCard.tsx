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
  return (
    <div className={`${styles.card} ${isFeatured ? styles.featured : ''}`}>
      {isFeatured && <span className={styles.featuredBadge}>FEATURED PROJECT</span>}
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
          <a href={github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            View Source →
          </a>
        </div>
      </div>
    </div>
  );
}
