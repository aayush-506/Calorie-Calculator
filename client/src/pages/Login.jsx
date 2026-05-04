import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Box,
  FormControl,
  Image,
  Text,
  Container,
  VStack,
  HStack,
  Badge,
  useToast
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdArrowForward, MdLogin } from "react-icons/md";
import Footer from "../components/Footer";
import NavBar from './NavBar';
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const MotionBox = motion(Box);

const Login = () => {
  const { isAuthenticated } = useSelector(s => s.auth.data);
  const { error, loading } = useSelector(s => s.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/checkCalories");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid username or password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  }, [error, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginApi(formData));
  };

  return (
    <Box w="full" minH="100vh" bg="#F8FAFC" position="relative" overflowX="hidden">
      <NavBar />

      {/* ── AMBIENT BACKGROUND ── */}
      <Box position="fixed" top="-10%" left="-10%" w="50%" h="50%" bg="orange.100" filter="blur(160px)" opacity={0.4} zIndex={0} borderRadius="full" />
      <Box position="fixed" bottom="-10%" right="-10%" w="40%" h="40%" bg="blue.100" filter="blur(140px)" opacity={0.3} zIndex={0} borderRadius="full" />

      <Container maxW="1200px" h={{ base: "auto", lg: "calc(100vh - 80px)" }} py={{ base: 20, lg: 0 }} position="relative" zIndex={1}>
        <Flex 
          h="full" 
          align="center" 
          justify="center" 
          direction={{ base: "column", lg: "row" }} 
          gap={{ base: 12, lg: 20 }}
        >
          {/* ── LEFT PLANE: BRANDING ── */}
          <VStack 
            flex={1} 
            align={{ base: "center", lg: "start" }} 
            spacing={8} 
            display={{ base: "none", lg: "flex" }}
          >
            <Badge colorScheme="orange" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="1px">
              SYSTEM PORTAL
            </Badge>
            <VStack align="start" spacing={4}>
              <Heading size="3xl" fontWeight="900" color="gray.800" letterSpacing="-3px" lineHeight="1">
                Access your <br />
                <Text as="span" color="orange.500">Health OS</Text>.
              </Heading>
              <Text fontSize="xl" color="gray.500" fontWeight="600" maxW="450px">
                Synchronize your nutrition data, biometric insights, and scientific tracking tools in one unified dashboard.
              </Text>
            </VStack>
            
            <HStack spacing={4}>
              <Box p={4} bg="white" borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
                <Image h="40px" src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png" alt="Nutrimeter" />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight="900" fontSize="sm" color="gray.800">Verified Access</Text>
                <Text fontSize="xs" color="gray.400" fontWeight="700">SHA-256 ENCRYPTED</Text>
              </VStack>
            </HStack>
          </VStack>

          {/* ── RIGHT PLANE: LOGIN FORM ── */}
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            w="full"
            maxW="480px"
          >
            <VStack
              w="full"
              p={{ base: 8, md: 12 }}
              bg="rgba(255, 255, 255, 0.7)"
              backdropFilter="blur(30px)"
              borderRadius="4xl"
              border="1px solid"
              borderColor="white"
              boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.08)"
              spacing={8}
            >
              <VStack spacing={2} w="full" textAlign="center">
                <Image 
                  src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png" 
                  h="42px" 
                  mb={4}
                  display={{ base: "block", lg: "none" }}
                />
                <Heading size="lg" fontWeight="900" color="gray.800" letterSpacing="-1px">Welcome Back</Heading>
                <Text color="gray.500" fontWeight="700" fontSize="sm">Please enter your credentials</Text>
              </VStack>

              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  <FormControl>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none" h="full" ml={2}>
                        <MdEmail color="var(--chakra-colors-gray-400)" />
                      </InputLeftElement>
                      <Input 
                        name="email"
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="Email Address" 
                        h="64px"
                        pl={12}
                        bg="white"
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="gray.100"
                        fontSize="md"
                        fontWeight="600"
                        _placeholder={{ color: "gray.400" }}
                        _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 4px rgba(249, 115, 22, 0.1)" }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none" h="full" ml={2}>
                        <MdLock color="var(--chakra-colors-gray-400)" />
                      </InputLeftElement>
                      <Input
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        h="64px"
                        pl={12}
                        bg="white"
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="gray.100"
                        fontSize="md"
                        fontWeight="600"
                        _placeholder={{ color: "gray.400" }}
                        _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 4px rgba(249, 115, 22, 0.1)" }}
                      />
                    </InputGroup>
                  </FormControl>

                  <Flex w="full" justify="flex-end">
                    <Link to="#" style={{ color: '#F97316', fontWeight: '800', fontSize: '13px' }}>Forgot Password?</Link>
                  </Flex>

                  <Button
                    type="submit"
                    h="64px"
                    w="full"
                    bg="orange.500"
                    color="white"
                    fontSize="md"
                    fontWeight="900"
                    borderRadius="2xl"
                    boxShadow="0 15px 30px rgba(249, 115, 22, 0.2)"
                    isLoading={loading}
                    _hover={{ bg: "orange.600", transform: "translateY(-2px)" }}
                    _active={{ transform: "translateY(0)" }}
                    leftIcon={<MdLogin />}
                    rightIcon={<MdArrowForward />}
                  >
                    LOG INTO SYSTEM
                  </Button>

                  <HStack spacing={2} pt={2}>
                    <Text fontSize="sm" color="gray.500" fontWeight="700">New to Nutrimeter?</Text>
                    <Link to="/signup" style={{ color: '#F97316', fontWeight: '900', fontSize: '14px' }}>Sign Up Now</Link>
                  </HStack>
                </VStack>
              </form>
            </VStack>
          </MotionBox>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default Login;
