"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypewriterEffect = ({ texts, delay = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => clearInterval(interval);
  }, [texts.length, delay]);

  return (
    <div className="mt-4 font-headline text-lg sm:text-xl md:text-2xl text-primary h-16 sm:h-auto glass-card p-4 rounded-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[index]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="whitespace-nowrap flex items-center justify-center h-8"
        >
          <p>{texts[index]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TypewriterEffect;
