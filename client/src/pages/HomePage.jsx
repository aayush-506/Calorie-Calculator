import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import Footer from '../components/Footer';
import {
  Box, Flex, Image, HStack, Icon, Text, SimpleGrid,
  Button, Heading, VStack, Badge, Container
} from '@chakra-ui/react';
import {
  MdCheckCircle, MdQrCodeScanner, MdTimeline, MdLock,
  MdFitnessCenter, MdRestaurant, MdBolt, MdFormatQuote
} from 'react-icons/md';
import { RiHeartPulseLine } from 'react-icons/ri';
import HealthSynthesis3D from '../components/HealthSynthesis3D';



const FeatureCard = ({ title, description, icon, color }) => (
  <VStack
    p={8}
    bg="white"
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="gray.100"
    boxShadow="lg"
    spacing={4}
    align="start"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl', borderColor: `${color}.200` }}
  >
    <Flex w={12} h={12} borderRadius="2xl" bg={`${color}.50`} color={`${color}.500`} align="center" justify="center">
      <Icon as={icon} boxSize={6} />
    </Flex>
    <Heading size="md" fontWeight="900" color="gray.800" letterSpacing="-0.5px">{title}</Heading>
    <Text fontSize="sm" color="gray.500" fontWeight="600" leading="tall">{description}</Text>
  </VStack>
);

const TestimonialCard = ({ quote, author, platform, date, color }) => (
  <VStack
    p={10}
    bg="white"
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="gray.100"
    boxShadow="xl"
    spacing={6}
    align="start"
    position="relative"
  >
    <Icon as={MdFormatQuote} boxSize={12} color={`${color}.100`} position="absolute" top={6} right={6} />
    <Heading size="md" color={`${color}.500`} textAlign="start" leading="shorter" fontWeight="900">
      "{quote}"
    </Heading>
    <Text fontSize="md" color="gray.600" fontWeight="600" leading="tall">
      Finding an app that tracks everything from vitamins to macros was my dream. This is set up great, easy to use, and links with my devices perfectly.
    </Text>
    <HStack w="full" justify="space-between" pt={4}>
      <VStack align="start" spacing={0}>
        <Text fontWeight="900" color="gray.800" fontSize="sm">{author}</Text>
        <Text fontWeight="700" color="gray.400" fontSize="xs">{platform} • {date}</Text>
      </VStack>
      <Badge colorScheme={color} borderRadius="full" px={3} py={1}>{platform}</Badge>
    </HStack>
  </VStack>
);

const HomePage = () => {
  return (
    <Box w="full" bg="gray.50" position="relative" overflowX="hidden">
      <NavBar />

      {/* ── MESH BACKGROUND ── */}
      <Box position="fixed" top="-20%" left="-10%" w="70%" h="70%" bg="orange.100" filter="blur(180px)" opacity={0.4} zIndex={0} borderRadius="full" />
      <Box position="fixed" bottom="-10%" right="-10%" w="50%" h="50%" bg="blue.100" filter="blur(160px)" opacity={0.3} zIndex={0} borderRadius="full" />

      <VStack spacing={0} align="stretch" position="relative" zIndex={1}>

        {/* ── HERO SECTION ── */}
        <Container maxW="1400px" pt={10} pb={{ base: 8, md: 12 }}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={16} >
            <VStack align={{ base: "center", lg: "start" }} spacing={6} flex={1} textAlign={{ base: "center", lg: "left" }}>
              <Badge colorScheme="orange" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="1px">
                BEYOND CALORIE TRACKING
              </Badge>
              <Heading size="4xl" fontWeight="900" color="gray.800" letterSpacing="-3px" lineHeight="0.95">
                The Scientific <br />
                <Text as="span" color="orange.500">Path to Better</Text> <br />
                Health.
              </Heading>
              <Text fontSize="xl" color="gray.500" fontWeight="600" maxW="500px">
                Track your nutrition, exercise, and biometrics with the most accurate data in the industry.
              </Text>

              <HStack spacing={4} pt={4}>
                <Link to="/signup">
                  <Button
                    h="68px"
                    px={10}
                    bg="orange.500"
                    color="white"
                    fontSize="lg"
                    fontWeight="900"
                    borderRadius="2xl"
                    boxShadow="0 20px 40px rgba(249,115,22,0.25)"
                    _hover={{ bg: "orange.600", transform: "translateY(-4px)" }}
                    leftIcon={<MdBolt />}
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button h="68px" px={8} variant="ghost" color="gray.500" fontWeight="800" fontSize="md">
                    Already a member?
                  </Button>
                </Link>
              </HStack>

              <HStack spacing={6} pt={8}>
                <HStack><Icon as={MdCheckCircle} color="green.400" /><Text fontSize="xs" fontWeight="800" color="gray.400">82+ MICRONUTRIENTS</Text></HStack>
                <HStack><Icon as={MdCheckCircle} color="green.400" /><Text fontSize="xs" fontWeight="800" color="gray.400">AI CAMERA SCAN</Text></HStack>
                <HStack><Icon as={MdCheckCircle} color="green.400" /><Text fontSize="xs" fontWeight="800" color="gray.400">BIOMETRIC SYNC</Text></HStack>
              </HStack>
            </VStack>

            <Box flex={1} position="relative" w="full">
              <HealthSynthesis3D />
            </Box>
          </Flex>
        </Container>


        {/* ── CORE PILLARS ── */}
        <Box py={16}>
          <Container maxW="1200px">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <FeatureCard
                title="AI Powered Scanning"
                description="Snap a photo of your meal and our advanced AI instantly identifies nutrients."
                icon={MdQrCodeScanner}
                color="orange"
              />
              <FeatureCard
                title="Gold Standard Data"
                description="Our database is verified by lab analysts to ensure 100% accuracy in your logs."
                icon={MdCheckCircle}
                color="green"
              />
              <FeatureCard
                title="Biometric Insights"
                description="Sync with Apple Health and Google Fit to see how nutrition impacts your vitals."
                icon={MdTimeline}
                color="blue"
              />
            </SimpleGrid>
          </Container>
        </Box>

        {/* ── HABITS TRANSFORMED ── */}
        <Box py={20} bg="rgba(249,115,22,0.03)" borderY="1px solid" borderColor="orange.50">
          <Container maxW="1200px">
            <Flex direction={{ base: "column", lg: "row" }} align="center" gap={16}>
              <Box flex={1} position="relative">
                <Box position="absolute" top="-20%" left="-20%" w="140%" h="140%" bg="orange.400" filter="blur(160px)" opacity={0.05} borderRadius="full" />
                <VStack align="stretch" spacing={6}>
                  <Heading size="2xl" fontWeight="900" color="gray.800" letterSpacing="-1px">Develop habits that stick.</Heading>
                  <Text fontSize="lg" color="gray.500" fontWeight="600">
                    Unlike standard apps, Nutrimeter focuses on the total spectrum of health. We track 82+ micronutrients to ensure you're truly thriving.
                  </Text>
                  <SimpleGrid columns={2} spacing={6} pt={4}>
                    <HStack spacing={4} p={4} bg="white" borderRadius="2xl" boxShadow="sm">
                      <Icon as={MdLock} color="orange.400" />
                      <Text fontWeight="800" fontSize="sm">Privacy First</Text>
                    </HStack>
                    <HStack spacing={4} p={4} bg="white" borderRadius="2xl" boxShadow="sm">
                      <Icon as={MdFitnessCenter} color="green.400" />
                      <Text fontWeight="800" fontSize="sm">Exercise Sync</Text>
                    </HStack>
                    <HStack spacing={4} p={4} bg="white" borderRadius="2xl" boxShadow="sm">
                      <Icon as={MdRestaurant} color="blue.400" />
                      <Text fontWeight="800" fontSize="sm">Recipe Engine</Text>
                    </HStack>
                    <HStack spacing={4} p={4} bg="white" borderRadius="2xl" boxShadow="sm">
                      <Icon as={RiHeartPulseLine} color="red.400" />
                      <Text fontWeight="800" fontSize="sm">Fasting Timer</Text>
                    </HStack>
                  </SimpleGrid>
                </VStack>
              </Box>
              <Box flex={1}>
                <Image
                  src="https://raw.githubusercontent.com/harshu878/nutrimeter/b24e158e4f21902c1fe890e3fcec626ae022ebaf/client/public/Images/mobile.svg"
                  w="full"
                  transform="perspective(1000px) rotateY(-10deg)"
                />
              </Box>
            </Flex>
          </Container>
        </Box>

        {/* ── TESTIMONIALS ── */}
        <Box w="full" py={24}>
          <Container maxW="1000px" mx="auto">
            <VStack spacing={16} align="stretch">
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" fontWeight="900" color="gray.800" letterSpacing="-1.5px">Built for Real Life</Heading>
              <Text fontSize="lg" color="gray.400" fontWeight="700">Thousands of users have transformed their lives with our platform.</Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <TestimonialCard
                author="Sarah Jenkins"
                platform="App Store"
                date="Oct 2023"
                color="orange"
                quote="I wasn't the only one concerned about the unreliability of macros in other apps."
              />
              <TestimonialCard
                author="Michael Chen"
                platform="Android"
                date="Nov 2023"
                color="blue"
                quote="Nutrimeter will track EVERYTHING! It's easy to use and intuitive."
              />
            </SimpleGrid>
          </VStack>
        </Container>
        </Box>

        {/* ── FINAL CTA ── */}
        <Box bg="gray.800" py={32} position="relative" overflow="hidden">
          <Box position="absolute" top="0" left="0" w="full" h="full" bgGradient="radial(circle at top right, orange.900, transparent)" opacity={0.4} />
          <Container maxW="1000px" position="relative" zIndex={1}>
            <VStack spacing={10} textAlign="center">
              <Heading size="3xl" color="white" fontWeight="900" letterSpacing="-2px">Ready to fuel your progress?</Heading>
              <Text fontSize="xl" color="gray.400" fontWeight="600" maxW="600px">
                Join the Nutrimeter community today and start tracking for free. No credit card required.
              </Text>
              <Link to="/signup">
                <Button
                  h="76px"
                  px={12}
                  bg="orange.500"
                  color="white"
                  fontSize="xl"
                  fontWeight="900"
                  borderRadius="full"
                  boxShadow="0 20px 50px rgba(0,0,0,0.3)"
                  _hover={{ bg: "orange.600", transform: "scale(1.05)" }}
                >
                  Get Started Free
                </Button>
              </Link>
              <Text color="gray.500" fontWeight="700" fontSize="sm">Available on Web, iOS, and Android</Text>
            </VStack>
          </Container>
        </Box>

        <Footer />
      </VStack>
    </Box>
  )
}

export default HomePage;
