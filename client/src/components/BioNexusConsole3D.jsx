import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Box, Flex, Text, VStack, HStack, Icon, SimpleGrid } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MdFlashOn, MdQrCodeScanner, MdTimeline, MdCheckCircle, MdMemory, MdGpsFixed } from 'react-icons/md';

const MotionBox = motion(Box);

const BioNexusConsole3D = () => {
  const containerRef = useRef(null);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-Smooth Springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), { stiffness: 40, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 40, damping: 20 });
  const sceneDriftX = useSpring(0, { stiffness: 10, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // ── CINEMATIC CAMERA DRIFT ──
  useEffect(() => {
    const drift = setInterval(() => {
       sceneDriftX.set(Math.random() * 40 - 20);
    }, 4000);
    return () => clearInterval(drift);
  }, [sceneDriftX]);

  const particles = useMemo(() => Array.from({ length: 60 }), []);

  return (
    <Box
      ref={containerRef}
      w="full"
      h={{ base: "600px", md: "800px" }}
      position="relative"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1800px" }}
      overflow="visible"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* ── CINEMATIC VOLUMETRIC LIGHTING ── */}
      <Box position="absolute" top="0" left="0" w="full" h="full" bgGradient="radial(circle at 40% 40%, rgba(249,115,22,0.05), transparent)" />
      
      {/* ── GLOBAL SCENE DRIFT WRAPPER ── */}
      <MotionBox
        style={{ rotateX, rotateY, x: sceneDriftX, transformStyle: "preserve-3d" }}
        position="relative"
        w="full"
        maxW="800px"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        
        {/* ── 3D DATA RIBBONS (Connecting logic) ── */}
        <DataRibbon start={[0,0]} end={[200, -180]} color="#F97316" delay={0} />
        <DataRibbon start={[0,0]} end={[-220, 150]} color="#3B82F6" delay={1} />
        <DataRibbon start={[0,0]} end={[-250, -150]} color="#A855F7" delay={2} />
        <DataRibbon start={[0,0]} end={[220, 180]} color="#22C55E" delay={3} />

        {/* 1. THE BIO-NEXUS CORE (Advanced Sphere) */}
        <Box position="absolute" zIndex={20}>
          {particles.map((_, i) => (
            <NexusParticle key={i} index={i} total={particles.length} />
          ))}
          <MotionBox
            boxSize="160px"
            bg="orange.500"
            borderRadius="full"
            filter="blur(50px)"
            opacity={0.25}
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={0} zIndex={30}>
             <Text color="white" fontSize="2xl" fontWeight="900" letterSpacing="2px">98%</Text>
             <Text color="orange.400" fontSize="8px" fontWeight="900">CORE SYNC</Text>
          </VStack>
        </Box>

        {/* 2. ADVANCED TELEMETRY PANEL (Z: 0) */}
        <RefractivePanel 
          z={0} 
          w="340px" 
          h="440px" 
          rotateZ={-2}
          title="BIO-TELEMETRY"
          icon={MdFlashOn}
          color="orange"
          tag="LIVE FEED"
        >
          <VStack align="stretch" spacing={5} pt={6}>
             <LiveTickerStat label="ACTIVE ENERGY" target={2400} current={1850} color="orange.400" />
             <HStack spacing={4}>
                <Box flex={1} bg="rgba(255,255,255,0.03)" p={3} borderRadius="xl" border="1px solid rgba(255,255,255,0.05)">
                   <Text color="gray.500" fontSize="2xs" fontWeight="900">METABOLISM</Text>
                   <Text color="white" fontSize="md" fontWeight="800">1.4x</Text>
                </Box>
                <Box flex={1} bg="rgba(255,255,255,0.03)" p={3} borderRadius="xl" border="1px solid rgba(255,255,255,0.05)">
                   <Text color="gray.500" fontSize="2xs" fontWeight="900">HYDRATION</Text>
                   <Text color="blue.400" fontSize="md" fontWeight="800">82%</Text>
                </Box>
             </HStack>
             <Box h="80px" bg="rgba(0,0,0,0.2)" borderRadius="xl" p={2} position="relative" overflow="hidden">
                 <Waveform color="orange" />
             </Box>
          </VStack>
        </RefractivePanel>

        {/* 3. NEURAL SCANNER (Z: 250) */}
        <RefractivePanel 
          z={250} 
          x="180px"
          y="-220px"
          w="260px" 
          h="240px" 
          rotateZ={8}
          title="NEURAL SCAN"
          icon={MdQrCodeScanner}
          color="blue"
          tag="READY"
        >
          <VStack pt={6} align="stretch" spacing={3}>
            <Flex boxSize="60px" borderRadius="2xl" bg="gray.900" border="1px solid" borderColor="blue.900" align="center" justify="center" position="relative" overflow="hidden">
               <MotionBox 
                 w="full" h="full" bgGradient="linear(to-b, transparent, rgba(59,130,246,0.2), transparent)" 
                 animate={{ y: ["-100%", "100%"] }} 
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <Icon as={MdGpsFixed} color="blue.400" zIndex={1} />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text color="gray.500" fontSize="3xs" fontWeight="900">TARGET ACQUIRED</Text>
              <Text color="white" fontSize="sm" fontWeight="800">NUTRIENT RECOGNITION ACTIVE</Text>
            </VStack>
          </VStack>
        </RefractivePanel>

        {/* 4. QUANTUM ANALYTICS (Z: -200) */}
        <RefractivePanel 
          z={-200} 
          x="-220px"
          y="220px"
          w="280px" 
          h="180px" 
          rotateZ={-12}
          title="QUANTUM DATA"
          icon={MdCheckCircle}
          color="green"
          tag="VERIFIED"
        >
          <SimpleGrid columns={3} spacing={2} pt={6}>
             {[60, 45, 90, 30, 75, 55].map((h, i) => (
               <Box key={i} h="40px" bg="rgba(34,197,94,0.1)" borderRadius="lg" position="relative" overflow="hidden">
                  <MotionBox 
                    w="full" h={`${h}%`} bg="green.500" position="absolute" bottom={0} 
                    animate={{ height: [`${h}%`, `${h-10}%`, `${h}%`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
               </Box>
             ))}
          </SimpleGrid>
        </RefractivePanel>

        {/* 5. COGNITIVE TRENDS (Z: 120) */}
        <RefractivePanel 
          z={120} 
          x="-240px"
          y="-140px"
          w="240px" 
          h="200px" 
          rotateZ={6}
          title="COGNITIVE TRENDS"
          icon={MdTimeline}
          color="purple"
          tag="CALIBRATING"
        >
           <VStack pt={6} align="stretch" spacing={2}>
              <Text color="purple.300" fontSize="2xl" fontWeight="900">+12%</Text>
              <Text color="gray.500" fontSize="3xs" fontWeight="900" letterSpacing="1px">WEEKLY FOCUS SCORE</Text>
              <HStack spacing={1} pt={2}>
                 {Array.from({length: 12}).map((_, i) => (
                   <Box key={i} flex={1} h="12px" bg={i < 8 ? "purple.500" : "rgba(255,255,255,0.05)"} borderRadius="1px" />
                 ))}
              </HStack>
           </VStack>
        </RefractivePanel>

      </MotionBox>

      {/* DETACHED SENSOR PARTICLES */}
      <SensorParticle delay={0} x={450} y={-300} color="orange.400" label="T_SYNC" />
      <SensorParticle delay={2} x={-500} y={250} color="blue.400" label="S_SCAN" />
      <SensorParticle delay={1} x={550} y={350} color="green.400" label="V_QUAL" />
    </Box>
  );
};

const RefractivePanel = ({ children, z, x = 0, y = 0, rotateZ = 0, title, icon, color, w, h, tag }) => (
  <MotionBox
    position="absolute"
    style={{ translateZ: z, x, y, rotateZ, transformStyle: "preserve-3d" }}
    w={w}
    h={h}
    bg="rgba(10, 15, 25, 0.85)"
    backdropFilter="blur(30px)"
    borderRadius="40px"
    border="1px solid rgba(255,255,255,0.12)"
    boxShadow={`0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(${color === 'orange' ? '249,115,22' : '255,255,255'}, 0.08)`}
    p={6}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, ease: "circOut" }}
    whileHover={{ translateZ: z + 60, borderColor: `${color}.500`, scale: 1.05 }}
  >
    {/* CORNER GLOW EFFECT */}
    <Box position="absolute" top={-1} left={-1} boxSize="40px" borderTop="2px solid" borderLeft="2px solid" borderColor={`${color}.500`} borderRadius="40px 0 0 0" opacity={0.6} />
    
    <HStack justify="space-between" w="full">
       <HStack spacing={3}>
          <Flex boxSize={9} borderRadius="xl" bg={`${color}.900`} color={`${color}.400`} align="center" justify="center">
             <Icon as={icon} boxSize={5} />
          </Flex>
          <VStack align="start" spacing={0}>
             <Text color="gray.200" fontSize="2xs" fontWeight="900" letterSpacing="2.5px">{title}</Text>
             <Text color={`${color}.600`} fontSize="3xs" fontWeight="900">{tag}</Text>
          </VStack>
       </HStack>
       <Icon as={MdMemory} color="gray.700" boxSize={4} />
    </HStack>
    {children}
  </MotionBox>
);

const LiveTickerStat = ({ label, target, current, color }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
       setVal(prev => prev < current ? prev + Math.ceil(current / 50) : current);
    }, 30);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <VStack align="stretch" spacing={2}>
      <HStack justify="space-between">
        <Text color="gray.500" fontSize="3xs" fontWeight="900">{label}</Text>
        <Text color="white" fontSize="xs" fontWeight="900">{val} / {target}</Text>
      </HStack>
      <Box h="4px" bg="rgba(255,255,255,0.05)" borderRadius="full" overflow="hidden">
        <motion.div
          style={{ height: "100%", backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / target) * 100}%` }}
          transition={{ duration: 3, ease: "circOut" }}
        />
      </Box>
    </VStack>
  );
};

const DataRibbon = ({ start, end, color, delay }) => (
  <Box position="absolute" zIndex={5} style={{ pointerEvents: "none" }}>
    <svg width="600" height="600" viewBox="-300 -300 600 600" style={{ transformStyle: "preserve-3d" }}>
      <motion.path
        d={`M ${start[0]} ${start[1]} Q ${(start[0] + end[0]) / 2} ${start[1] - 50} ${end[0]} ${end[1]}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay }}
      />
      <motion.circle
        r="2"
        fill={color}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
        style={{ offsetPath: `path('M ${start[0]} ${start[1]} Q ${(start[0] + end[0]) / 2} ${start[1] - 50} ${end[0]} ${end[1]}')` }}
      />
    </svg>
  </Box>
);

const NexusParticle = ({ index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 80 + Math.random() * 50;
  
  return (
    <MotionBox
      position="absolute"
      boxSize="2px"
      bg="orange.400"
      borderRadius="full"
      boxShadow="0 0 15px #F97316"
      animate={{
        x: [Math.cos(angle) * radius, Math.cos(angle + 0.8) * (radius + 20), Math.cos(angle) * radius],
        y: [Math.sin(angle) * radius, Math.sin(angle + 0.8) * (radius - 20), Math.sin(angle) * radius],
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.7, 0.2],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const Waveform = ({ color }) => (
  <HStack h="full" w="full" spacing={1} align="center">
    {Array.from({ length: 40 }).map((_, i) => (
      <MotionBox
        key={i}
        flex={1}
        bg={color === 'orange' ? "orange.600" : "blue.600"}
        borderRadius="full"
        animate={{ height: ["4px", "24px", "4px"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
      />
    ))}
  </HStack>
);

const SensorParticle = ({ x, y, color, delay, label }) => (
  <MotionBox
    position="absolute"
    left="50%"
    top="50%"
    style={{ x, y, transformStyle: "preserve-3d" }}
    animate={{ y: [y, y - 50, y], opacity: [0, 0.8, 0] }}
    transition={{ duration: 5, repeat: Infinity, delay }}
  >
    <VStack align="center" spacing={1}>
       <Box boxSize="4px" bg={color} borderRadius="full" boxShadow={`0 0 10px ${color}`} />
       <Text color="gray.700" fontSize="4px" fontWeight="900">{label}</Text>
    </VStack>
  </MotionBox>
);

export default BioNexusConsole3D;
