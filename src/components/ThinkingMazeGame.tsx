import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Brain, 
  Lightbulb, 
  Compass, 
  Layers,
  ChevronRight,
  Shuffle,
  AlertTriangle,
  Eye,
  Undo2
} from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface DeadEndBranch {
  id: string;
  name: string;
  junctionNodeIndex: number;
  nodes: Point[];
}

interface ThoughtTrack {
  id: number;
  accentHex: string;
  gradientStop1: string;
  gradientStop2: string;
  nodes: Point[];
  deadEnds: DeadEndBranch[];
}

// Background chaotic tangled corridors representing raw unorganized thoughts
const CHAOTIC_BACKGROUND_CORRIDORS: Point[][] = [
  // Deep winding loop on bottom-left to top
  [
    { x: 70, y: 220 },
    { x: 105, y: 260 },
    { x: 160, y: 275 },
    { x: 160, y: 190 },
    { x: 110, y: 140 },
    { x: 75, y: 140 },
    { x: 65, y: 100 }
  ],
  // Tangled central crossover
  [
    { x: 175, y: 65 },
    { x: 220, y: 65 },
    { x: 270, y: 120 },
    { x: 230, y: 180 },
    { x: 280, y: 235 },
    { x: 335, y: 220 },
    { x: 345, y: 170 },
    { x: 380, y: 170 }
  ],
  // Top-right dead-end loop
  [
    { x: 350, y: 60 },
    { x: 395, y: 60 },
    { x: 425, y: 80 },
    { x: 425, y: 120 },
    { x: 380, y: 120 },
    { x: 380, y: 95 }
  ],
  // Bottom-right dead end
  [
    { x: 280, y: 270 },
    { x: 360, y: 270 },
    { x: 420, y: 250 },
    { x: 440, y: 220 },
    { x: 420, y: 195 }
  ]
];

const THOUGHT_TRACKS: ThoughtTrack[] = [
  {
    id: 1,
    accentHex: "#A855F7",
    gradientStop1: "#A855F7",
    gradientStop2: "#3B82F6",
    nodes: [
      { x: 90, y: 170 },   // 0 START
      { x: 130, y: 170 },  // 1 Junction A
      { x: 130, y: 240 },  // 2
      { x: 190, y: 240 },  // 3 Junction B
      { x: 190, y: 110 },  // 4
      { x: 140, y: 110 },  // 5
      { x: 140, y: 70 },   // 6
      { x: 250, y: 70 },   // 7 Junction C
      { x: 250, y: 160 },  // 8
      { x: 210, y: 160 },  // 9
      { x: 210, y: 200 },  // 10
      { x: 300, y: 200 },  // 11 Junction D
      { x: 300, y: 250 },  // 12
      { x: 360, y: 250 },  // 13
      { x: 360, y: 130 },  // 14
      { x: 310, y: 130 },  // 15
      { x: 310, y: 90 },   // 16
      { x: 410, y: 90 },   // 17 Junction E
      { x: 410, y: 170 },  // 18
      { x: 460, y: 170 },  // 19 EXIT
    ],
    deadEnds: [
      {
        id: "1-A",
        name: "Slepá chodba do rohu",
        junctionNodeIndex: 1,
        nodes: [
          { x: 130, y: 170 },
          { x: 130, y: 120 },
          { x: 95, y: 120 },
          { x: 75, y: 80 }
        ]
      },
      {
        id: "1-B",
        name: "Slepá odbočka do hlubiny",
        junctionNodeIndex: 3,
        nodes: [
          { x: 190, y: 240 },
          { x: 190, y: 280 },
          { x: 240, y: 280 },
          { x: 255, y: 260 }
        ]
      },
      {
        id: "1-C",
        name: "Falešná horní chodbička",
        junctionNodeIndex: 7,
        nodes: [
          { x: 250, y: 70 },
          { x: 290, y: 70 },
          { x: 330, y: 55 },
          { x: 360, y: 55 }
        ]
      },
      {
        id: "1-D",
        name: "Zavádějící smyčka nikam",
        junctionNodeIndex: 11,
        nodes: [
          { x: 300, y: 200 },
          { x: 260, y: 200 },
          { x: 260, y: 235 },
          { x: 240, y: 235 }
        ]
      },
      {
        id: "1-E",
        name: "Falešný východ",
        junctionNodeIndex: 17,
        nodes: [
          { x: 410, y: 90 },
          { x: 445, y: 90 },
          { x: 445, y: 130 }
        ]
      }
    ]
  },
  {
    id: 2,
    accentHex: "#3B82F6",
    gradientStop1: "#3B82F6",
    gradientStop2: "#06B6D4",
    nodes: [
      { x: 90, y: 170 },   // 0
      { x: 130, y: 170 },  // 1
      { x: 130, y: 90 },   // 2
      { x: 220, y: 90 },   // 3
      { x: 220, y: 150 },  // 4
      { x: 160, y: 150 },  // 5
      { x: 160, y: 230 },  // 6
      { x: 260, y: 230 },  // 7
      { x: 260, y: 100 },  // 8
      { x: 330, y: 100 },  // 9
      { x: 330, y: 240 },  // 10
      { x: 400, y: 240 },  // 11
      { x: 400, y: 170 },  // 12
      { x: 460, y: 170 },  // 13
    ],
    deadEnds: [
      {
        id: "2-A",
        name: "Zavádějící spodní rameno",
        junctionNodeIndex: 1,
        nodes: [
          { x: 130, y: 170 },
          { x: 130, y: 250 },
          { x: 95, y: 250 }
        ]
      },
      {
        id: "2-B",
        name: "Slepý stropní výklenek",
        junctionNodeIndex: 3,
        nodes: [
          { x: 220, y: 90 },
          { x: 220, y: 55 },
          { x: 280, y: 55 },
          { x: 280, y: 75 }
        ]
      },
      {
        id: "2-C",
        name: "Spodní slepá kolej",
        junctionNodeIndex: 6,
        nodes: [
          { x: 160, y: 230 },
          { x: 160, y: 275 },
          { x: 210, y: 275 }
        ]
      },
      {
        id: "2-D",
        name: "Falešná přímka",
        junctionNodeIndex: 9,
        nodes: [
          { x: 330, y: 100 },
          { x: 390, y: 100 },
          { x: 390, y: 65 }
        ]
      },
      {
        id: "2-E",
        name: "Zavádějící pravý uzel",
        junctionNodeIndex: 11,
        nodes: [
          { x: 400, y: 240 },
          { x: 435, y: 240 },
          { x: 435, y: 210 }
        ]
      }
    ]
  },
  {
    id: 3,
    accentHex: "#10B981",
    gradientStop1: "#10B981",
    gradientStop2: "#34D399",
    nodes: [
      { x: 90, y: 170 },   // 0
      { x: 120, y: 220 },  // 1
      { x: 170, y: 250 },  // 2
      { x: 220, y: 200 },  // 3
      { x: 180, y: 130 },  // 4
      { x: 200, y: 75 },   // 5
      { x: 270, y: 75 },   // 6
      { x: 310, y: 140 },  // 7
      { x: 280, y: 200 },  // 8
      { x: 330, y: 250 },  // 9
      { x: 380, y: 220 },  // 10
      { x: 420, y: 150 },  // 11
      { x: 460, y: 170 },  // 12
    ],
    deadEnds: [
      {
        id: "3-A",
        name: "Slepá chodba do zdi",
        junctionNodeIndex: 1,
        nodes: [
          { x: 120, y: 220 },
          { x: 80, y: 220 },
          { x: 70, y: 180 }
        ]
      },
      {
        id: "3-B",
        name: "Zavádějící spirála",
        junctionNodeIndex: 4,
        nodes: [
          { x: 180, y: 130 },
          { x: 130, y: 130 },
          { x: 110, y: 90 }
        ]
      },
      {
        id: "3-C",
        name: "Falešná cesta k vrcholu",
        junctionNodeIndex: 6,
        nodes: [
          { x: 270, y: 75 },
          { x: 340, y: 75 },
          { x: 370, y: 100 }
        ]
      },
      {
        id: "3-D",
        name: "Slepý spodní kanál",
        junctionNodeIndex: 9,
        nodes: [
          { x: 330, y: 250 },
          { x: 330, y: 280 },
          { x: 370, y: 280 }
        ]
      },
      {
        id: "3-E",
        name: "Zavádějící výběžek",
        junctionNodeIndex: 11,
        nodes: [
          { x: 420, y: 150 },
          { x: 445, y: 120 },
          { x: 445, y: 90 }
        ]
      }
    ]
  },
  {
    id: 4,
    accentHex: "#F59E0B",
    gradientStop1: "#F59E0B",
    gradientStop2: "#E11D48",
    nodes: [
      { x: 90, y: 170 },   // 0
      { x: 120, y: 140 },  // 1
      { x: 150, y: 80 },   // 2
      { x: 230, y: 65 },   // 3
      { x: 310, y: 65 },   // 4
      { x: 380, y: 80 },   // 5
      { x: 410, y: 130 },  // 6
      { x: 350, y: 170 },  // 7
      { x: 260, y: 170 },  // 8
      { x: 220, y: 240 },  // 9
      { x: 340, y: 240 },  // 10
      { x: 410, y: 210 },  // 11
      { x: 460, y: 170 },  // 12
    ],
    deadEnds: [
      {
        id: "4-A",
        name: "Slepé boční rameno",
        junctionNodeIndex: 1,
        nodes: [
          { x: 120, y: 140 },
          { x: 120, y: 200 },
          { x: 80, y: 200 }
        ]
      },
      {
        id: "4-B",
        name: "Zavádějící vnitřní tunel",
        junctionNodeIndex: 3,
        nodes: [
          { x: 230, y: 65 },
          { x: 230, y: 120 },
          { x: 190, y: 120 }
        ]
      },
      {
        id: "4-C",
        name: "Slepá horní kapsa",
        junctionNodeIndex: 5,
        nodes: [
          { x: 380, y: 80 },
          { x: 430, y: 80 },
          { x: 440, y: 110 }
        ]
      },
      {
        id: "4-D",
        name: "Centrální slepá kolej",
        junctionNodeIndex: 8,
        nodes: [
          { x: 260, y: 170 },
          { x: 260, y: 205 },
          { x: 290, y: 205 }
        ]
      },
      {
        id: "4-E",
        name: "Zavádějící spodní oblouk",
        junctionNodeIndex: 10,
        nodes: [
          { x: 340, y: 240 },
          { x: 340, y: 280 },
          { x: 390, y: 280 }
        ]
      }
    ]
  }
];

// Calculate cumulative distances along any sequence of rail nodes
function computeRailMetrics(nodes: Point[]) {
  const segmentLengths: number[] = [];
  const cumulativeDistances: number[] = [0];
  let totalDist = 0;

  for (let i = 0; i < nodes.length - 1; i++) {
    const dx = nodes[i + 1].x - nodes[i].x;
    const dy = nodes[i + 1].y - nodes[i].y;
    const dist = Math.hypot(dx, dy);
    segmentLengths.push(dist);
    totalDist += dist;
    cumulativeDistances.push(totalDist);
  }

  return { segmentLengths, cumulativeDistances, totalDist };
}

// Convert distance along the rail to an exact (x, y) point strictly ON THE RAIL
function getPointAtDistance(
  dist: number,
  nodes: Point[],
  cumulativeDistances: number[],
  segmentLengths: number[],
  totalDist: number
): Point {
  const clampedDist = Math.max(0, Math.min(dist, totalDist));

  for (let i = 0; i < segmentLengths.length; i++) {
    const startDist = cumulativeDistances[i];
    const endDist = cumulativeDistances[i + 1];

    if (clampedDist >= startDist && clampedDist <= endDist) {
      const segLen = segmentLengths[i];
      if (segLen === 0) return nodes[i];
      const t = (clampedDist - startDist) / segLen;
      return {
        x: nodes[i].x + t * (nodes[i + 1].x - nodes[i].x),
        y: nodes[i].y + t * (nodes[i + 1].y - nodes[i].y)
      };
    }
  }

  return nodes[nodes.length - 1];
}

// Find closest distance on rail to given coordinates, constrained near current progress
function projectToRailNearby(
  target: Point,
  currentDist: number,
  nodes: Point[],
  cumulativeDistances: number[],
  segmentLengths: number[],
  totalDist: number
): number {
  let bestDist = currentDist;
  let bestSqDist = Infinity;

  const windowRadius = 90;
  const minSearchDist = Math.max(0, currentDist - 40);
  const maxSearchDist = Math.min(totalDist, currentDist + windowRadius);

  const steps = 30;
  for (let s = 0; s <= steps; s++) {
    const testDist = minSearchDist + (s / steps) * (maxSearchDist - minSearchDist);
    const pt = getPointAtDistance(testDist, nodes, cumulativeDistances, segmentLengths, totalDist);
    const sqDist = (pt.x - target.x) ** 2 + (pt.y - target.y) ** 2;

    if (sqDist < bestSqDist) {
      bestSqDist = sqDist;
      bestDist = testDist;
    }
  }

  return bestDist;
}

// Project coordinate along a dead-end branch
function projectToBranch(
  target: Point,
  branchNodes: Point[],
  cumulativeDistances: number[],
  segmentLengths: number[],
  totalDist: number
): number {
  let bestDist = 0;
  let bestSqDist = Infinity;

  const steps = 30;
  for (let s = 0; s <= steps; s++) {
    const testDist = (s / steps) * totalDist;
    const pt = getPointAtDistance(testDist, branchNodes, cumulativeDistances, segmentLengths, totalDist);
    const sqDist = (pt.x - target.x) ** 2 + (pt.y - target.y) ** 2;
    if (sqDist < bestSqDist) {
      bestSqDist = sqDist;
      bestDist = testDist;
    }
  }

  return bestDist;
}

export const ThinkingMazeGame: React.FC = () => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const currentTrack = THOUGHT_TRACKS[activeTrackIndex];

  // Whether the thought can enter dead ends (user toggle per request)
  const [allowEnterDeadEnds, setAllowEnterDeadEnds] = useState(true);

  // Active dead end exploration state
  // null = thought is on the main track
  // { branchIndex: number; dist: number } = thought is navigating a dead-end branch
  const [activeDeadEnd, setActiveDeadEnd] = useState<{
    branchIndex: number;
    dist: number;
  } | null>(null);

  // Main track metrics
  const { segmentLengths, cumulativeDistances, totalDist } = useMemo(
    () => computeRailMetrics(currentTrack.nodes),
    [currentTrack]
  );

  // Precompute metrics for all dead ends on the current track
  const deadEndMetrics = useMemo(() => {
    return currentTrack.deadEnds.map(b => ({
      ...computeRailMetrics(b.nodes),
      junctionMainDist: cumulativeDistances[b.junctionNodeIndex] || 0
    }));
  }, [currentTrack, cumulativeDistances]);

  const [currentDistance, setCurrentDistance] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [deceptiveWarningToast, setDeceptiveWarningToast] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Switch track
  const handleSelectTrack = (index: number) => {
    setActiveTrackIndex(index);
    setCurrentDistance(0);
    setActiveDeadEnd(null);
    setIsCompleted(false);
    setDeceptiveWarningToast(null);
    playChime(300 + index * 50);
  };

  const handleNextThought = () => {
    const nextIdx = (activeTrackIndex + 1) % THOUGHT_TRACKS.length;
    handleSelectTrack(nextIdx);
  };

  // Synthesize soft chime
  const playChime = useCallback((frequency: number, type: OscillatorType = 'sine') => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio may be blocked before user gesture
    }
  }, [audioEnabled]);

  const playSuccessChord = useCallback(() => {
    if (!audioEnabled) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => playChime(freq, 'triangle'), i * 110);
    });
  }, [audioEnabled, playChime]);

  const playDeadEndWarningSound = useCallback(() => {
    if (!audioEnabled) return;
    [240, 190].forEach((freq, i) => {
      setTimeout(() => playChime(freq, 'sawtooth'), i * 140);
    });
  }, [audioEnabled, playChime]);

  // Current coordinate strictly locked onto rail (either main or dead-end branch)
  const currentPos = useMemo(() => {
    if (activeDeadEnd !== null) {
      const branch = currentTrack.deadEnds[activeDeadEnd.branchIndex];
      const metrics = deadEndMetrics[activeDeadEnd.branchIndex];
      if (branch && metrics) {
        return getPointAtDistance(
          activeDeadEnd.dist,
          branch.nodes,
          metrics.cumulativeDistances,
          metrics.segmentLengths,
          metrics.totalDist
        );
      }
    }
    return getPointAtDistance(
      currentDistance,
      currentTrack.nodes,
      cumulativeDistances,
      segmentLengths,
      totalDist
    );
  }, [activeDeadEnd, currentDistance, currentTrack, deadEndMetrics, cumulativeDistances, segmentLengths, totalDist]);

  // Drag interaction handler
  const updateRailMovement = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 480 / rect.width;
    const scaleY = 320 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    const mousePoint = { x: mouseX, y: mouseY };

    // Case 1: Currently inside a dead-end branch
    if (activeDeadEnd !== null) {
      const branchIdx = activeDeadEnd.branchIndex;
      const branch = currentTrack.deadEnds[branchIdx];
      const metrics = deadEndMetrics[branchIdx];
      if (!branch || !metrics) return;

      const branchDist = projectToBranch(
        mousePoint,
        branch.nodes,
        metrics.cumulativeDistances,
        metrics.segmentLengths,
        metrics.totalDist
      );

      // If user dragged back to the junction point (<= 6px from fork)
      if (branchDist <= 6) {
        setActiveDeadEnd(null);
        setCurrentDistance(metrics.junctionMainDist);
        playChime(360, 'sine');
      } else {
        setActiveDeadEnd({
          branchIndex: branchIdx,
          dist: branchDist
        });

        // Hit dead-end buffer stop
        if (branchDist >= metrics.totalDist - 8) {
          playDeadEndWarningSound();
        } else {
          playChime(220 + Math.floor(branchDist / 20) * 15, 'sine');
        }
      }
      return;
    }

    // Case 2: On main track
    // First, check if near any junction to a dead end
    let enteredDeadEnd = false;

    if (allowEnterDeadEnds) {
      for (let bIdx = 0; bIdx < currentTrack.deadEnds.length; bIdx++) {
        const b = currentTrack.deadEnds[bIdx];
        const bMetrics = deadEndMetrics[bIdx];
        const junctionDist = bMetrics.junctionMainDist;

        // If the thought is within 35px along main track from this junction
        if (Math.abs(currentDistance - junctionDist) <= 35) {
          // Check distance of cursor to branch node 1 (the fork path)
          const forkTarget = b.nodes[1];
          const distToBranchFork = Math.hypot(mouseX - forkTarget.x, mouseY - forkTarget.y);
          
          // Next main point
          const mainNextNode = currentTrack.nodes[b.junctionNodeIndex + 1];
          const distToMainNext = mainNextNode ? Math.hypot(mouseX - mainNextNode.x, mouseY - mainNextNode.y) : 999;

          // If user pulled distinctly into the dead end branch
          if (distToBranchFork < 45 && distToBranchFork < distToMainNext) {
            const branchDist = projectToBranch(
              mousePoint,
              b.nodes,
              bMetrics.cumulativeDistances,
              bMetrics.segmentLengths,
              bMetrics.totalDist
            );
            setActiveDeadEnd({ branchIndex: bIdx, dist: Math.max(10, branchDist) });
            playDeadEndWarningSound();
            enteredDeadEnd = true;
            break;
          }
        }
      }
    } else {
      // In "Only Deceptive Visual" mode, if user pulls close to a dead end, show brief toast
      for (let bIdx = 0; bIdx < currentTrack.deadEnds.length; bIdx++) {
        const b = currentTrack.deadEnds[bIdx];
        const bMetrics = deadEndMetrics[bIdx];
        const junctionDist = bMetrics.junctionMainDist;
        if (Math.abs(currentDistance - junctionDist) <= 25) {
          const forkTarget = b.nodes[1];
          const distToBranchFork = Math.hypot(mouseX - forkTarget.x, mouseY - forkTarget.y);
          if (distToBranchFork < 40) {
            setDeceptiveWarningToast(`Zavádějící chodbička (${b.name}) — slepá ulička! Držte se hlavní koleje.`);
            setTimeout(() => setDeceptiveWarningToast(null), 2500);
            break;
          }
        }
      }
    }

    if (enteredDeadEnd) return;

    // Normal projection onto main track
    const nextDist = projectToRailNearby(
      mousePoint,
      currentDistance,
      currentTrack.nodes,
      cumulativeDistances,
      segmentLengths,
      totalDist
    );

    if (Math.abs(nextDist - currentDistance) > 3) {
      setCurrentDistance(nextDist);

      if (nextDist >= totalDist - 10 && !isCompleted) {
        setIsCompleted(true);
        playSuccessChord();
      } else {
        const progressMod = Math.floor(nextDist / 80);
        playChime(320 + progressMod * 30);
      }
    }
  }, [
    activeDeadEnd, 
    allowEnterDeadEnds, 
    currentDistance, 
    currentTrack, 
    deadEndMetrics, 
    cumulativeDistances, 
    segmentLengths, 
    totalDist, 
    isCompleted, 
    playChime, 
    playSuccessChord, 
    playDeadEndWarningSound
  ]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateRailMovement(e);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updateRailMovement(e);
    };

    const handleGlobalPointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [isDragging, updateRailMovement]);

  const handleReset = () => {
    setCurrentDistance(0);
    setActiveDeadEnd(null);
    setIsCompleted(false);
    setDeceptiveWarningToast(null);
    playChime(260);
  };

  const handleReturnFromDeadEnd = () => {
    if (activeDeadEnd !== null) {
      const junctionDist = deadEndMetrics[activeDeadEnd.branchIndex].junctionMainDist;
      setActiveDeadEnd(null);
      setCurrentDistance(junctionDist);
      playChime(360, 'sine');
    }
  };

  const handleStepForward = () => {
    if (activeDeadEnd !== null) {
      // If currently stuck in a dead end, return to main track first
      handleReturnFromDeadEnd();
      return;
    }
    const next = Math.min(totalDist, currentDistance + 60);
    setCurrentDistance(next);
    playChime(340 + Math.floor(next / 60) * 35);
    if (next >= totalDist - 10) {
      setIsCompleted(true);
      playSuccessChord();
    }
  };

  // SVG paths
  const mainRailSvgPath = useMemo(() => {
    return currentTrack.nodes.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');
  }, [currentTrack.nodes]);

  const progressPercent = Math.min(100, Math.round((currentDistance / totalDist) * 100));

  const isCurrentDeadEndActive = activeDeadEnd !== null;
  const currentDeadEndInfo = isCurrentDeadEndActive ? currentTrack.deadEnds[activeDeadEnd.branchIndex] : null;

  return (
    <section id="jak-premyslim" className="py-24 relative overflow-hidden bg-[#0A0C13]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-purple-400 mb-3 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>Interaktivní minihra</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Jak přemýšlím
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Pohled do mého vnitřního myšlenkového procesu. Zkuste vyvést zašmodrchanou myšlenku ven z labyrintu plného slepých chodbiček a chaosu.
          </p>
        </div>

        {/* Main Grid: Left side text & illustration, Right side interactive thought maze */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Blond man profile + Required quote */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div>
              {/* Blond Man Head Vector Illustration */}
              <div className="flex items-center justify-center py-4 relative">
                <div className="relative w-44 h-48 sm:w-52 sm:h-56">
                  <svg
                    viewBox="0 0 200 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  >
                    {/* Head / Face profile (looking right toward thought bubble) */}
                    <path
                      d="M75 180 L75 140 C60 135, 50 115, 52 90 C54 60, 80 45, 115 45 C150 45, 168 68, 166 98 C165 116, 155 128, 142 136 L144 180 Z"
                      fill="#1E2333"
                    />

                    {/* Handsome Blond Hair */}
                    <path
                      d="M60 92 C55 60, 80 28, 120 28 C155 28, 180 50, 175 80 C165 72, 150 68, 140 70 C130 55, 115 50, 95 56 C85 60, 75 75, 70 92 Z"
                      fill="#F5D061"
                    />
                    <path
                      d="M90 32 C115 30, 145 40, 152 65 C138 52, 120 48, 100 52 Z"
                      fill="#FDE68A"
                    />
                    <path
                      d="M70 70 C85 45, 110 40, 130 45 C115 48, 98 55, 85 75 Z"
                      fill="#EAB308"
                    />
                    <path
                      d="M142 62 C162 70, 172 88, 168 102 C164 88, 154 78, 142 74 Z"
                      fill="#CA8A04"
                    />

                    {/* Face Details */}
                    <path
                      d="M95 105 C92 98, 102 92, 108 97 C112 101, 110 115, 102 118 C96 116, 95 110, 95 105 Z"
                      fill="#282E44"
                    />
                    <ellipse cx="140" cy="95" rx="3.5" ry="2" fill="#60A5FA" />
                    <circle cx="140" cy="95" r="1.2" fill="#0F172A" />
                    <path d="M134 88 Q142 86 148 90" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />

                    <path
                      d="M158 92 L164 104 L157 108"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M152 120 Q158 120 160 122"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Eyeglasses modern frame */}
                    <rect x="130" y="88" width="20" height="15" rx="3" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.6" />
                    <line x1="120" y1="94" x2="130" y2="94" stroke="#94A3B8" strokeWidth="1.5" opacity="0.6" />

                    {/* Synaptic currents streaming towards thought bubble */}
                    <motion.path
                      d="M150 78 C175 75, 185 85, 205 80"
                      stroke={currentTrack.accentHex}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                      d="M155 88 C180 90, 190 98, 210 95"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>
              </div>

              {/* Exact required text in highlighted quote block */}
              <div className="bg-[#141926] border border-purple-500/20 rounded-xl p-5 mb-5 relative">
                <span className="text-2xl text-purple-400 font-serif absolute -top-3 left-4 bg-[#141926] px-1 select-none">“</span>
                <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed pt-1">
                  Moje myšlenky se mi dokážou často zamotat. Vždy je musím rozdělit a uspořádat, aby všem dávali smysl.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-purple-300/80">
                  <span>— Šimon Vlach</span>
                  <span className="text-[11px] text-slate-400">Přístup k řešení problémů</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                V mozku vzniká spousta falešných odboček a slepých chodbiček. Často se myšlenka vydá špatným směrem, který ke konci nevede. Úkolem je nenechat se zmást slepými rameny, vrátit se na správnou kolej a dovést myšlenku do cíle.
              </p>
            </div>

            {/* Micro stat / method indicators */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center">
              <div className="p-2 rounded-lg bg-[#141926]/60">
                <span className="block text-xs text-purple-400 font-medium">1. Rozdělit</span>
                <span className="text-[11px] text-slate-400">Oddělit slepé cesty</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141926]/60">
                <span className="block text-xs text-blue-400 font-medium">2. Uspořádat</span>
                <span className="text-[11px] text-slate-400">Držet se kolejí</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141926]/60">
                <span className="block text-xs text-emerald-400 font-medium">3. Dát smysl</span>
                <span className="text-[11px] text-slate-400">Dovést do cíle</span>
              </div>
            </div>
          </div>

          {/* Right Column: Thought Bubble with Dead Ends & Track Switching */}
          <div className="lg:col-span-7 bg-[#0F131D] border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Top Bar inside minigame */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-20">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    Myšlenková bublina
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                    Myšlenka {activeTrackIndex + 1} / {THOUGHT_TRACKS.length}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  V bludišti jsou <strong className="text-rose-400">špatné chodbičky</strong> končící ve slepých uličkách. Tahem posouvejte <strong className="text-purple-300">„MYŠLENKA“</strong> po kolejích.
                </p>
              </div>

              {/* Simple Track Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-[#121622] rounded-xl border border-slate-800">
                {THOUGHT_TRACKS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectTrack(idx)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      activeTrackIndex === idx
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dráha {idx + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleNextThought}
                  className="px-2 py-1 text-xs text-purple-400 hover:text-purple-200 transition-colors flex items-center gap-1 ml-1"
                  title="Přejít na další myšlenku"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Další</span>
                </button>
              </div>
            </div>

            {/* Sub-toolbar: Dead-end mode toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Špatné chodbičky:</span>
                <button
                  type="button"
                  onClick={() => {
                    setAllowEnterDeadEnds(!allowEnterDeadEnds);
                    if (allowEnterDeadEnds && activeDeadEnd) {
                      handleReturnFromDeadEnd();
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                    allowEnterDeadEnds
                      ? 'bg-rose-950/60 border-rose-800/80 text-rose-300 hover:bg-rose-900/60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
                  }`}
                  title={allowEnterDeadEnds ? 'Klikněte pro režim pouhého klamu (myšlenka do slepé uličky nevjede)' : 'Klikněte pro režim, kde lze zabloudit do slepé uličky'}
                >
                  {allowEnterDeadEnds ? (
                    <>
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>Lze vjet do slepé uličky</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span>Pouze vizuální klam (neprojede)</span>
                    </>
                  )}
                </button>
              </div>

              {isCurrentDeadEndActive && (
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 text-xs font-semibold animate-pulse flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Slepá ulička: {currentDeadEndInfo?.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleReturnFromDeadEnd}
                    className="px-2 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 rounded text-xs flex items-center gap-1"
                  >
                    <Undo2 className="w-3 h-3" />
                    <span>Vrátit na kolej</span>
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Maze Stage */}
            <div className="relative w-full aspect-[480/320] bg-[#0A0D15] rounded-xl border border-slate-800/90 overflow-hidden select-none touch-none shadow-inner flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 480 320"
                className="w-full h-full cursor-grab active:cursor-grabbing"
                onPointerDown={handlePointerDown}
              >
                {/* Organic thought bubble perimeter */}
                <path
                  d="M 50 160 C 40 100, 90 40, 160 40 C 220 30, 270 30, 330 45 C 400 40, 450 90, 440 150 C 455 210, 410 280, 340 280 C 280 290, 210 290, 150 280 C 80 280, 40 220, 50 160 Z"
                  fill="#0D111A"
                  stroke="#1E2638"
                  strokeWidth="2"
                />

                {/* 1. CHAOTIC BACKGROUND CORRIDORS (Faint maze tangle) */}
                {CHAOTIC_BACKGROUND_CORRIDORS.map((corridor, idx) => {
                  const dPath = corridor.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
                  return (
                    <g key={`chaos-bg-${idx}`} opacity="0.32">
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#0D1322"
                        strokeWidth="24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#162035"
                        strokeWidth="18"
                        strokeDasharray="2 12"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                      />
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#222F47"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}

                {/* 2. DECEPTIVE DEAD-END BRANCHES (Špatné chodbičky) */}
                {currentTrack.deadEnds.map((branch, bIdx) => {
                  const bPath = branch.nodes.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
                  const terminus = branch.nodes[branch.nodes.length - 1];
                  const isThisBranchActive = activeDeadEnd?.branchIndex === bIdx;

                  return (
                    <g key={branch.id} className="transition-opacity duration-200">
                      {/* Deep groove bed */}
                      <path
                        d={bPath}
                        fill="none"
                        stroke="#131726"
                        strokeWidth="28"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Rail ties */}
                      <path
                        d={bPath}
                        fill="none"
                        stroke="#1E273D"
                        strokeWidth="22"
                        strokeDasharray="3 14"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                      />
                      {/* Steel tracks */}
                      <path
                        d={bPath}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={bPath}
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Illuminated trail if thought is currently in this branch */}
                      {isThisBranchActive && activeDeadEnd.dist > 5 && (
                        <path
                          d={bPath}
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="7"
                          strokeDasharray={`${activeDeadEnd.dist} 9999`}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]"
                        />
                      )}

                      {/* Railway Bumper / Dead-End Stopper (Zarážedlo) at terminus */}
                      <g transform={`translate(${terminus.x}, ${terminus.y})`}>
                        {/* Red warning beacon */}
                        <circle
                          cx="0"
                          cy="0"
                          r="7"
                          fill="#450A0A"
                          stroke="#EF4444"
                          strokeWidth="2"
                          className={isThisBranchActive ? "animate-ping" : ""}
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="4"
                          fill="#EF4444"
                        />
                        {/* Crossbeam barrier */}
                        <rect
                          x="-14"
                          y="-5"
                          width="28"
                          height="10"
                          rx="2"
                          fill="#18181B"
                          stroke="#EF4444"
                          strokeWidth="1.5"
                        />
                        {/* Diagonal warning stripes */}
                        <line x1="-9" y1="-4" x2="-4" y2="4" stroke="#EF4444" strokeWidth="2" />
                        <line x1="-1" y1="-4" x2="4" y2="4" stroke="#EF4444" strokeWidth="2" />
                        <line x1="7" y1="-4" x2="12" y2="4" stroke="#EF4444" strokeWidth="2" />

                        {/* Dead-end label badge */}
                        <g transform="translate(0, 16)">
                          <rect
                            x="-26"
                            y="-6"
                            width="52"
                            height="12"
                            rx="4"
                            fill="#090B10"
                            stroke="#7F1D1D"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="2.5"
                            fill="#F87171"
                            fontSize="5.5"
                            fontWeight="bold"
                            textAnchor="middle"
                            letterSpacing="0.5"
                          >
                            SLEPÁ KOLEJ
                          </text>
                        </g>
                      </g>

                      {/* Junction switch indicator */}
                      <circle
                        cx={branch.nodes[0].x}
                        cy={branch.nodes[0].y}
                        r="5"
                        fill="#1E293B"
                        stroke="#F43F5E"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    </g>
                  );
                })}

                {/* 3. THE TRUE MAIN RAILS (KOLEJE) - Base groove trench */}
                <path
                  d={mainRailSvgPath}
                  fill="none"
                  stroke="#141A29"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Rail sleep ties (pražce) along the track */}
                <path
                  d={mainRailSvgPath}
                  fill="none"
                  stroke="#1E273D"
                  strokeWidth="26"
                  strokeDasharray="3 14"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />

                {/* Left/Right steel guide rails */}
                <path
                  d={mainRailSvgPath}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={mainRailSvgPath}
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* The Unravelled Glowing Track Trail up to current progress */}
                {activeDeadEnd === null && currentDistance > 5 && (
                  <path
                    d={mainRailSvgPath}
                    fill="none"
                    stroke={`url(#railGlowGradient-${currentTrack.id})`}
                    strokeWidth="8"
                    strokeDasharray={`${currentDistance} 9999`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  />
                )}

                {/* Start node */}
                <g>
                  <circle cx="90" cy="170" r="16" fill="#3B0764" stroke="#A855F7" strokeWidth="2" />
                  <text x="90" y="174" fill="#F3E8FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    START
                  </text>
                </g>

                {/* Exit portal (CÍL) */}
                <g>
                  <circle
                    cx="460"
                    cy="170"
                    r="20"
                    fill="#064E3B"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                  <text x="460" y="167" fill="#34D399" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                    VÝSTUP
                  </text>
                  <text x="460" y="178" fill="#A7F3D0" fontSize="6.5" textAnchor="middle">
                    Uspořádáno
                  </text>
                </g>

                {/* Intermediate station waypoints on rails */}
                {currentTrack.nodes.slice(1, -1).map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r="3.5"
                    fill="#2E3850"
                    stroke="#1E2738"
                    strokeWidth="1"
                  />
                ))}

                {/* THE WORD "MYŠLENKA" - STRICTLY LOCKED ONTO THE RAIL COORDINATES */}
                <g
                  transform={`translate(${currentPos.x}, ${currentPos.y})`}
                  className="transition-transform duration-75 select-none pointer-events-none"
                >
                  <circle cx="-28" cy="0" r="3.5" fill={isCurrentDeadEndActive ? "#F87171" : "#38BDF8"} className="animate-pulse" />
                  <circle cx="28" cy="0" r="3.5" fill={isCurrentDeadEndActive ? "#F87171" : "#38BDF8"} className="animate-pulse" />

                  {/* Energy Aura */}
                  <circle
                    r="22"
                    fill={
                      isCompleted 
                        ? "rgba(16, 185, 129, 0.25)" 
                        : isCurrentDeadEndActive 
                          ? "rgba(239, 68, 68, 0.35)" 
                          : "rgba(168, 85, 247, 0.3)"
                    }
                    className="animate-pulse"
                  />

                  {/* Carriage Badge "MYŠLENKA" */}
                  <rect
                    x="-42"
                    y="-15"
                    width="84"
                    height="30"
                    rx="15"
                    fill={
                      isCompleted 
                        ? "#064E3B" 
                        : isCurrentDeadEndActive 
                          ? "#7F1D1D" 
                          : "#4A044E"
                    }
                    stroke={
                      isCompleted 
                        ? "#34D399" 
                        : isCurrentDeadEndActive 
                          ? "#F87171" 
                          : currentTrack.accentHex
                    }
                    strokeWidth="2"
                    className={isCurrentDeadEndActive ? "drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]" : "drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]"}
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="800"
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    MYŠLENKA
                  </text>

                  {/* Warning popover if in dead end */}
                  {isCurrentDeadEndActive && (
                    <g transform="translate(0, -28)">
                      <rect
                        x="-54"
                        y="-10"
                        width="108"
                        height="18"
                        rx="5"
                        fill="#090B10"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="2"
                        fill="#FCA5A5"
                        fontSize="7"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ⚠️ SLEPÁ ULIČKA
                      </text>
                    </g>
                  )}
                </g>

                <defs>
                  <linearGradient id={`railGlowGradient-${currentTrack.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={currentTrack.gradientStop1} />
                    <stop offset="100%" stopColor={currentTrack.gradientStop2} />
                  </linearGradient>
                </defs>
              </svg>

              {/* In-game helper / drag hint */}
              {!isDragging && currentDistance < 10 && !isCompleted && !isCurrentDeadEndActive && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md border border-purple-500/40 text-purple-200 text-xs px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none animate-bounce">
                  <span>Klikněte a táhněte po kolejích</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </div>
              )}

              {/* Deceptive warning toast when user is deceived in visual mode */}
              <AnimatePresence>
                {deceptiveWarningToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-rose-950/90 border border-rose-600/70 text-rose-200 text-xs px-4 py-2 rounded-xl backdrop-blur-md flex items-center gap-2 shadow-xl z-30"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{deceptiveWarningToast}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dead-end overlay prompt */}
              <AnimatePresence>
                {isCurrentDeadEndActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-rose-500/60 text-slate-200 text-xs px-4 py-2.5 rounded-xl backdrop-blur-md flex items-center gap-3 shadow-2xl z-30"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-rose-300 block">Chodbička ke konci nevede!</span>
                      <span className="text-[11px] text-slate-400">Táhněte myšlenku zpět na křižovatku.</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleReturnFromDeadEnd}
                      className="px-2.5 py-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0"
                    >
                      Vrátit na kolej ↩
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar & Actions */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="shrink-0 text-slate-300 font-medium">Postup po kolejích:</span>
                <div className="w-full sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 transition-all duration-150 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-slate-300">{progressPercent}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStepForward}
                  disabled={isCompleted}
                  className="px-2.5 py-1 text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700/60 disabled:opacity-40"
                  title="Posunout o kousek po kolejích"
                >
                  {isCurrentDeadEndActive ? 'Vrátit z odbočky' : 'Posunout vpřed'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700/60"
                  title="Znovu na start této myšlenky"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 ml-2"
                >
                  Zvuk: {audioEnabled ? 'Zap' : 'Vyp'}
                </button>
              </div>
            </div>

            {/* Victory banner when unraveled with clean "Další myšlenka" action */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-purple-950/80 border border-emerald-500/40 text-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-300">
                        Myšlenka byla úspěšně vyvedena do cíle!
                      </h4>
                      <p className="text-xs text-slate-300">
                        Z chaosu a slepých chodbiček vznikla jasná a uspořádaná struktura.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleNextThought}
                      className="px-3.5 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span>Další myšlenka</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                      title="Znovu projet tuto dráhu"
                    >
                      Znovu
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3 Pillars of Structured Thinking */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0D101A] border border-slate-800/80 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-800/50 flex items-center justify-center text-purple-400 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">1. Rozdělení chaosu</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Každý složitý problém se skládá z menších částí. Zamotané myšlenky nejdříve rozložím na jednotlivé elementy, fakta a kontexty, a odfiltruji slepé uličky.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0D101A] border border-slate-800/80 hover:border-blue-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-950/50 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">2. Uspořádání a řád</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Zde uplatňuji principy informační vědy a knihovnictví: kategorizaci, taxonomii, hledání vazeb a položení pevných kolejí pro jasný přehled.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0D101A] border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-800/50 flex items-center justify-center text-emerald-400 mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">3. Srozumitelný výsledek</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Výsledná myšlenka musí být tak čistá a přímočará, aby dávala okamžitý smysl kolegům, zákazníkům i komukoli, kdo ji čte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
