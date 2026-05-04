import { 
  Button, Flex, Box, Image, Text, useMediaQuery, HStack, 
  Icon, Popover, PopoverTrigger, PopoverContent, PopoverBody, 
  VStack
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { MdDashboard, MdFlashOn } from "react-icons/md";
import DraewerNav from "./DraewerNav";

const NavBar = () => {
  const [isMatch] = useMediaQuery("(max-width: 900px)");

  return (
    <Box position="sticky" top={0} zIndex={100} w="full">
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes logo-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(249,115,22,0.1), 0 0 15px rgba(249,115,22,0.05); }
          50%      { box-shadow: 0 0 0 4px rgba(249,115,22,0.3), 0 0 25px rgba(249,115,22,0.15); }
        }
      `}</style>

      <Flex
        w="full"
        h="76px"
        px={{ base: 4, md: 8, lg: 12 }}
        align="center"
        justify="space-between"
        bg="rgba(13, 17, 30, 0.95)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.05)"
      >
        {/* LOGO */}
        <Box
          as={Link}
          to="/"
          p={1.5}
          borderRadius="xl"
          bg="rgba(255,255,255,0.03)"
          transition="all 0.2s"
          _hover={{ bg: 'rgba(255,255,255,0.08)' }}
          style={{ animation: 'logo-pulse 3s infinite ease-in-out' }}
        >
          <Image
            w={{ base: "130px", md: "150px" }}
            src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png"
            alt="Nutrimeter"
          />
        </Box>

        {isMatch ? (
          <DraewerNav />
        ) : (
          <HStack spacing={10}>
            {/* Products Popover */}
            <Popover trigger="hover" openDelay={0} closeDelay={100}>
              <PopoverTrigger>
                <HStack cursor="pointer" spacing={1} color="gray.300" _hover={{ color: "orange.400" }} transition="0.2s">
                  <Text fontSize="14px" fontWeight="700" letterSpacing="0.5px">PRODUCTS</Text>
                  <Icon as={FaChevronDown} boxSize={3} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent 
                bg="#1A202C" 
                border="1px solid" 
                borderColor="rgba(255,255,255,0.1)" 
                boxShadow="2xl" 
                borderRadius="2xl" 
                mt={2}
                overflow="hidden"
                w="240px"
              >
                <PopoverBody p={2}>
                  <VStack align="stretch" spacing={1}>
                    <ProductItem to="/" icon={MdDashboard} label="For Individuals" color="green" />
                    <ProductItem to="/pro" icon={MdFlashOn} label="Nutrimeter Pro" color="purple" />
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <NavLinkItem to="/support" label="SUPPORT" />
            <NavLinkItem to="/blog" label="BLOG" />
            
            <HStack spacing={4}>
              <Link to="/login">
                <Text fontSize="14px" fontWeight="800" color="gray.300" _hover={{ color: "white" }} px={4}>
                  LOGIN
                </Text>
              </Link>
              <Link to="/signup">
                <Button
                  h="42px"
                  px={6}
                  bg="orange.500"
                  color="white"
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight="900"
                  letterSpacing="1px"
                  _hover={{ bg: "orange.600", transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(249,115,22,0.3)" }}
                  _active={{ transform: "translateY(0)" }}
                >
                  SIGN UP FREE
                </Button>
              </Link>
            </HStack>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

const NavLinkItem = ({ to, label }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Text
        fontSize="14px"
        fontWeight="700"
        letterSpacing="0.5px"
        color={isActive ? "orange.400" : "gray.300"}
        _hover={{ color: "orange.400" }}
        transition="0.2s"
      >
        {label}
      </Text>
    )}
  </NavLink>
);

const ProductItem = ({ to, icon, label, color }) => (
  <NavLink to={to}>
    <HStack
      p={3}
      borderRadius="xl"
      transition="0.2s"
      _hover={{ bg: "rgba(255,255,255,0.05)" }}
    >
      <Flex w={8} h={8} borderRadius="lg" bg={`${color}.900`} color={`${color}.300`} align="center" justify="center">
        <Icon as={icon} />
      </Flex>
      <Text fontWeight="700" fontSize="sm" color="gray.200">{label}</Text>
    </HStack>
  </NavLink>
);

export default NavBar;