"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const lightGradient =
    "linear-gradient(45deg, hsl(208, 100%, 97%), hsl(200, 70%, 90%), hsl(140, 39%, 90%), hsl(208, 100%, 97%))";
  const darkGradient =
    "linear-gradient(45deg, hsl(222, 84%, 8%), hsl(200, 80%, 10%), hsl(222, 84%, 5%))";

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full animated-gradient"
      style={{
        background: theme === 'dark' ? darkGradient : lightGradient,
      }}
    />
  );
};

export default AnimatedBackground;
