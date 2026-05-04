import React from 'react'
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  HStack,
  Icon,
  Badge,
  Container,
  Divider,
} from '@chakra-ui/react'
import { 
  MdVideoLibrary, 
  MdSearch, 
  MdChat, 
  MdBook, 
  MdArticle, 
  MdForum, 
  MdEmail,
  MdPlayCircleFilled
} from 'react-icons/md'
import AfterLoginPageNavbar from '../components/AfterLoginPageNavbar'
import Footer from '../components/Footer'

const HelpCategoryCard = ({ title, description, icon, image, buttonText, color }) => {
  return (
    <VStack
      h="full"
      p={6}
      bg="white"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="gray.100"
      boxShadow="lg"
      spacing={5}
      align="stretch"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl', borderColor: `${color}.200` }}
    >
      <Flex h="160px" w="full" borderRadius="2xl" p={4} bg={`${color}.50`} align="center" justify="center" position="relative" overflow="hidden">
         {/* Decorative background icon */}
        <Icon as={icon} position="absolute" right="-2" bottom="-2" boxSize="100px" color={`${color}.100`} opacity={0.5} zIndex={0} />
        
        <Image
          src={image}
          h="120px"
          w="auto"
          objectFit="contain"
          zIndex={1}
          filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"
        />
      </Flex>

      <VStack align="start" spacing={1} flex={1}>
        <Heading size="sm" fontWeight="900" color="gray.800" letterSpacing="-0.5px">
          {title}
        </Heading>
        <Text fontSize="xs" color="gray.500" fontWeight="700" leading="tall">
          {description}
        </Text>
      </VStack>

      <Button
        w="full"
        h="45px"
        borderRadius="xl"
        colorScheme={color}
        fontWeight="800"
        fontSize="xs"
        leftIcon={buttonText.includes('@') ? <MdEmail /> : <Icon as={icon} />}
      >
        {buttonText}
      </Button>
    </VStack>
  )
}

function Help() {
  const categories = [
    {
      title: 'Video Tutorials',
      description: 'Master Nutrimeter one feature at a time with our step-by-step visual training series.',
      image: 'https://cdn1.cronometer.com/media/icon-cronometer-university.png',
      icon: MdVideoLibrary,
      buttonText: 'Watch Academy',
      color: 'blue'
    },
    {
      title: 'Expert Coaching',
      description: 'Find a certified nutritionist or trainer to help accelerate your fitness goals.',
      image: 'https://cdn1.cronometer.com/media/icon-find-a-professional.png',
      icon: MdSearch,
      buttonText: 'Find Professional',
      color: 'orange'
    },
    {
      title: 'Direct Support',
      description: "Can't find an answer? Our dedicated support team is available for technical assistance.",
      image: 'https://cdn1.cronometer.com/media/icon-contact-support.png',
      icon: MdChat,
      buttonText: 'support@nutrimeter.com',
      color: 'green'
    },
    {
      title: 'User Manual',
      description: 'Deep-dive into every feature with rich screenshots and architectural explanations.',
      image: 'https://cdn1.cronometer.com/media/icon-user-manual.png',
      icon: MdBook,
      buttonText: 'Read Docs',
      color: 'purple'
    },
    {
      title: 'Health Blog',
      description: 'Stay updated with the latest in nutritional science and application updates.',
      image: 'https://cdn1.cronometer.com/media/icon-blog.png',
      icon: MdArticle,
      buttonText: 'Read Blog',
      color: 'red'
    },
    {
      title: 'Community Forums',
      description: 'Join thousands of users sharing recipes, success stories, and expert tips.',
      image: 'https://cdn1.cronometer.com/media/icon-community-forum.png',
      icon: MdForum,
      buttonText: 'Join Community',
      color: 'teal'
    }
  ]

  return (
    <Box w="full" minH="100vh" bg="gray.50" position="relative" overflowX="hidden">
      {/* Mesh Gradient Background (Consistent with Portal Theme) */}
      <Box
        position="fixed"
        top="-10%"
        left="-10%"
        w="50%"
        h="50%"
        bg="orange.100"
        filter="blur(120px)"
        opacity={0.3}
        zIndex={0}
        borderRadius="full"
      />
      <Box
        position="fixed"
        bottom="-10%"
        right="-10%"
        w="40%"
        h="40%"
        bg="orange.200"
        filter="blur(120px)"
        opacity={0.3}
        zIndex={0}
        borderRadius="full"
      />

      <VStack w="full" minH="100vh" spacing={0} align="stretch" position="relative" zIndex={1}>
        <AfterLoginPageNavbar currentLink="help" />

        <Container maxW="1400px" py={16} px={{ base: 6, xl: 10 }}>
          <VStack spacing={16} align="stretch">
            
            {/* Header / Hero */}
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="green" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="1px">
                SUPPORT HUB
              </Badge>
              <Heading size="3xl" fontWeight="900" color="gray.800" letterSpacing="-2px">
                Personal Health Concierge
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="600px" fontWeight="600">
                Everything you need to master your nutrition in one centralized hub. Choose a resource below to get started.
              </Text>
            </VStack>

            {/* Support Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {categories.map((cat, idx) => (
                <HelpCategoryCard key={idx} {...cat} />
              ))}
            </SimpleGrid>

            {/* Quick Support Footer */}
            <Box bg="white" p={10} borderRadius="3xl" borderWidth="1px" borderColor="gray.100" boxShadow="sm">
              <HStack spacing={10} align="center" direction={{ base: 'column', md: 'row' }}>
                 <Flex w="100px" h="100px" bg="orange.50" borderRadius="full" align="center" justify="center" flexShrink={0}>
                    <Icon as={MdPlayCircleFilled} boxSize={12} color="orange.400" />
                 </Flex>
                 <VStack align="start" spacing={1} flex={1}>
                    <Heading size="md" fontWeight="900" color="gray.800">Quick Start Guide</Heading>
                    <Text fontSize="sm" color="gray.500" fontWeight="600">
                      New to Nutrimeter? Watch our 5-minute onboarding video to learn the fundamentals of AI scanning and daily tracking.
                    </Text>
                 </VStack>
                 <Button colorScheme="orange" borderRadius="xl" px={8} fontWeight="900">Watch Now</Button>
              </HStack>
            </Box>

          </VStack>
        </Container>
        <Footer />
      </VStack>
    </Box>
  )
}

export default Help
