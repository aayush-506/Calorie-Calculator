import React from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Icon,
  Badge,
  Container,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SearchIcon } from '@chakra-ui/icons';
import { 
  MdScreenSearchDesktop, 
  MdSmartphone, 
  MdStars, 
  MdQuiz,
  MdArrowForward
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from '../components/Footer';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const SupportCategoryCard = ({ title, description, icon, link, delay, color = "orange" }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      h="full"
    >
      <Link to={link}>
        <VStack
          h="full"
          p={8}
          bg="white"
          borderRadius="3xl"
          border="1px solid"
          borderColor="gray.100"
          spacing={6}
          align="start"
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          boxShadow="sm"
          _hover={{ 
            boxShadow: `0 20px 40px rgba(0,0,0,0.06), 0 0 0 1px ${color}55`,
            borderColor: `${color}.500`,
          }}
          position="relative"
          overflow="hidden"
        >
          {/* Ambient Glow */}
          <Box
            position="absolute"
            top="-10%"
            right="-10%"
            w="120px"
            h="120px"
            bg={`${color}.500`}
            filter="blur(60px)"
            opacity={0.05}
          />

          <Flex 
            w={14} 
            h={14} 
            borderRadius="2xl" 
            bg={`${color}.50`} 
            align="center" 
            justify="center"
          >
            <Icon as={icon} boxSize={7} color={`${color}.500`} />
          </Flex>

          <VStack align="start" spacing={3} flex={1}>
            <Heading size="md" fontWeight="900" color="gray.800" letterSpacing="-0.5px">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.600" fontWeight="600" leading="tall">
              {description}
            </Text>
          </VStack>

          <Button
            variant="ghost"
            color={`${color}.500`}
            fontWeight="800"
            fontSize="xs"
            rightIcon={<MdArrowForward />}
            p={0}
            _hover={{ bg: 'transparent', transform: 'translateX(5px)' }}
          >
            Launch Manual
          </Button>
        </VStack>
      </Link>
    </MotionBox>
  );
};

function Support() {
  const categories = [
    {
      title: 'Web Version',
      description: 'Comprehensive technical documentation and manual for Nutrimeter on desktop and browser environments.',
      icon: MdScreenSearchDesktop,
      link: '/web_version',
      delay: 0.2
    },
    {
      title: 'Mobile App',
      description: 'The complete guide to mastering Nutrimeter on iOS and Android. Includes AI scan tutorials.',
      icon: MdSmartphone,
      link: '/mob_version',
      delay: 0.3
    },
    {
      title: 'Professional Hub',
      description: 'Dedicated resources for coaches and medical analysts using the Nutrimeter Professional platform.',
      icon: MdStars,
      link: '/professional_version',
      delay: 0.4
    },
    {
      title: 'Help & FAQ',
      description: 'Got a question? Browse our structured database of frequently asked questions and technical fixes.',
      icon: MdQuiz,
      link: '/faq',
      delay: 0.5
    }
  ];

  return (
    <Box w="full" minH="100vh" bg="#F8FAFC" position="relative" overflowX="hidden">
      <NavBar />

      {/* ── AMBIENT ARTWORK ── */}
      <MotionBox
        position="fixed"
        top="-10%"
        left="-10%"
        w="60%"
        h="60%"
        bg="orange.100"
        filter="blur(180px)"
        opacity={0.4}
        zIndex={0}
        borderRadius="full"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionBox
        position="fixed"
        bottom="-10%"
        right="-10%"
        w="40%"
        h="40%"
        bg="blue.100"
        filter="blur(160px)"
        opacity={0.3}
        zIndex={0}
        borderRadius="full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <VStack w="full" spacing={0} align="stretch" position="relative" zIndex={1}>
        
        {/* ── HERO SECTION ── */}
        <Box pt={{ base: 20, md: 32 }} pb={20}>
          <Container maxW="1200px">
            <MotionVStack spacing={8} textAlign="center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge colorScheme="orange" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="2px">
                KNOWLEDGE CLUSTER
              </Badge>
              <Heading size="3xl" color="gray.800" fontWeight="900" letterSpacing="-3px" lineHeight="1.1">
                The <Text as="span" color="orange.500">Support</Text> Ecosystem
              </Heading>
              <Text fontSize="lg" color="gray.500" fontWeight="600" maxW="600px">
                Synchronized documentation for the global health operating system. Find technical answers, user manuals, and professional guides.
              </Text>

              {/* Light Style Search */}
              <InputGroup 
                maxW="650px" 
                size="lg" 
                mt={4}
              >
                <InputLeftElement pointerEvents="none" h="full" ml={4}>
                  <SearchIcon color="orange.400" />
                </InputLeftElement>
                <Input
                  h="72px"
                  pl={14}
                  borderRadius="full"
                  bg="white"
                  boxShadow="0 10px 30px rgba(0,0,0,0.05)"
                  border="1px solid"
                  borderColor="gray.100"
                  color="gray.800"
                  fontSize="md"
                  fontWeight="600"
                  placeholder="Query the system for answers..."
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ 
                    borderColor: 'orange.400', 
                    boxShadow: '0 15px 40px rgba(249, 115, 22, 0.15)',
                    bg: "white"
                  }}
                  transition="all 0.3s"
                />
              </InputGroup>
            </MotionVStack>
          </Container>
        </Box>

        {/* ── RESOURCE GRID ── */}
        <Container maxW="1200px" pb={32}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {categories.map((cat, idx) => (
              <SupportCategoryCard key={idx} {...cat} />
            ))}
          </SimpleGrid>
        </Container>

        <Footer />
      </VStack>
    </Box>
  );
}

export default Support;
