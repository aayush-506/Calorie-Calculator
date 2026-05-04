import React, { useRef, useMemo } from 'react';
import { Box, Flex, Text, VStack, HStack, Icon, Badge } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MdFlashOn, MdQrCodeScanner, MdTimeline, MdCheckCircle } from 'react-icons/md';

const MotionBox = motion(Box);

const HealthHologram3D = () => {
  const containerRef = useRef(null);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for dramatic tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 60, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 60, damping: 25 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const particles = useMemo(() => Array.from({ length: 40 }), []);

  return (
    <Box
      ref={containerRef}
      w="full"
      h={{ base: "500px", md: "700px" }}
      position="relative"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1500px" }}
      overflow="visible"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* ── BACKGROUND SCANNING BEAM ── */}
      <MotionBox
        position="absolute"
        top="0"
        left="-100%"
        w="200%"
        h="full"
        bgGradient="linear(to-r, transparent, rgba(249,115,22,0.1), rgba(249,115,22,0.2), rgba(249,115,22,0.1), transparent)"
        zIndex={1}
        animate={{ x: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      />

      {/* ── THE DECONSTRUCTED SCENE ── */}
      <MotionBox
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        position="relative"
        w="full"
        maxW="600px"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        
        {/* 1. THE DATA CORE (Nutrient Sphere) */}
        <Box position="absolute" zIndex={10}>
          {particles.map((_, i) => (
            <OrbitingParticle key={i} index={i} total={particles.length} />
          ))}
          <MotionBox
            boxSize="120px"
            bg="orange.500"
            borderRadius="full"
            filter="blur(40px)"
            opacity={0.3}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </Box>

        {/* 2. MAIN LOG PANEL (Z: 0) */}
        <GlassPanel 
          z={0} 
          w="280px" 
          h="380px" 
          rotateZ={-5}
          title="Daily Activity"
          icon={MdFlashOn}
          color="orange"
        >
          <VStack align="stretch" spacing={4} pt={4}>
             <MiniStat color="orange.400" label="Calorie Target" val="1850 / 2400" pct={75} />
             <HStack justify="space-between" pt={2}>
                <Box boxSize={12} bg="rgba(255,255,255,0.05)" borderRadius="lg" />
                <Box boxSize={12} bg="rgba(255,255,255,0.05)" borderRadius="lg" />
                <Box boxSize={12} bg="rgba(249,115,22,0.1)" borderRadius="lg" border="1px solid rgba(249,115,22,0.2)" />
             </HStack>
          </VStack>
        </GlassPanel>

        {/* 3. AI SCANNER PANEL (Z: 150) */}
        <GlassPanel 
          z={150} 
          x="120px"
          y="-130px"
          w="220px" 
          h="180px" 
          rotateZ={10}
          title="AI Scanner"
          icon={MdQrCodeScanner}
          color="blue"
        >
          <HStack spacing={3} pt={4}>
            <Box boxSize="50px" borderRadius="xl" bg="gray.800" overflow="hidden">
               <MotionBox 
                 w="full" h="2px" bg="blue.400" 
                 animate={{ y: [0, 48, 0] }} 
                 transition={{ duration: 2, repeat: Infinity }}
                />
            </Box>
            <VStack align="start" spacing={0}>
              <Text color="blue.300" fontSize="xs" fontWeight="900">IDENTIFIED</Text>
              <Text color="white" fontSize="sm" fontWeight="800">Avocado Toast</Text>
            </VStack>
          </HStack>
        </GlassPanel>

        {/* 4. VERIFIED DATA PANEL (Z: -150) */}
        <GlassPanel 
          z={-150} 
          x="-150px"
          y="150px"
          w="240px" 
          h="140px" 
          rotateZ={-15}
          title="Gold Data"
          icon={MdCheckCircle}
          color="green"
        >
          <HStack pt={4} spacing={2}>
             <Badge colorScheme="green" variant="subtle" fontSize="2xs">VERIFIED</Badge>
             <Text color="gray.400" fontSize="xs" fontWeight="700">100% Accuracy</Text>
          </HStack>
        </GlassPanel>

        {/* 5. TRENDS PANEL (Z: 80) */}
        <GlassPanel 
          z={80} 
          x="-180px"
          y="-80px"
          w="200px" 
          h="160px" 
          rotateZ={8}
          title="Insights"
          icon={MdTimeline}
          color="purple"
        >
           <Flex h="40px" align="end" gap={1} pt={4}>
              {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8].map((h, i) => (
                <Box key={i} flex={1} h={`${h * 100}%`} bg="purple.500" borderRadius="sm" opacity={0.6} />
              ))}
           </Flex>
        </GlassPanel>

      </MotionBox>

      {/* DETACHED DATA PARTICLES (Floating in volumetric space) */}
      <FloatingParticle delay={1} x={300} y={-200} color="orange.400" />
      <FloatingParticle delay={2} x={-350} y={150} color="blue.400" />
      <FloatingParticle delay={0} x={400} y={250} color="green.400" />
    </Box>
  );
};

const GlassPanel = ({ children, z, x = 0, y = 0, rotateZ = 0, title, icon, color, w, h }) => (
  <MotionBox
    position="absolute"
    style={{ translateZ: z, x, y, rotateZ }}
    w={w}
    h={h}
    bg="rgba(13, 17, 30, 0.7)"
    backdropFilter="blur(20px)"
    borderRadius="3xl"
    border="1px solid rgba(255,255,255,0.08)"
    boxShadow={`0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(${color === 'orange' ? '249,115,22' : '255,255,255'}, 0.05)`}
    p={5}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    whileHover={{ translateZ: z + 40, borderColor: `${color}.500`, scale: 1.05 }}
  >
    <HStack spacing={3}>
       <Flex boxSize={8} borderRadius="lg" bg={`${color}.900`} color={`${color}.400`} align="center" justify="center">
          <Icon as={icon} />
       </Flex>
       <Text color="gray.200" fontSize="xs" fontWeight="900" letterSpacing="1px" textTransform="uppercase">{title}</Text>
    </HStack>
    {children}
  </MotionBox>
);

const MiniStat = ({ label, val, pct, color }) => (
  <VStack align="stretch" spacing={1}>
    <HStack justify="space-between">
      <Text color="gray.500" fontSize="3xs" fontWeight="900" textTransform="uppercase">{label}</Text>
      <Text color="white" fontSize="2xs" fontWeight="900">{val}</Text>
    </HStack>
    <Box h="3px" bg="rgba(255,255,255,0.05)" borderRadius="full" overflow="hidden">
      <motion.div
        style={{ height: "100%", backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 2, delay: 1 }}
      />
    </Box>
  </VStack>
);

const OrbitingParticle = ({ index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 60 + Math.random() * 40;
  
  return (
    <MotionBox
      position="absolute"
      boxSize="2px"
      bg="orange.400"
      borderRadius="full"
      boxShadow="0 0 10px #F97316"
      animate={{
        x: [Math.cos(angle) * radius, Math.cos(angle + 0.5) * (radius + 10), Math.cos(angle) * radius],
        y: [Math.sin(angle) * radius, Math.sin(angle + 0.5) * (radius - 10), Math.sin(angle) * radius],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const FloatingParticle = ({ x, y, color, delay }) => (
  <MotionBox
    position="absolute"
    left="50%"
    top="50%"
    boxSize="3px"
    bg={color}
    borderRadius="full"
    filter="blur(1px)"
    style={{ x, y }}
    animate={{
      y: [y, y - 40, y],
      opacity: [0, 0.6, 0]
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  />
);

export default HealthHologram3D;
