"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TypewriterEffectProps = {
  texts: string[];
  delay?: number;
};

const TypewriterEffect = ({ texts, delay = 3000 }: TypewriterEffectProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => clearInterval(interval);
  }, [texts.length, delay]);

  return (
    <div className="mt-4 font-headline text-lg sm:text-xl md:text-2xl text-primary h-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={texts[index]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="whitespace-nowrap"
        >
          {texts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default TypewriterEffect;
