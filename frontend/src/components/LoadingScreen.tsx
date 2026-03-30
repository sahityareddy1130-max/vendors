import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Design", "Create", "Inspire"];
const WORD_INTERVAL = 900; // ms
const COUNTER_DURATION = 2700; // ms
const ON_COMPLETE_DELAY = 400; // ms

export interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Rotating words logic
  useEffect(() => {
    if (wordIndex < WORDS.length - 1) {
      const timeout = setTimeout(() => setWordIndex(wordIndex + 1), WORD_INTERVAL);
      return () => clearTimeout(timeout);
    }
  }, [wordIndex]);

  // Counter logic
  useEffect(() => {
    let start: number | null = null;
    function animateCounter(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const next = Math.min((elapsed / COUNTER_DURATION) * 100, 100);
      setProgress(next);
      if (elapsed < COUNTER_DURATION) {
        rafRef.current = requestAnimationFrame(animateCounter);
      } else {
        setProgress(100);
        setTimeout(() => onCompleteRef.current(), ON_COMPLETE_DELAY);
      }
    }
    rafRef.current = requestAnimationFrame(animateCounter);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}
    >
      {/* Portfolio Label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Portfolio
      </motion.div>

      {/* Rotating Words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {Math.round(progress).toString().padStart(3, "0")}
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          className="h-full"
          style={{
            originX: 0,
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            scaleX: progress / 100,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
