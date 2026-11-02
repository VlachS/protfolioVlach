import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StorioMascotProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const StorioMascot: React.FC<StorioMascotProps> = ({
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const dimensions = 
    size === 'sm' ? { width: 48, height: 56 } :
    size === 'lg' ? { width: 84, height: 98 } :
    { width: 62, height: 72 };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <motion.div
        className="relative cursor-pointer group"
        animate={{
          y: isHovered ? -5 : [0, -3, 0],
          rotate: isHovered ? [0, -4, 4, 0] : 0,
        }}
        transition={{
          y: isHovered ? { duration: 0.2 } : { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
          rotate: { duration: 0.4 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Oficiální modrý maskot Restoria s čepicí R a brašnou"
      >
        {/* Exact faithful vector illustration of Restorio's blue mascot */}
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 170 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_14px_rgba(94,108,255,0.4)] filter transition-transform duration-200 group-hover:scale-105"
        >
          {/* Motion lines near waving left hand */}
          <path d="M38 12 L35 22" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M48 9 L44 19" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" />

          {/* Motion lines near right wing */}
          <path d="M152 135 L160 137" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M153 143 L161 145" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />

          {/* Blue Body fill (pear/teardrop shape tilted) */}
          <path
            d="M85 45 C115 35, 148 55, 142 85 C138 115, 135 145, 105 152 C70 160, 42 130, 48 95 C52 70, 65 52, 85 45 Z"
            fill="#616DFF"
          />

          {/* Left Stick Leg with knee joint and claws */}
          <line x1="50" y1="125" x2="16" y2="152" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="139" r="3.2" fill="#000000" />
          {/* Left claws */}
          <path d="M16 152 L6 158" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 152 L8 147" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 152 L12 163" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Stick Leg with knee joint and claws */}
          <line x1="82" y1="148" x2="72" y2="192" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <circle cx="77" cy="170" r="3.2" fill="#000000" />
          {/* Right claws */}
          <path d="M72 192 L67 199" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 192 L72 200" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 192 L78 198" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

          {/* Waving Left Wing / Arm */}
          <motion.path
            d="M62 70 C52 48, 50 25, 54 8 C57 15, 62 35, 67 60"
            fill="none"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isHovered ? [0, -8, 6, 0] : 0 }}
            style={{ originX: '65px', originY: '65px' }}
          />

          {/* Right Wing resting back */}
          <path
            d="M140 78 C144 95, 148 118, 165 138 C158 132, 148 112, 142 98"
            fill="none"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* White Cap on head with 'R' */}
          <path
            d="M115 14 C120 7, 148 9, 154 22 C150 28, 130 25, 116 23 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Visor edge */}
          <path
            d="M114 22 Q130 26 150 24"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Letter 'R' on cap */}
          <text
            x="132"
            y="21"
            fontFamily="system-ui, sans-serif"
            fontSize="10"
            fontWeight="bold"
            fill="#000000"
            textAnchor="middle"
          >
            R
          </text>

          {/* Head & Glasses */}
          {/* Left Spectacle Lens */}
          <ellipse
            cx="105"
            cy="42"
            rx="14"
            ry="13"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3.2"
          />
          {/* Left Pupil / Spiral Eye */}
          <circle cx="106" cy="42" r="5" fill="#000000" />
          <circle cx="107" cy="41" r="2.2" fill="#FFFFFF" />

          {/* Right Spectacle Lens */}
          <ellipse
            cx="138"
            cy="52"
            rx="13"
            ry="12"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3.2"
          />
          {/* Right Pupil / Spiral Eye */}
          <circle cx="138" cy="52" r="4.8" fill="#000000" />
          <circle cx="139" cy="51" r="2.2" fill="#FFFFFF" />

          {/* Glasses Bridge */}
          <path d="M117 43 Q125 41 127 46" stroke="#000000" strokeWidth="3.2" strokeLinecap="round" />

          {/* Beak pointing downwards */}
          <path
            d="M120 46 L108 58 L126 53 Z"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Squiggly chin feather under beak */}
          <path
            d="M97 64 Q93 68 97 72 Q93 76 97 80"
            stroke="#000000"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cross-body Messenger Bag Strap */}
          <path
            d="M87 50 C80 65, 82 85, 93 110 C99 122, 105 130, 114 136"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M91 51 C84 66, 86 86, 97 111 C103 123, 108 129, 117 134"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Courier Messenger Bag at the hip */}
          <path
            d="M110 128 C115 120, 126 120, 134 126 C140 132, 142 145, 135 153 C128 160, 115 158, 108 150 C104 144, 105 134, 110 128 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Bag flap arc */}
          <path
            d="M112 134 Q124 138 132 133"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bag front loop / clasp */}
          <path
            d="M118 142 Q122 145 126 142"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Small floating reaction on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            className="absolute -top-3 right-0 text-[11px]"
          >
            💙
          </motion.div>
        )}
      </motion.div>

      {/* Label */}
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
            <span>Restorio</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800/50">maskot</span>
          </span>
          <span className="text-[10px] text-slate-400 leading-none">
            modrý poštovní ptáček s čepicí R
          </span>
        </div>
      )}
    </div>
  );
};
