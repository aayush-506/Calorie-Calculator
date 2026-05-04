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
  Checkbox,
  Text,
  VStack,
  HStack,
  Badge,
  Container,
  useToast,
  Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdPerson, MdArrowForward, MdHowToReg } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { SignupApi } from "../redux/auth/auth.actions";
import Footer from "../components/Footer";
import NavBar from "./NavBar";

const MotionBox = motion(Box);

const Signup = () => {
  const { error, loading, bool } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (bool) {
      navigate("/bodyM");
    }
  }, [bool, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Registration Error",
        description: "A user with that e-mail address already exists.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
    }
  }, [error, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignupApi({ name, email, password }));
  }

  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <Box w="full" minH="100vh" bg="#F8FAFC" position="relative" overflowX="hidden">
      <NavBar />

      {/* ── AMBIENT BACKGROUND ── */}
      <Box position="fixed" top="-10%" left="-10%" w="50%" h="50%" bg="orange.100" filter="blur(160px)" opacity={0.4} zIndex={0} borderRadius="full" />
      <Box position="fixed" bottom="-10%" right="-10%" w="40%" h="40%" bg="blue.100" filter="blur(140px)" opacity={0.3} zIndex={0} borderRadius="full" />

      <Container maxW="1200px" py={{ base: 12, lg: 20 }} position="relative" zIndex={1}>
        <Flex 
          align="flex-start" 
          justify="center" 
          direction={{ base: "column", lg: "row" }} 
          gap={{ base: 12, lg: 20 }}
        >
          {/* ── LEFT PLANE: BRANDING ── */}
          <VStack 
            flex={1} 
            align={{ base: "center", lg: "start" }} 
            spacing={8} 
            pt={10}
            display={{ base: "none", lg: "flex" }}
          >
            <Badge colorScheme="green" variant="subtle" px={4} py={1} borderRadius="full" fontSize="xs" fontWeight="900" letterSpacing="1px">
              NEW BIOMETRIC NODE
            </Badge>
            <VStack align="start" spacing={4}>
              <Heading size="3xl" fontWeight="900" color="gray.800" letterSpacing="-3px" lineHeight="1">
                Start your <br />
                <Text as="span" color="orange.500">Journey</Text> today.
              </Heading>
              <Text fontSize="xl" color="gray.500" fontWeight="600" maxW="450px">
                Join 10 million+ users who track their nutrition with scientific precision. Create your free account in seconds.
              </Text>
            </VStack>
            
            <HStack spacing={6} pt={4}>
              <VStack align="start" spacing={1}>
                <Text fontWeight="900" fontSize="2xl" color="gray.800">82+</Text>
                <Text fontSize="xs" color="gray.400" fontWeight="800">MICRONUTRIENTS</Text>
              </VStack>
              <Divider orientation="vertical" h="40px" />
              <VStack align="start" spacing={1}>
                <Text fontWeight="900" fontSize="2xl" color="gray.800">100%</Text>
                <Text fontSize="xs" color="gray.400" fontWeight="800">DATA PRIVACY</Text>
              </VStack>
            </HStack>
          </VStack>

          {/* ── RIGHT PLANE: SIGNUP FORM ── */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            w="full"
            maxW="560px"
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
                <Heading size="lg" fontWeight="900" color="gray.800" letterSpacing="-1px">Create Free Account</Heading>
                <Text color="gray.500" fontWeight="700" fontSize="sm">Experience the gold standard in nutrition</Text>
              </VStack>

              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none" h="full" ml={2}>
                        <MdPerson color="var(--chakra-colors-gray-400)" />
                      </InputLeftElement>
                      <Input 
                        name="name"
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="Full Name" 
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
                        minlength="6"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Set Password (min 6 chars)"
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

                  {/* Terms section */}
                  <VStack align="start" w="full" bg="gray.50" p={6} borderRadius="2xl" spacing={4}>
                    <Heading size="xs" color="gray.700" fontWeight="900" textTransform="uppercase" letterSpacing="1px">Permissions</Heading>
                    
                    <Checkbox 
                      colorScheme="orange" 
                      isRequired 
                      isChecked={allChecked} 
                      onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                    >
                      <Text fontSize="xs" fontWeight="800" color="gray.700">Accept All Terms & Privacy Settings</Text>
                    </Checkbox>

                    <VStack align="start" spacing={2} pl={6}>
                      <Checkbox 
                        size="sm"
                        colorScheme="orange"
                        isChecked={checkedItems[0]}
                        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                      >
                        <Text fontSize="xs" fontWeight="600" color="gray.500">I agree to the Terms of Service</Text>
                      </Checkbox>
                      <Checkbox 
                        size="sm"
                        colorScheme="orange"
                        isChecked={checkedItems[1]}
                        onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                      >
                        <Text fontSize="xs" fontWeight="600" color="gray.500">I agree to receive health insights & updates</Text>
                      </Checkbox>
                    </VStack>
                  </VStack>

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
                    leftIcon={<MdHowToReg />}
                    rightIcon={<MdArrowForward />}
                  >
                    CREATE YOUR NODE
                  </Button>

                  <HStack spacing={2} pt={2}>
                    <Text fontSize="sm" color="gray.500" fontWeight="700">Already synchronized?</Text>
                    <Link to="/login" style={{ color: '#F97316', fontWeight: '900', fontSize: '14px' }}>Log In Here</Link>
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

export default Signup;
