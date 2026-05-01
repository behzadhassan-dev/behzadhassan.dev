import styles from "./page.module.css";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        
        {/* About Section (Placeholder for now) */}
        <section id="about" className={styles.section}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>About <span className={styles.accent}>Me</span></h2>
              <p>
                Final-year Computer Science student at Sukkur IBA University with hands-on experience in 
                Python, machine learning, computer vision, and full-stack web development. 
                Passionate about solving real-world problems through intelligent software.
              </p>
              <p>
                Currently conducting final-year research on benchmarking Vision Language Models (VLMs) 
                on Pakistani medical imaging data, focusing on chest X-rays, CT scans, and brain MRIs.
              </p>
            </div>
            <div className={styles.systemInfo}>
              <div className={styles.terminalHeader}>
                <div className={styles.dotRed}></div>
                <div className={styles.dotYellow}></div>
                <div className={styles.dotGreen}></div>
                <span className={styles.terminalTitle}>system_info.sh</span>
              </div>
              <div className={styles.terminalBody}>
                <p><span className={styles.label}>OS:</span> Sukkur IBA University v2026</p>
                <p><span className={styles.label}>Location:</span> Daharki, Pakistan</p>
                <p><span className={styles.label}>Status:</span> Open to Work</p>
                <p><span className={styles.label}>Email:</span> behzadhassan967@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
