import React, { useRef } from 'react';
import { Box, Flex, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MdFlashOn, MdTrendingUp } from 'react-icons/md';
import { RiHeartPulseLine } from 'react-icons/ri';

const MotionBox = motion(Box);

const HealthOrbit3D = () => {
  const containerRef = useRef(null);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Springs for the tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Box
      ref={containerRef}
      w="full"
      h={{ base: "400px", md: "600px" }}
      position="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        w={{ base: "260px", md: "320px" }}
        h={{ base: "480px", md: "580px" }}
        bg="rgba(255, 255, 255, 0.03)"
        borderRadius="50px"
        border="2px solid rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        position="relative"
        transition="all 0.1s ease-out"
      >
        {/* INTERNAL SCREEN CONTENT */}
        <VStack p={6} pt={12} spacing={6} align="stretch" h="full">
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text color="gray.500" fontSize="xs" fontWeight="900">OCT 24, 2023</Text>
              <Text color="white" fontSize="lg" fontWeight="900">Good Morning</Text>
            </VStack>
            <Box boxSize={10} borderRadius="full" bg="orange.500" />
          </HStack>

          {/* MAIN CIRCLE */}
          <Box position="relative" boxSize="full" maxH="200px" display="flex" alignItems="center" justifyContent="center">
            <svg width="180" height="180" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="#F97316" strokeWidth="8"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 70 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <VStack position="absolute" spacing={0}>
              <Text color="white" fontSize="2xl" fontWeight="900">1,850</Text>
              <Text color="gray.500" fontSize="xs" fontWeight="800">CALORIES</Text>
            </VStack>
          </Box>

          {/* STATS LIST */}
          <VStack align="stretch" spacing={3}>
             <StatRow color="green.400" label="Protein" value="92g" pct={65} />
             <StatRow color="blue.400" label="Carbs" value="210g" pct={80} />
             <StatRow color="pink.400" label="Fats" value="45g" pct={40} />
          </VStack>
        </VStack>

        {/* FLOATING 3D ELEMENTS (Off-center, offset in Z) */}
        
        {/* CALORIE FLOATING TILE */}
        <MotionBox
          position="absolute"
          top="10%"
          right="-25%"
          p={4}
          bg="rgba(25, 30, 45, 0.9)"
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.1)"
          boxShadow="2xl"
          initial={{ z: 50 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <HStack spacing={3}>
            <Flex boxSize={8} bg="orange.500" borderRadius="lg" align="center" justify="center">
              <Icon as={MdFlashOn} color="white" />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text color="white" fontSize="xs" fontWeight="900">Energy</Text>
              <Text color="orange.400" fontSize="sm" fontWeight="900">+450 kcal</Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* HEART RATE FLOATING TILE */}
        <MotionBox
          position="absolute"
          bottom="15%"
          left="-25%"
          p={4}
          bg="rgba(25, 30, 45, 0.9)"
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.1)"
          boxShadow="2xl"
          initial={{ z: 80 }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <HStack spacing={3}>
            <Flex boxSize={8} bg="red.500" borderRadius="lg" align="center" justify="center">
              <Icon as={RiHeartPulseLine} color="white" />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text color="white" fontSize="xs" fontWeight="900">Heart Rate</Text>
              <Text color="red.400" fontSize="sm" fontWeight="900">72 BPM</Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* PROGRESS FLOATING TILE */}
        <MotionBox
          position="absolute"
          top="45%"
          right="-15%"
          p={3}
          bg="rgba(25, 30, 45, 0.9)"
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.1)"
          boxShadow="xl"
          initial={{ z: 120, x: 20 }}
          animate={{ x: [20, 35, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
           <HStack spacing={2}>
              <Icon as={MdTrendingUp} color="green.400" />
              <Text color="gray.200" fontSize="2xs" fontWeight="900">ON TRACK</Text>
           </HStack>
        </MotionBox>
      </MotionBox>

      {/* BACKGROUND ORBIT PARTICLES */}
      <OrbitingParticle size={2} color="orange.400" duration={15} delay={0} radius={250} />
      <OrbitingParticle size={3} color="blue.400" duration={20} delay={2} radius={300} />
      <OrbitingParticle size={2} color="green.400" duration={18} delay={5} radius={200} />
    </Box>
  );
};

const StatRow = ({ color, label, value, pct }) => (
  <VStack align="stretch" spacing={1}>
    <HStack justify="space-between">
      <Text color="gray.400" fontSize="2xs" fontWeight="800" textTransform="uppercase">{label}</Text>
      <Text color="white" fontSize="2xs" fontWeight="900">{value}</Text>
    </HStack>
    <Box h="4px" bg="rgba(255,255,255,0.05)" borderRadius="full" overflow="hidden">
      <motion.div
        style={{ height: '100%', backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </Box>
  </VStack>
);

const OrbitingParticle = ({ size, color, duration, delay, radius }) => (
  <MotionBox
    position="absolute"
    boxSize={size}
    bg={color}
    borderRadius="full"
    filter="blur(1px)"
    initial={{ x: radius, y: 0, opacity: 0 }}
    animate={{
      rotate: 360,
      opacity: [0, 0.8, 0],
    }}
    transition={{
      rotate: { duration, repeat: Infinity, ease: "linear", delay },
      opacity: { duration: duration / 2, repeat: Infinity, ease: "easeInOut", delay }
    }}
    style={{ originX: `-${radius}px`, originY: "0px" }}
  />
);

export default HealthOrbit3D;
