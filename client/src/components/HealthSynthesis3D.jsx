import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Box, Flex, Text, VStack, HStack, Icon, Badge, useBreakpointValue } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  MdFlashOn, MdQrCodeScanner, MdDirectionsRun, MdFastfood
} from 'react-icons/md';
import { RiHeartPulseLine } from 'react-icons/ri';

const MotionBox = motion(Box);

// ─── CARD DATA ───────────────────────────────────────────────────────────────
const CARDS = [
  {
    title: 'BioTelemetry',
    tag: 'LIVE SENSOR',
    icon: RiHeartPulseLine,
    color: '#EC4899',
    accentColor: 'rgba(236,72,153,0.15)',
    borderColor: 'rgba(236,72,153,0.3)',
    content: 'heart',
  },
  {
    title: 'AI Vision',
    tag: 'RECOGNIZING',
    icon: MdQrCodeScanner,
    color: '#06B6D4',
    accentColor: 'rgba(6,182,212,0.15)',
    borderColor: 'rgba(6,182,212,0.3)',
    content: 'scan',
  },
  {
    title: 'Nutrition',
    tag: 'TARGET ATTAINED',
    icon: MdFlashOn,
    color: '#A855F7',
    accentColor: 'rgba(168,85,247,0.15)',
    borderColor: 'rgba(168,85,247,0.3)',
    content: 'nutrition',
  },
  {
    title: 'Activity',
    tag: 'SYNCED',
    icon: MdDirectionsRun,
    color: '#14B8A6',
    accentColor: 'rgba(20,184,166,0.15)',
    borderColor: 'rgba(20,184,166,0.3)',
    content: 'activity',
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const HealthSynthesis3D = () => {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('synthesis');
  const sceneScale = useBreakpointValue({ base: 0.6, md: 0.85, lg: 1 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 40, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    const t = setTimeout(() => setPhase('deployed'), 2500);
    return () => clearTimeout(t);
  }, []);

  const particleCount = 140;
  const particles = useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push({
        targetX: Math.cos(theta) * radius * 230,
        targetY: y * 230,
        targetZ: Math.sin(theta) * radius * 230,
        startX: (Math.random() - 0.5) * 1800,
        startY: (Math.random() - 0.5) * 1800,
        startZ: (Math.random() - 0.5) * 1800,
        delay: Math.random() * 1,
        color: i % 8 === 0 ? '#3B82F6' : '#F97316',
        size: i % 15 === 0 ? 10 : 7,
      });
    }
    return pts;
  }, [particleCount]);

  return (
    <Box
      ref={containerRef}
      w="full"
      h={{ base: '500px', md: '650px' }}
      position="relative"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1800px' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="visible"
    >
      {/* VOLUMETRIC BACKGROUND */}
      <MotionBox
        position="absolute"
        top="0" left="0" w="full" h="full"
        bgGradient="radial(circle at 50% 50%, rgba(249,115,22,0.06), transparent)"
        animate={{ opacity: phase === 'deployed' ? 1 : 0 }}
      />

      {/* GLOBAL 3D SCENE */}
      <MotionBox
        position="relative"
        w="full"
        maxW="100%"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', scale: sceneScale }}
      >
        {/* GLOBE ANCHOR — zero-size absolutely positioned point at 50%/50% */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: 'translate3d(-50%, -50%, 0)', transformStyle: 'preserve-3d' }}
        >
          {/* CORE GLOW — must be position:absolute to not affect anchor size */}
          <AnimatePresence>
            {phase === 'deployed' && (
              <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                boxSize="360px"
                ml="-180px"
                mt="-180px"
                bgGradient="radial(circle at 50% 50%, rgba(249,115,22,0.18), transparent 70%)"
                borderRadius="full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'opacity, transform' }}
              />
            )}
          </AnimatePresence>

          {/* PARTICLES — Spinning Globe Effect */}
          <MotionBox
            animate={{ rotateY: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {particles.map((p, i) => (
              <SynthesisParticle key={i} particle={p} />
            ))}
          </MotionBox>

          {/* RINGS */}
          <AnimatePresence>
            {phase === 'deployed' && (
              <>
                <GlobeRing rotateX={90} delay={0} />
                <GlobeRing rotateY={90} delay={0.2} />
                <GlobeRing rotateX={45} delay={0.4} />
              </>
            )}
          </AnimatePresence>
        </Box>

        {/* ORBITING CARDS — elliptical 2D orbit with depth simulation */}
        <AnimatePresence>
          {phase === 'deployed' &&
            CARDS.map((card, i) => (
              <EllipticalCard
                key={card.title}
                card={card}
                index={i}
                total={CARDS.length}
                delay={0.5 + i * 0.2}
              />
            ))}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
};

// ─── ELLIPTICAL ORBITING CARD ─────────────────────────────────────────────────
// Uses a smooth rAF loop to orbit on an ellipse (radiusX × radiusY).
// Depth is simulated by scaling + z-index based on Y position in the ellipse.
const EllipticalCard = ({ card, index, total, delay }) => {
  const radiusX = 310; // horizontal orbit radius
  const radiusY = 90;  // vertical orbit radius (flattened = depth illusion)
  const DURATION = 18 + index * 4; // seconds per full orbit

  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const scaleMV = useMotionValue(0.85);
  const opacityMV = useMotionValue(0);
  const zIndexMV = useMotionValue(0);

  const cardRef = useRef(null);

  useEffect(() => {
    // Start positions evenly spread around the circle
    const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2;
    let startTime = null;
    let rafId;

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;
      const angle = startAngle + (elapsed / DURATION) * Math.PI * 2;

      const cx = Math.cos(angle) * radiusX;
      const cy = Math.sin(angle) * radiusY;

      // Depth: sin(angle) ranges -1 (back) to +1 (front)
      const depth = (Math.sin(angle) + 1) / 2; // 0 = back, 1 = front
      const scale = 0.72 + depth * 0.38; // 0.72 back → 1.10 front
      const opacity = 0.5 + depth * 0.5; // 0.5 back → 1.0 front
      const zIndex = Math.round(depth * 10);

      xMV.set(cx);
      yMV.set(cy);
      scaleMV.set(scale);
      opacityMV.set(opacity);
      zIndexMV.set(zIndex);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionBox
      ref={cardRef}
      position="absolute"
      top="50%"
      left="50%"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        x: xMV,
        y: yMV,
        scale: scaleMV,
        opacity: opacityMV,
        zIndex: zIndexMV,
        translateX: '-50%',
        translateY: '-50%',
      }}
      whileHover={{ scale: 1.15 }}
    >
      <CardContent card={card} />
    </MotionBox>
  );
};

// ─── CARD VISUAL DESIGN ───────────────────────────────────────────────────────
const CardContent = ({ card }) => (
  <Box
    w="170px"
    bg="rgba(9, 14, 30, 0.75)"
    backdropFilter="blur(20px) saturate(180%)"
    borderRadius="2xl"
    border="1px solid"
    borderColor={card.borderColor}
    boxShadow={`0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${card.accentColor}, inset 0 1px 0 rgba(255,255,255,0.07)`}
    p={4}
    position="relative"
    overflow="hidden"
  >
    {/* GLOW CORNER */}
    <Box
      position="absolute"
      top={-1}
      left={-1}
      w="60px"
      h="60px"
      borderRadius="2xl 0 0 0"
      bg={card.accentColor}
      filter={`blur(12px)`}
      opacity={0.8}
    />
    <Box
      position="absolute"
      bottom={0}
      right={0}
      w="40px"
      h="40px"
      bg={card.accentColor}
      filter="blur(20px)"
      borderRadius="full"
    />

    {/* HEADER */}
    <HStack justify="space-between" align="center" mb={3} position="relative">
      <HStack spacing={2}>
        <Flex
          boxSize="28px"
          borderRadius="lg"
          align="center"
          justify="center"
          style={{ background: card.accentColor, border: `1px solid ${card.borderColor}` }}
        >
          <Icon as={card.icon} boxSize={3.5} color={card.color} />
        </Flex>
        <VStack align="start" spacing={0}>
          <Text color="white" fontSize="10px" fontWeight="800" letterSpacing="0.5px">{card.title}</Text>
          <Text fontSize="8px" fontWeight="700" style={{ color: card.color }}>{card.tag}</Text>
        </VStack>
      </HStack>
      <Box w="6px" h="6px" borderRadius="full" bg={card.color} boxShadow={`0 0 6px ${card.color}`} />
    </HStack>

    {/* CONTENT */}
    <Box position="relative">
      {card.content === 'heart' && <HeartContent color={card.color} />}
      {card.content === 'scan' && <ScanContent color={card.color} />}
      {card.content === 'nutrition' && <NutritionContent color={card.color} />}
      {card.content === 'activity' && <ActivityContent color={card.color} />}
    </Box>
  </Box>
);

// ─── CARD CONTENTS ────────────────────────────────────────────────────────────
const HeartContent = ({ color }) => (
  <VStack align="stretch" spacing={2}>
    <HStack align="baseline" spacing={1}>
      <Text color="white" fontSize="2xl" fontWeight="900" lineHeight={1}>72</Text>
      <Text color="gray.500" fontSize="9px" fontWeight="800">BPM</Text>
    </HStack>
    <Flex h="28px" align="center" gap="2px">
      {[30, 60, 90, 50, 80, 40, 70, 100, 55, 75, 45, 85].map((h, i) => (
        <MotionBox
          key={i}
          flex={1}
          borderRadius="1px"
          style={{ background: color }}
          animate={{ height: [`${h}%`, `${100 - h}%`, `${h}%`] }}
          transition={{ duration: 1.2 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </Flex>
    <HStack spacing={1}>
      <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
      <Text color="gray.400" fontSize="8px" fontWeight="700">Normal rhythm</Text>
    </HStack>
  </VStack>
);

const ScanContent = ({ color }) => (
  <VStack align="stretch" spacing={2}>
    <Box
      h="52px"
      borderRadius="xl"
      bg="rgba(0,0,0,0.3)"
      border="1px solid rgba(255,255,255,0.05)"
      position="relative"
      overflow="hidden"
    >
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="2px"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        animate={{ y: [0, 48, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />
      <Icon as={MdFastfood} position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)" color={color} opacity={0.25} boxSize={5} />
      {/* scan grid lines */}
      {[0, 1, 2].map(i => (
        <Box key={i} position="absolute" top={`${25 + i * 25}%`} left={0} w="full" h="1px" bg="rgba(255,255,255,0.04)" />
      ))}
    </Box>
    <HStack justify="space-between">
      <Text color="white" fontSize="9px" fontWeight="800">Salmon Salad</Text>
      <Badge fontSize="7px" px={1.5} py={0.5} borderRadius="full" style={{ background: `${color}22`, color }}>99.4%</Badge>
    </HStack>
  </VStack>
);

const NutritionContent = ({ color }) => {
  const macros = [
    { label: 'P', val: 82, color: '#06B6D4' },
    { label: 'C', val: 68, color: '#A855F7' },
    { label: 'F', val: 45, color: '#EC4899' },
  ];
  return (
    <VStack align="stretch" spacing={2}>
      <HStack align="baseline" spacing={1}>
        <Text color="white" fontSize="xl" fontWeight="900" lineHeight={1}>1,824</Text>
        <Text color="gray.500" fontSize="8px" fontWeight="700">kcal</Text>
      </HStack>
      <HStack spacing={1.5}>
        {macros.map(m => (
          <VStack key={m.label} flex={1} spacing={1}>
            <Box w="full" h="28px" bg="rgba(255,255,255,0.03)" borderRadius="sm" position="relative" overflow="hidden">
              <MotionBox
                position="absolute"
                bottom={0}
                w="full"
                initial={{ height: 0 }}
                animate={{ height: `${m.val}%` }}
                transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
                style={{ background: `linear-gradient(to top, ${m.color}, ${m.color}88)` }}
              />
            </Box>
            <Text color="gray.600" fontSize="7px" fontWeight="900">{m.label}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

const ActivityContent = ({ color }) => (
  <VStack align="stretch" spacing={2}>
    <HStack align="baseline" spacing={1}>
      <Text color="white" fontSize="xl" fontWeight="900" lineHeight={1}>12,450</Text>
      <Text color="gray.500" fontSize="8px" fontWeight="700">steps</Text>
    </HStack>
    <Box>
      <Box h="4px" bg="rgba(255,255,255,0.05)" borderRadius="full" overflow="hidden">
        <MotionBox
          h="full"
          borderRadius="full"
          initial={{ width: 0 }}
          animate={{ width: '83%' }}
          transition={{ duration: 1.8, delay: 1.4, ease: 'easeOut' }}
          style={{ background: `linear-gradient(to right, ${color}88, ${color})` }}
        />
      </Box>
      <HStack justify="space-between" mt={1}>
        <Text color="gray.600" fontSize="7px" fontWeight="700">0</Text>
        <Text fontSize="7px" fontWeight="800" style={{ color }}>83%</Text>
        <Text color="gray.600" fontSize="7px" fontWeight="700">15K</Text>
      </HStack>
    </Box>
    <HStack spacing={1}>
      <Box w="6px" h="6px" borderRadius="full" bg={color} boxShadow={`0 0 6px ${color}`} />
      <Text color="gray.400" fontSize="8px" fontWeight="700">Goal almost reached</Text>
    </HStack>
  </VStack>
);

// ─── GLOBE SUB-COMPONENTS ─────────────────────────────────────────────────────
const SynthesisParticle = ({ particle }) => (
  <MotionBox
    position="absolute"
    boxSize={`${particle.size}px`}
    bg={particle.color}
    borderRadius="full"
    boxShadow={`0 0 12px ${particle.color}, 0 0 24px ${particle.color}44`}
    initial={{ x: particle.startX, y: particle.startY, z: particle.startZ, opacity: 0 }}
    animate={{ x: particle.targetX, y: particle.targetY, z: particle.targetZ, opacity: 0.8 }}
    transition={{ duration: 2.5, delay: particle.delay, ease: [0.16, 1, 0.3, 1] }}
  />
);

const GlobeRing = ({ rotateX = 0, rotateY = 0, delay = 0 }) => (
  <MotionBox
    position="absolute"
    boxSize="480px"
    border="1px solid rgba(255,255,255,0.08)"
    borderRadius="full"
    style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    initial={{ scale: 0, opacity: 0, rotateZ: 0 }}
    animate={{ scale: 1, opacity: 1, rotateZ: 360 }}
    transition={{
      scale: { duration: 1.5, delay },
      opacity: { duration: 1.5, delay },
      rotateZ: { duration: 28, repeat: Infinity, ease: 'linear', delay },
    }}
  >
    <Box
      position="absolute"
      top="-2px"
      left="50%"
      ml="-3px"
      boxSize="6px"
      bg="orange.400"
      borderRadius="full"
      boxShadow="0 0 12px #F97316, 0 0 4px #F97316"
    />
  </MotionBox>
);

export default HealthSynthesis3D;
