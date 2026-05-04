import { Box, Progress, Spacer, Text, VStack, HStack, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalEnergy } from '../energySummery/energySummeryData'
import { colorOfBar, macroTargets } from './macroData'

const MacroTargets = () => {
  const { foodItemsInList, baseValue = 2000, loading } = useSelector(
    (state) => state.diary,
  )
  
  const { per = 0 } = foodItemsInList ? getTotalEnergy(foodItemsInList, baseValue) : {}
  const { targets = [] } = foodItemsInList ? macroTargets(foodItemsInList, per) : { targets: [] }

  return (
    <VStack w="full" spacing={5}>
      <Flex w="full" justify="space-between" align="center">
        <Text fontSize="sm" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px">
          Macronutrient Breakdown
        </Text>
      </Flex>
      
      <VStack w="full" spacing={4}>
        {targets.map(({ title, value, grams }, ind) => (
          <Box key={ind} w="full">
            <Flex justify="space-between" mb={1} align="baseline">
              <Text fontWeight="800" fontSize="sm" color="gray.700">
                {title}
              </Text>
              <HStack spacing={1}>
                {grams && <Text fontSize="xs" fontWeight="700" color="gray.400">{grams}g</Text>}
                <Text fontWeight="800" fontSize="sm" color={`${colorOfBar(value)}.500`}>
                  {value.toFixed(0)}%
                </Text>
              </HStack>
            </Flex>
            <Box position="relative" h="10px" w="full" bg="gray.100" borderRadius="full" overflow="hidden">
              <Box 
                position="absolute"
                left={0}
                top={0}
                h="full"
                w={`${Math.min(100, value)}%`}
                bg={`${colorOfBar(value)}.400`}
                borderRadius="full"
                transition="width 1s cubic-bezier(0.4, 0, 0.2, 1)"
              />
            </Box>
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}

export default MacroTargets
