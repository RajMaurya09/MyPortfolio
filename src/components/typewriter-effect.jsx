"use client";

import { useState, useEffect } from "react";

const TypewriterEffect = ({ texts, delay = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 100 : 150);
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, texts, textIndex, delay]);

  return (
    <div className="mt-4 font-headline text-lg sm:text-xl md:text-2xl text-primary h-16 sm:h-auto glass-card p-4 rounded-xl">
      <div className="whitespace-nowrap flex items-center justify-center h-8">
        <p>{displayedText}&nbsp;</p>
      </div>
    </div>
  );
};

export default TypewriterEffect;
