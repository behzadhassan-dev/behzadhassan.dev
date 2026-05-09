"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './Projects.module.css';
import InferenceCard from './ProjectCard';

const projects = [
  {
    title: "VLM Benchmarking",
    description: "Benchmarking 5 VLMs on Pakistani medical imaging — Chest X-ray, CT, Brain MRI. Live Next.js evaluation dashboard.",
    techStack: ["Python", "PyTorch", "VLMs", "React", "Next.js"],
    github: "https://github.com/BehzadHassan/medical-vlm-evaluation",
    liveUrl: "https://medical-vlm-evaluation.vercel.app/",
    isFeatured: true,
    category: "AI Research",
    model: "LLaVA-Med · BiomedCLIP",
    speed: "1.2s · GPU",
    metric: "accuracy: 78.4% · 5 models · 3 modalities",
    confidence: 78.4,
    accentClass: "accentMedical"
  },
  {
    title: "ROZA Luxury Store",
    description: "Premium e-commerce frontend — fluid swipe navigation, hover-zoom inspection, minimalist design system.",
    techStack: ["Next.js", "React", "CSS Modules", "UI/UX"],
    github: "https://github.com/BehzadHassan/roza-store",
    liveUrl: "https://roza-store.vercel.app",
    category: "Full-Stack Design",
    model: "Next.js 14 · SSR",
    speed: "< 100ms · SSR",
    metric: "LCP: 0.8s · Lighthouse 98",
    confidence: 98,
    accentClass: "accentDesign"
  },
  {
    title: "SegFormer.AI",
    description: "Real-time semantic segmentation of urban scenes. SegFormer-B5 Transformer on Cityscapes.",
    techStack: ["Transformer", "FastAPI", "SegFormer", "Cityscapes"],
    github: "https://github.com/BehzadHassan/segformer-ai",
    liveUrl: "https://segformerai.vercel.app",
    category: "AI / Computer Vision",
    model: "SegFormer-B5",
    speed: "34ms · GPU",
    metric: "mIoU: 82.1 · 19 classes · real-time",
    confidence: 82.1,
    accentClass: "accentVision"
  },
  {
    title: "SympScan",
    description: "AI Disease Prediction — Random Forest on 96K+ records. Personalized treatment plans.",
    techStack: ["Flask", "React", "scikit-learn", "Pandas"],
    github: "https://github.com/BehzadHassan/SympScan",
    category: "AI / Health Tech",
    model: "Random Forest Classifier",
    speed: "< 5ms · CPU",
    metric: "accuracy: 94.8% · 96K records",
    confidence: 94.8,
    accentClass: "accentHealth"
  },
  {
    title: "Mouse Tracking System",
    description: "Biometric fingerprinting for individual identification in video sequences. Real-time pipeline.",
    techStack: ["Python", "OpenCV", "Computer Vision"],
    github: "https://github.com/BehzadHassan/mouse-tracking-system",
    category: "Computer Vision",
    model: "Custom CV Pipeline",
    speed: "28ms · CPU",
    metric: "track_id: stable · 30fps",
    confidence: 91,
    accentClass: "accentVision"
  },
  {
    title: "3D Pose & Hand Detector",
    description: "Reconstructs & tracks 3D human pose + hand landmarks in real-time. 54 total keypoints.",
    techStack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/BehzadHassan/3D-Pose-Detector",
    category: "Computer Vision",
    model: "MediaPipe Holistic",
    speed: "16ms · GPU",
    metric: "keypoints: 54 · 33 body + 21 hand",
    confidence: 97,
    accentClass: "accentVision"
  },
  {
    title: "Face-Match",
    description: "Facial recognition via FaceNet embeddings. Ranked similarity scoring against target directories.",
    techStack: ["Python", "FaceNet", "Flask", "Deep Learning"],
    github: "https://github.com/BehzadHassan/Face-Match",
    category: "Deep Learning",
    model: "FaceNet · InceptionV1",
    speed: "45ms · GPU",
    metric: "precision: 96.2% · cosine similarity",
    confidence: 96.2,
    accentClass: "accentDL"
  },
  {
    title: "Face Mesh Detector",
    description: "468-point 3D facial mesh in real-time. Precision tracking for AR and facial analysis.",
    techStack: ["Python", "OpenCV", "MediaPipe", "Real-time"],
    github: "https://github.com/BehzadHassan/face-mesh-detector",
    category: "Computer Vision",
    model: "MediaPipe Face Mesh",
    speed: "12ms · GPU",
    metric: "landmarks: 468 · 3D mesh · 60fps",
    confidence: 99,
    accentClass: "accentVision"
  }
];

function getCardTransform(offset: number) {
  if (offset === 0) return { x: '0%', rotateY: 0, scale: 1, z: 0, opacity: 1 };
  if (offset === -1) return { x: '-55%', rotateY: 15, scale: 0.82, z: -120, opacity: 0.5 };
  if (offset === 1) return { x: '55%', rotateY: -15, scale: 0.82, z: -120, opacity: 0.5 };
  if (offset === -2) return { x: '-85%', rotateY: 20, scale: 0.7, z: -220, opacity: 0.2 };
  if (offset === 2) return { x: '85%', rotateY: -20, scale: 0.7, z: -220, opacity: 0.2 };
  return { x: offset < 0 ? '-100%' : '100%', rotateY: 0, scale: 0.6, z: -300, opacity: 0 };
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phases, setPhases] = useState<number[]>(new Array(projects.length).fill(0));
  const activeRef = useRef(0);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = projects.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll → active index
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(Math.floor(latest * total), total - 1);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    });
    return unsub;
  }, [scrollYProgress, total]);

  // Trigger 4-phase animation when active card changes
  useEffect(() => {
    // Reset the new active card's phase
    setPhases(prev => {
      const next = [...prev];
      next[activeIndex] = 0;
      return next;
    });

    const setPhase = (p: number) => {
      setPhases(prev => {
        const next = [...prev];
        next[activeIndex] = p;
        return next;
      });
    };

    const t0 = setTimeout(() => setPhase(1), 50);
    const t1 = setTimeout(() => setPhase(2), 450);
    const t2 = setTimeout(() => setPhase(3), 750);
    const t3 = setTimeout(() => setPhase(4), 1050);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [activeIndex]);

  const goTo = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const sectionTop = containerRef.current.offsetTop;
    const sectionHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = sectionTop + (idx / total) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [total]);

  return (
    <section id="projects" className={styles.section} ref={containerRef}
      style={{ height: `${total * 90}vh`, position: 'relative' }}
    >
      <div className={styles.stickyViewport}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Selected <span className={styles.accent}>Projects</span></h2>
          <p className={styles.subtitle}>Model outputs from my workstation</p>
        </motion.div>

        <div className={styles.carouselContainer}>
          {/* 3D Card Carousel */}
          {projects.map((project, idx) => {
            const offset = idx - activeIndex;
            const t = getCardTransform(offset);
            const counter = `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

            const angleScale = isMobile ? 0.35 : 1;

            return (
              <div
                key={idx}
                className={styles.cardWrapper}
                style={{
                  transform: `translateX(${t.x}) translateZ(${t.z}px) rotateY(${t.rotateY * angleScale}deg) scale(${t.scale})`,
                  opacity: t.opacity,
                  zIndex: total - Math.abs(offset),
                  pointerEvents: offset === 0 ? 'auto' : Math.abs(offset) <= 1 ? 'auto' : 'none',
                  cursor: offset !== 0 ? 'pointer' : 'default',
                }}
                onClick={() => { if (offset !== 0 && Math.abs(offset) <= 1) goTo(idx); }}
              >
                <div className={`${styles.counter} ${offset === 0 ? styles.counterVisible : ''}`}>
                  {counter}
                </div>
                <InferenceCard
                  project={project as any}
                  phase={phases[idx]}
                  isActive={idx === activeIndex}
                />
              </div>
            );
          })}

          {/* Navigation Dots */}
          <div className={styles.navDots}>
            {projects.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.navDot} ${idx === activeIndex ? styles.navDotActive : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
