import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const ProgressCircle = ({ value = 0, name, unit = 'mg' }) => {
  const displayValue = typeof value === 'number' ? value.toFixed(1) : 0
  const percentage = Math.min(100, (value / 100) * 100) // Mock logic for display

  return (
    <Box 
      p={3} 
      bg="white" 
      borderRadius="xl" 
      borderWidth="1px" 
      borderColor="gray.100" 
      w="120px"
      boxShadow="sm"
    >
      <VStack spacing={2} align="center">
        <Box position="relative" w="50px" h="50px">
          <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="3.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#skyGradient)"
              strokeWidth="3.5"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
          <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="10px" fontWeight="800" color="sky.600" mt="1px">{displayValue}</Text>
          </Box>
        </Box>
        <VStack spacing={0}>
          <Text fontSize="11px" fontWeight="800" color="gray.700" noOfLines={1}>{name}</Text>
          <Text fontSize="10px" fontWeight="600" color="gray.400">{unit}</Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export default ProgressCircle
