import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface GiraffePeekerProps {
  onInteraction?: () => void;
}

export const GiraffePeeker: React.FC<GiraffePeekerProps> = ({ onInteraction }) => {
  const [blinking, setBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Random gentle eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 220);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -top-16 -right-8 sm:-top-20 sm:-right-10 z-0 pointer-events-auto select-none">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ y: 20, rotate: 12, opacity: 0 }}
        animate={{
          y: isHovered ? -8 : [0, -4, 0],
          rotate: isHovered ? 6 : 12,
          opacity: 1,
        }}
        transition={{
          y: isHovered ? { duration: 0.25 } : { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
          rotate: { duration: 0.3 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (onInteraction) onInteraction();
        }}
        title="Šimonovo oblíbené zvíře — Žirafa"
      >
        {/* Giraffe SVG illustration peeking from behind the photo */}
        <svg
          width="130"
          height="160"
          viewBox="0 0 130 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter transition-transform duration-300 group-hover:scale-105"
        >
          {/* Long graceful neck */}
          <path
            d="M52 75 C48 95, 42 125, 30 160 L88 160 C80 125, 78 95, 76 75 Z"
            fill="#E6A847"
          />
          {/* Neck spots */}
          <path d="M42 145 C45 138, 55 140, 58 148 C55 154, 45 152, 42 145 Z" fill="#935619" />
          <path d="M60 120 C64 114, 76 116, 75 125 C70 132, 60 128, 60 120 Z" fill="#935619" />
          <path d="M44 105 C48 98, 58 100, 56 109 C52 115, 43 112, 44 105 Z" fill="#935619" />
          <path d="M60 85 C63 80, 72 82, 71 89 C67 94, 60 91, 60 85 Z" fill="#935619" />

          {/* Ears with animated wiggle on hover */}
          <motion.g
            animate={{ rotate: isHovered ? [0, -10, 5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            style={{ originX: '45px', originY: '38px' }}
          >
            <path
              d="M44 38 C30 32, 22 42, 34 50 C40 52, 44 44, 44 38 Z"
              fill="#E6A847"
            />
            <path
              d="M40 39 C33 36, 28 42, 35 47 C38 48, 41 43, 40 39 Z"
              fill="#C8842E"
            />
          </motion.g>

          <motion.g
            animate={{ rotate: isHovered ? [0, 10, -5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            style={{ originX: '85px', originY: '38px' }}
          >
            <path
              d="M84 38 C98 32, 106 42, 94 50 C88 52, 84 44, 84 38 Z"
              fill="#E6A847"
            />
            <path
              d="M88 39 C95 36, 100 42, 93 47 C90 48, 87 43, 88 39 Z"
              fill="#C8842E"
            />
          </motion.g>

          {/* Horns (Ossicones) */}
          <path d="M53 30 L50 14" stroke="#D79738" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="50" cy="12" r="4.5" fill="#582C0E" />

          <path d="M75 30 L78 14" stroke="#D79738" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="78" cy="12" r="4.5" fill="#582C0E" />

          {/* Giraffe Head */}
          <path
            d="M46 34 C44 26, 84 26, 82 34 C86 46, 88 60, 78 76 C72 84, 56 84, 50 76 C40 60, 42 46, 46 34 Z"
            fill="#F2B755"
          />

          {/* Forehead patches */}
          <path d="M57 32 C62 30, 68 30, 70 34 C69 38, 59 38, 57 32 Z" fill="#935619" />
          <path d="M50 48 C54 44, 60 45, 59 52 C55 56, 49 54, 50 48 Z" fill="#935619" />
          <path d="M68 49 C72 45, 78 47, 77 53 C74 57, 67 55, 68 49 Z" fill="#935619" />

          {/* Muzzle / Snout */}
          <ellipse cx="64" cy="74" rx="14" ry="9" fill="#F8CF87" />
          <ellipse cx="59" cy="74" rx="1.8" ry="2.2" fill="#6A3B11" />
          <ellipse cx="69" cy="74" rx="1.8" ry="2.2" fill="#6A3B11" />
          <path
            d="M60 78 Q64 81 68 78"
            stroke="#6A3B11"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Eyes */}
          {blinking ? (
            <>
              <path d="M48 48 Q52 52 56 48" stroke="#1C130D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M72 48 Q76 52 80 48" stroke="#1C130D" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx="52" cy="48" rx="4.5" ry="5.5" fill="#20150E" />
              <circle cx="51" cy="46.5" r="1.6" fill="#FFFFFF" />
              <circle cx="53.5" cy="49" r="0.8" fill="#FFFFFF" />
              <path d="M47 44 L49 46" stroke="#20150E" strokeWidth="1.2" strokeLinecap="round" />

              <ellipse cx="76" cy="48" rx="4.5" ry="5.5" fill="#20150E" />
              <circle cx="75" cy="46.5" r="1.6" fill="#FFFFFF" />
              <circle cx="77.5" cy="49" r="0.8" fill="#FFFFFF" />
              <path d="M81 44 L79 46" stroke="#20150E" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}

          {/* Cheek blush */}
          <ellipse cx="46" cy="60" rx="3" ry="1.8" fill="#FF8A7A" opacity="0.4" />
          <ellipse cx="82" cy="60" rx="3" ry="1.8" fill="#FF8A7A" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
};
