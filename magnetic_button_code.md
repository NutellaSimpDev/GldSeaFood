# Magnetic Button — Default
A Magnetic Button is a UI component designed to enhance user interaction. When a user's cursor or touch input approaches the button, it subtly moves towards the user, simulating the effect of magnetic attraction. This interaction makes the button more enticing to click and adds a dynamic and engaging element to the user experience. This example was made with Tailwind CSS and Framer Motion.

install: npx shadcn@latest add "https://21st.dev/r/bundui/magnetic-button?api_key=$API_KEY_21ST"

## Component
```tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

type MagneticButtonType = {
  children: React.ReactNode;
  distance?: number;
};

function MagneticButton({ children, distance = 0.6 }: MagneticButtonType) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        if (isHovered) {
          x.set(distanceX * distance);
          y.set(distanceY * distance);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    document.addEventListener('mousemove', calculateDistance);

    return () => {
      document.removeEventListener('mousemove', calculateDistance);
    };
  }, [ref, isHovered]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        x: springX,
        y: springY
      }}>
      {children}
    </motion.div>
  );
}

export { MagneticButton };

```

## Demo (usage)
```tsx
import { MagneticButton } from "@/components/ui/magnetic-button";

function MagneticButtonExample() {
  return (
    <MagneticButton>
      <button className="bg-indigo-500 hover:bg-indigo-600 transition-colors px-10 text-lg text-white py-4 rounded-full">
        Magnetic Button
      </button>
    </MagneticButton>
  );
}

export { MagneticButtonExample };
```