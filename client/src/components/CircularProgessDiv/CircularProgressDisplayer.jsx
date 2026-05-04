import { Box, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ProgressCircle from '../ProgressCircle'
import { nutrientsData } from './data'

const CircularProgressDisplayer = ({ h = '420px' }) => {
  const { foodItemsInList } = useSelector((store) => store.diary)
  const items = nutrientsData(foodItemsInList)

  return (
    <Box w="full" h={h} bg="white" p={6} borderRadius="2xl" borderWidth="1px" borderColor="gray.100" boxShadow="sm">
      <VStack spacing={8} align="stretch" h="full">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Heading size="xs" color="gray.800" fontWeight="900" textTransform="uppercase" letterSpacing="1px">
              Micronutrient Profile
            </Heading>
            <Text fontSize="10px" color="gray.500" fontWeight="700">Daily intake analysis based on logged meals</Text>
          </VStack>
        </Flex>

        <Box flex={1} display="flex" alignItems="center">
          <SimpleGrid columns={{ base: 2, md: 4, xl: 4, '2xl': 4 }} spacing={4} w="full">
            <ProgressCircle value={items.protein} name="Protein" unit="g" />
            <ProgressCircle value={items.fiber} name="Fiber" unit="g" />
            <ProgressCircle value={items.calcium} name="Calcium" unit="mg" />
            <ProgressCircle value={items.iron} name="Iron" unit="mg" />
            <ProgressCircle value={items.magnesium} name="Magnesium" unit="mg" />
            <ProgressCircle value={items.sodium} name="Sodium" unit="mg" />
            <ProgressCircle value={items.vitaminA} name="Vitamin A" unit="mcg" />
            <ProgressCircle value={items.cholesterol} name="Cholesterol" unit="mg" />
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  )
}

export default CircularProgressDisplayer
