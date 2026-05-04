import React from 'react';
import { SiInstagram } from "react-icons/si";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import {
  Box, Flex, Image, Container, 
  HStack, Text, Icon, Divider
} from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box bg="#0D111E" py={8} borderTop="1px solid" borderColor="rgba(255,255,255,0.05)">
      <Container maxW="1200px">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center" 
          gap={6}
        >
          {/* LOGO */}
          <Image 
            w="140px" 
            src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png" 
            alt="Nutrimeter"
          />

          {/* ESSENTIAL LINKS */}
          <HStack spacing={8} wrap="wrap" justify="center">
            <FooterLink label="Privacy" />
            <FooterLink label="Terms" />
            <FooterLink label="Support" />
            <FooterLink label="Forums" />
          </HStack>

          {/* SOCIALS */}
          <HStack spacing={3}>
            <SocialIcon icon={BsFacebook} />
            <SocialIcon icon={BsTwitter} />
            <SocialIcon icon={SiInstagram} />
          </HStack>
        </Flex>

        <Divider my={6} borderColor="rgba(255,255,255,0.05)" />

        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center" 
          gap={2}
        >
          <Text color="gray.500" fontWeight="700" fontSize="xs">
            © 2026 Nutrimeter Inc.
          </Text>
          <Text color="gray.600" fontWeight="600" fontSize="xs">
            Scientific high-precision nutrition tracking.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

const FooterLink = ({ label }) => (
  <Text
    fontSize="sm"
    fontWeight="700"
    color="gray.400"
    cursor="pointer"
    _hover={{ color: "orange.400" }}
    transition="0.2s"
  >
    {label}
  </Text>
);

const SocialIcon = ({ icon }) => (
  <Flex
    as="button"
    w={8}
    h={8}
    borderRadius="full"
    bg="rgba(255,255,255,0.02)"
    border="1px solid"
    borderColor="rgba(255,255,255,0.05)"
    align="center"
    justify="center"
    color="gray.500"
    transition="0.2s"
    _hover={{ bg: "orange.500", color: "white", transform: "translateY(-1px)" }}
  >
    <Icon as={icon} boxSize={4} />
  </Flex>
);

export default Footer;