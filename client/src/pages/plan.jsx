import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  HStack,
  Icon,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Container,
} from "@chakra-ui/react";
import { MdCheckCircle, MdStar, MdBusiness, MdShield, MdHelpOutline } from "react-icons/md";
import AfterLoginPageNavbar from "../components/AfterLoginPageNavbar";
import Footer from "../components/Footer";

const PlanCard = ({ title, price, period, description, icon, color, isCurrent, features, iconUrl }) => {
  return (
    <VStack
      h="full"
      p={8}
      bg="white"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="gray.100"
      boxShadow="xl"
      spacing={6}
      position="relative"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-10px)', boxShadow: '2xl', borderColor: `${color}.200` }}
      align="stretch"
    >
      {isCurrent && (
        <Badge
          position="absolute"
          top="-4"
          alignSelf="center"
          bg="gray.800"
          color="white"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="900"
          letterSpacing="1px"
        >
          CURRENT PLAN
        </Badge>
      )}

      <VStack spacing={4} align="center">
        <Box
          p={4}
          bg={`${color}.50`}
          borderRadius="2xl"
          color={`${color}.500`}
        >
          {iconUrl ? (
            <Image src={iconUrl} w="40px" h="40px" />
          ) : (
            <Icon as={icon} boxSize={10} />
          )}
        </Box>
        <VStack spacing={1}>
          <Heading size="md" fontWeight="900" color="gray.800" textTransform="uppercase" letterSpacing="1px">
            {title}
          </Heading>
          <Text fontSize="xs" color="gray.500" fontWeight="700" textAlign="center" maxW="200px">
            {description}
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={0} align="center">
        <HStack align="baseline">
          <Text fontSize="4xl" fontWeight="900" color="gray.800">{price}</Text>
          <Text fontSize="sm" fontWeight="700" color="gray.400">{period}</Text>
        </HStack>
      </VStack>

      <VStack align="stretch" flex={1} spacing={3}>
        {features.map((feature, idx) => (
          <HStack key={idx} spacing={3} align="start">
            <Icon as={MdCheckCircle} color={`${color}.400`} boxSize={4} mt={0.5} />
            <Text fontSize="xs" fontWeight="700" color="gray.600">{feature}</Text>
          </HStack>
        ))}
      </VStack>

      <Button
        w="full"
        h="50px"
        borderRadius="xl"
        colorScheme={color}
        variant={isCurrent ? "outline" : "solid"}
        fontWeight="800"
        fontSize="sm"
        _hover={!isCurrent ? { boxShadow: `0 8px 20px ${color}Alpha.300` } : {}}
      >
        {isCurrent ? "Current Plan" : "Subscribe Now"}
      </Button>
    </VStack>
  );
};

function Plan() {
  const faqs = [
    { q: "What forms of payment do you accept?", a: "We accept all major credit cards, except for Discover cards." },
    { q: "Will I be charged sales tax?", a: "If you live in Canada, you will be charged Canadian sales tax (we are a Canadian company). If you live outside of Canada, you will not be charged tax." },
    { q: "How secure is Nutrimeter?", a: "We take data security seriously. Not only is your data protected, but we will never sell your data to 3rd parties." },
    { q: "How do I cancel my subscription?", a: "You can manage your subscription under the Account Tab at any time to prevent auto-renewal at the end of your term." },
  ];

  return (
    <Box w="full" minH="100vh" bg="gray.50" position="relative" overflowX="hidden">
      {/* Mesh Gradient Background (Consistent with Scan Page) */}
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
        <AfterLoginPageNavbar currentLink='plans' />

        <Container maxW="1400px" py={16} px={{ base: 6, xl: 10 }}>
          <VStack spacing={16} align="stretch">
            
            {/* Header Section */}
            <VStack spacing={4} textAlign="center">
              <Badge colorScheme="orange" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="1px">
                PRICING & PLANS
              </Badge>
              <Heading size="3xl" fontWeight="900" color="gray.800" letterSpacing="-2px">
                Fuel Your Progress
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="600px" fontWeight="600">
                Choose the perfect plan to unlock your full health potential, whether you're an individual or a professional coach.
              </Text>
            </VStack>

            {/* Plan Cards Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              <PlanCard
                title="BASIC"
                price="$0"
                period="/mo"
                description="The essential tool for tracking your daily nutrition."
                iconUrl="https://cdn1.cronometer.com/2021/landing/crono-icon-main-nav.svg"
                color="blue"
                isCurrent={true}
                features={["Log foods & exercise", "Track all macros", "Up to 82 micronutrients", "Basic reports"]}
              />
              <PlanCard
                title="GOLD"
                price="$49.99"
                period="/yr"
                description="For those getting serious about their health journey."
                iconUrl="https://cdn1.cronometer.com/2021/landing/gold-icon_1.svg"
                color="orange"
                features={["No advertisements", "Recipe Importer", "Diary Groups", "Fasting Timer", "Target Scheduler"]}
              />
              <PlanCard
                title="PRO"
                price="$29.95"
                period="/mo"
                description="The ultimate dashboard for health coaches & trainers."
                iconUrl="https://cdn1.cronometer.com/2021/landing/pro-icon-main-nav.svg"
                color="green"
                features={["Monitor client compliance", "Secure internal messaging", "Share foods & recipes", "Up to 10 clients"]}
              />
              <PlanCard
                title="ENTERPRISE"
                price="Custom"
                period=""
                description="Built for hospitals, schools, and research teams."
                icon={MdBusiness}
                color="purple"
                features={["HIPAA compliance", "Risk assessment support", "API Access", "Monthly/Yearly invoicing"]}
              />
            </SimpleGrid>

            {/* FAQ Section */}
            <VStack spacing={10} align="stretch" py={12}>
              <Center>
                <VStack spacing={2}>
                  <Heading size="xl" fontWeight="900" color="gray.800" letterSpacing="-1px">Questions? We've Got Answers.</Heading>
                  <Text color="gray.500" fontWeight="700">Find everything you need to know about our subscriptions.</Text>
                </VStack>
              </Center>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {faqs.map((faq, idx) => (
                  <Box
                    key={idx}
                    p={8}
                    bg="white"
                    borderRadius="2xl"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                  >
                    <HStack spacing={4} mb={4}>
                      <Icon as={MdHelpOutline} color="orange.400" boxSize={6} />
                      <Text fontSize="lg" fontWeight="800" color="gray.800">{faq.q}</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.500" fontWeight="600" leading="tall">
                      {faq.a}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

          </VStack>
        </Container>
        <Footer />
      </VStack>
    </Box>
  );
}

export default Plan;