"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function MatrixRain({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disable alpha for main ctx
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = "0101010101"; // Simplified characters for faster rendering
    
    let animationFrameId: number;
    let lastTime = 0;
    const fps = 15; // Lower FPS for background
    const interval = 1000 / fps;

    const draw = (time: number) => {
      animationFrameId = requestAnimationFrame(draw);
      
      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      // Draw semi-transparent background to create trail
      ctx.fillStyle = "#0a0a0f";
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Single color for faster fill
        ctx.fillStyle = i % 2 === 0 ? "rgba(52, 211, 153, 0.15)" : "rgba(34, 211, 238, 0.12)";
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.3,
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

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({ w: window.innerWidth, h: window.innerHeight });
      }, 200);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        backgroundColor: "#0a0a0f",
      }}
    >
      <MatrixRain width={dimensions.w} height={dimensions.h} />

      {/* Static Glows (Better for mobile performance than animated ones) */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
