import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CgPlayButtonO } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import { MdTrendingUp, MdSystemUpdateAlt, MdArticle, MdArrowForward } from "react-icons/md";
import BlogCard from "../../components/BlogCard/BlogCard";
import NavBar from "../NavBar";
import Footer from "../../components/Footer";

const MotionVStack = motion(VStack);

const BlogPage = () => {
  const [isClicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <Box w="full" minH="100vh" bg="#F8FAFC" position="relative" overflowX="hidden">
      <NavBar />

      {/* ── AMBIENT ARTWORK ── */}
      <Box position="fixed" top="-5%" right="-5%" w="50%" h="50%" bg="orange.100" filter="blur(160px)" opacity={0.3} zIndex={0} borderRadius="full" />
      <Box position="fixed" bottom="-5%" left="-5%" w="40%" h="40%" bg="blue.100" filter="blur(140px)" opacity={0.2} zIndex={0} borderRadius="full" />

      <VStack w="full" spacing={0} align="stretch" position="relative" zIndex={1}>
        
        {/* ── HERO SECTION ── */}
        <Box pt={{ base: 20, md: 32 }} pb={20}>
          <Container maxW="1200px">
            <MotionVStack spacing={8} textAlign="center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge colorScheme="orange" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="2px">
                NUTRIMETER JOURNAL
              </Badge>
              <Heading size="3xl" color="gray.800" fontWeight="900" letterSpacing="-3px" lineHeight="1.1">
                The <Text as="span" color="orange.500">Knowledge</Text> Exchange
              </Heading>
              <Text fontSize="lg" color="gray.500" fontWeight="600" maxW="600px">
                Exploring the intersection of nutritional science, biometric data, and high-performance lifestyle habits.
              </Text>

              {/* Modern Search */}
              <InputGroup maxW="600px" size="lg" mt={4}>
                <InputLeftElement pointerEvents="none" h="full" ml={4}>
                  <HiSearch color="var(--chakra-colors-orange-400)" />
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
                  placeholder="Query articles and research..."
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ borderColor: "orange.400", boxShadow: "0 15px 40px rgba(249, 115, 22, 0.1)" }}
                />
              </InputGroup>
            </MotionVStack>
          </Container>
        </Box>

        {/* ── FEATURED CONTENT ── */}
        <Container maxW="1200px" pb={24}>
          <Flex direction={{ base: "column", lg: "row" }} gap={10} align="stretch">
            {/* Main Featured */}
            <Box flex={1.8}>
              <VStack
                bg="white"
                p={4}
                borderRadius="4xl"
                boxShadow="xl"
                border="1px solid"
                borderColor="gray.50"
                spacing={8}
                align="stretch"
                h="full"
              >
                <Box position="relative" borderRadius="3xl" overflow="hidden" h={{ base: "300px", md: "450px" }}>
                  {isClicked ? (
                    <iframe
                      title="blog"
                      src="https://www.youtube.com/embed/R49fLnhMhIE?autoplay=1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                    ></iframe>
                  ) : (
                    <>
                      <Image
                        src="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/blogPageFirstImage.png"
                        objectFit="cover"
                        w="full"
                        h="full"
                        cursor="pointer"
                        onClick={() => setClicked(true)}
                      />
                      <Flex
                        position="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        bg="rgba(0,0,0,0.2)"
                        align="center"
                        justify="center"
                        cursor="pointer"
                        onClick={() => setClicked(true)}
                        transition="all 0.3s"
                        _hover={{ bg: "rgba(0,0,0,0.3)" }}
                      >
                        <Icon as={CgPlayButtonO} boxSize="100px" color="white" filter="drop-shadow(0 0 20px rgba(0,0,0,0.4))" />
                      </Flex>
                    </>
                  )}
                </Box>
                <VStack p={4} align="start" spacing={4}>
                  <Heading size="xl" fontWeight="900" color="gray.800" letterSpacing="-1.5px">Eat Smarter. Live Better.</Heading>
                  <Text fontSize="lg" color="gray.500" fontWeight="600" leading="tall">
                    Discover the habits that make your body thrive. From micronutrient densities to circadian rhythm tracking, explore how to optimize your health with scientific precision.
                  </Text>
                  <Button
                    size="lg"
                    bg="orange.500"
                    color="white"
                    borderRadius="2xl"
                    px={10}
                    fontWeight="900"
                    _hover={{ bg: "orange.600", transform: "translateY(-4px)" }}
                    onClick={() => navigate("/")}
                  >
                    Start Your Path
                  </Button>
                </VStack>
              </VStack>
            </Box>

            {/* Sidebar Posts */}
            <Box flex={1}>
              <VStack 
                bg="white" 
                p={8} 
                borderRadius="4xl" 
                boxShadow="xl" 
                border="1px solid" 
                borderColor="gray.50" 
                h="full" 
                align="stretch"
                spacing={8}
              >
                <HStack spacing={2}>
                  <Icon as={MdTrendingUp} color="orange.500" boxSize={5} />
                  <Heading size="md" fontWeight="900" color="gray.800">Trending Stories</Heading>
                </HStack>

                <VStack align="stretch" spacing={8}>
                  {[
                    { title: "Sugar-Free Sensitivities", date: "Oct 27, 2022", img: "Blog-Img-Gummy-Bears.png", link: "/blog/sugar-free-sensitivities" },
                    { title: "Digest This: Tracking Fiber", date: "Oct 26, 2022", img: "Fiber.png", link: "/blog/fiber" },
                    { title: "Ways To Ease Digestion", date: "Oct 24, 2022", img: "Blog-Image-Avocado.png", link: "/blog/ways-to-ease-digestion" }
                  ].map((post, idx) => (
                    <HStack key={idx} spacing={4} cursor="pointer" onClick={() => navigate(post.link)} role="group" transition="all 0.3s" _hover={{ transform: "translateX(5px)" }}>
                      <Image 
                        src={`https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/${post.img}`} 
                        w="80px" 
                        h="80px" 
                        objectFit="cover" 
                        borderRadius="2xl" 
                      />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="900" color="gray.800" lineHeight="1.2" _groupHover={{ color: "orange.500" }}>{post.title}</Text>
                        <Text fontSize="xs" fontWeight="800" color="gray.400">{post.date}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>

                <Button variant="ghost" color="orange.500" rightIcon={<MdArrowForward />} fontWeight="900" fontSize="sm" w="fit-content" p={0} pt={4} _hover={{ bg: "transparent", color: "orange.600" }}>
                  EXPLORE ALL
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Container>

        {/* ── CATALOGUE GRID ── */}
        <Box bg="white" py={24}>
          <Container maxW="1200px">
            <VStack spacing={16} align="stretch">
              <VStack spacing={4} align="start">
                <HStack spacing={2}>
                  <Icon as={MdSystemUpdateAlt} color="orange.500" boxSize={5} />
                  <Heading size="lg" fontWeight="900" color="gray.800" letterSpacing="-1.5px">App Updates & Nodes</Heading>
                </HStack>
                <Text color="gray.500" fontWeight="600">The latest technical improvements to your Nutrimeter ecosystem.</Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                <BlogCard
                  image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/Suunto.png"
                  heading="New Device Integration: Suunto"
                  date="June 14, 2022"
                  description="Sync Suunto Data Into Your Nutrimeter Account. Today, we are thrilled to announce that we have partnered with Suunto to enhance biometric tracking."
                />
                <BlogCard
                  image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/Heart-rate-symbol.png"
                  heading="Track Your Heart Rate Over Time"
                  date="June 6, 2022"
                  description="Recent improvements to biometric tracking allow you to track heart rate over time. We have made some big improvements to the dashboard visualizations."
                />
                <BlogCard
                  image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/Apple-watch.jpeg"
                  heading="Nutrimeter On Your Apple Watch"
                  date="June 1, 2022"
                  description="Introducing Nutrimeter on Apple Watch. Since its introduction, the Apple Watch has gained its fair share of health tracking dominance."
                />
                <BlogCard
                  image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/nutrition_score.jpg"
                  heading="Men’s Health Nutrition Score"
                  date="May 31, 2022"
                  description="New Nutrition Score focuses on Men’s Health. Available to male users for a limited time to help optimize hormonal health profiles."
                />
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* ── FEATURED STORIES SECTION ── */}
        <Container maxW="1200px" py={24}>
          <VStack spacing={16} align="stretch">
            <VStack spacing={4} align="start">
              <HStack spacing={2}>
                <Icon as={MdArticle} color="orange.500" boxSize={5} />
                <Heading size="lg" fontWeight="900" color="gray.800" letterSpacing="-1.5px">Popular Stories</Heading>
              </HStack>
              <Text color="gray.500" fontWeight="600">Deep dives into specialized dietary research and community success.</Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
              <BlogCard
                image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/eczema.png"
                heading="Dietitians Discuss Diet And Eczema"
                date="April 27, 2022"
                description="Registered Dietitians Discuss the link between diet and skin health. Eczema is a common, chronic skin disease that arises from internal inflammation."
              />
              <BlogCard
                image="https://raw.githubusercontent.com/amandk5/nutrimeterImages/main/Images/acne.jpg"
                heading="How Nutrition Affects Acne"
                date="April 26, 2022"
                description="How Can Diet and Nutrition Affect Acne? Acne is a chronic, multifactorial skin condition estimated to affect 9.4% of the population."
              />
            </SimpleGrid>
          </VStack>
        </Container>

        <Footer />
      </VStack>
    </Box>
  );
};

export default BlogPage;
