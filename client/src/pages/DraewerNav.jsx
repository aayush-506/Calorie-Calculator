import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Center,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Flex,
  CloseButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {  FaBars } from "react-icons/fa";
import { FaAppleAlt } from "react-icons/fa";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
const fontSize = { base: "10px", sm: "12px", md: "15px", lg: "18px" };

function DraewerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("top");


  return (
    <Box marginRight={2}>
      <IconButton
        aria-label="Open Navigation"
        variant="ghost"
        color="orange.500"
        fontSize="20px"
        onClick={onOpen}
        icon={<FaBars />}
        _hover={{ bg: "orange.50" }}
      />
      
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerHeader borderBottomWidth="1px" py={4}>
            <Flex justify="space-between" align="center">
              <Image 
                width="140px"
                src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png"
                alt="Logo"
              />
              <CloseButton onClick={onClose} />
            </Flex>
          </DrawerHeader>

          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <Box p={4} borderBottomWidth="1px">
                <Popover isLazy placement="bottom-start">
                  <PopoverTrigger>
                    <HStack justify="space-between" cursor="pointer" _hover={{ color: "orange.500" }}>
                      <Text fontWeight="600" fontSize="lg">Products</Text>
                      <Text fontSize="sm">▾</Text>
                    </HStack>
                  </PopoverTrigger>
                  <PopoverContent border="none" boxShadow="lg">
                    <PopoverHeader fontWeight="semibold">Nutrimeter Products</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody p={2}>
                      <VStack align="stretch">
                        <NavLink to="/" onClick={onClose}>
                          <HStack p={2} _hover={{ bg: "gray.50" }} borderRadius="md">
                            <IconButton isRound size="sm" bg="green.100" color="green.600" icon={<FaAppleAlt />} />
                            <Text>For Individuals</Text>
                          </HStack>
                        </NavLink>
                        <NavLink to="/pro" onClick={onClose}>
                          <HStack p={2} _hover={{ bg: "gray.50" }} borderRadius="md">
                            <IconButton isRound size="sm" bg="red.100" color="red.600" icon={<FaAppleAlt />} />
                            <Text>For Healthcare Professionals</Text>
                          </HStack>
                        </NavLink>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>

              <NavDrawerItem to="/blog" label="Blog" onClick={onClose} />
              <NavDrawerItem to="/" label="Forums" onClick={onClose} />
              <NavDrawerItem to="/about" label="About" onClick={onClose} />
              <NavDrawerItem to="/support" label="Support" onClick={onClose} />
              
              <Box p={4} mt={4}>
                <NavLink to="/login" onClick={onClose}>
                  <Button w="full" colorScheme="orange">
                    Login
                  </Button>
                </NavLink>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const NavDrawerItem = ({ to, label, onClick }) => (
  <Box borderBottomWidth="1px" _hover={{ bg: "gray.50" }}>
    <NavLink to={to} onClick={onClick}>
      <Box p={4}>
        <Text fontWeight="600" fontSize="lg" _hover={{ color: "orange.500" }}>
          {label}
        </Text>
      </Box>
    </NavLink>
  </Box>
)


export default DraewerNav;