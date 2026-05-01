"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function MatrixRain({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / 20);
    const drops: number[] = Array(columns).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテト∞≠≈∫∂∇";

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const charIndex = Math.floor(Math.random() * chars.length);
        const char = chars[charIndex];
        
        // Alternate colors: emerald, cyan, purple
        const colors = [
          "rgba(52, 211, 153, 0.25)",
          "rgba(34, 211, 238, 0.2)",
          "rgba(167, 139, 250, 0.2)",
        ];
        ctx.fillStyle = colors[i % 3];
        
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 80);
    return () => clearInterval(interval);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.4,
        pointerEvents: "none",
      }}
    />
  );
}

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    setMounted(true);
    setDimensions({ w: window.innerWidth, h: window.innerHeight });

    const handleResize = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 30%, #0a0f1a 60%, #0a0a0f 100%)",
      }}
    >
      {/* Matrix-style code rain */}
      <MatrixRain width={dimensions.w} height={dimensions.h} />

      {/* Moving gradient orbs */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["0%", "10%", "-5%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-15%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["0%", "-12%", "8%", "0%"],
          y: ["0%", "8%", "-5%", "0%"],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["0%", "-8%", "10%", "0%"],
          y: ["0%", "12%", "-8%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Dot grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}
