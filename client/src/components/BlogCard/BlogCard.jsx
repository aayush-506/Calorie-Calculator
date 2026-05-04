import { Box, Heading, Image, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { MdOutlineCalendarToday, MdArrowForward } from "react-icons/md";

const MotionBox = motion(Box);

export default function BlogCard({ image, heading, date, description }) {
  return (
    <MotionBox
      width={{ base: "full", md: "48%", xl: "48%" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      h="full"
    >
      <VStack
        h="full"
        bg="white"
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
        spacing={0}
        align="stretch"
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          borderColor: "orange.200"
        }}
      >
        <Box h="260px" w="full" overflow="hidden">
          <Image
            src={image}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        </Box>

        <VStack p={8} spacing={4} align="start" flex={1}>
          <HStack spacing={2} color="gray.400">
            <Icon as={MdOutlineCalendarToday} boxSize={3} />
            <Text fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="1px">
              {date}
            </Text>
          </HStack>

          <VStack align="start" spacing={3} flex={1}>
            <Heading size="md" fontWeight="900" color="gray.800" letterSpacing="-0.5px" lineHeight="1.3">
              {heading}
            </Heading>
            <Text fontSize="sm" color="gray.500" fontWeight="600" noOfLines={3} lineHeight="tall">
              {description}
            </Text>
          </VStack>

          <HStack spacing={2} pt={4} color="orange.500" cursor="pointer" role="group">
            <Text fontSize="xs" fontWeight="900" letterSpacing="1px" textTransform="uppercase">
              Read Analysis
            </Text>
            <Icon 
              as={MdArrowForward} 
              boxSize={4} 
              transition="transform 0.3s" 
              _groupHover={{ transform: "translateX(4px)" }} 
            />
          </HStack>
        </VStack>
      </VStack>
    </MotionBox>
  );
}
