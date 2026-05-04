import { Box, Progress, Text, VStack, HStack, Icon, Divider } from '@chakra-ui/react'
import React from 'react'

const changeColor = (val) => {
  if (val <= 30) return 'orange'
  else if (val > 30 && val < 70) return 'blue'
  else return 'green'
}

const CustomSmallTable = ({ title, data }) => {
  return (
    <Box
      w="full"
      h="full" // Ensures all cards in a grid row have the same height
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.100"
      shadow="sm"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Table Header */}
      <Box
        w="full"
        bg="gray.50"
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="gray.100"
      >
        <Text
          textAlign="center"
          color="gray.800"
          fontSize="xs"
          fontWeight="900"
          textTransform="uppercase"
          letterSpacing="1px"
        >
          {title}
        </Text>
      </Box>

      {/* Table Content */}
      <Box p={4} flex={1}>
        <VStack spacing={3} align="stretch">
          {data && data.length > 0 ? (
            data.map(({ title: name, cal }, ind) => {
              const percentage = (cal / 2400) * 100
              return (
                <Box key={`${ind}-${name}`}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="11px" fontWeight="700" color="gray.600" noOfLines={1} flex={1}>
                      {name}
                    </Text>
                    <HStack spacing={1} flexShrink={0}>
                      <Text fontSize="11px" fontWeight="900" color="gray.800">
                        {((((cal / 1000) * 100) / 2400) * 100).toFixed(2)}
                      </Text>
                      <Text fontSize="9px" fontWeight="700" color="gray.400" textTransform="uppercase">
                        kCal
                      </Text>
                    </HStack>
                  </HStack>
                  <Progress
                    colorScheme={changeColor(percentage)}
                    height="6px"
                    value={percentage}
                    borderRadius="full"
                    bg="gray.50"
                  />
                  {ind < data.length - 1 && <Box mt={3} />}
                </Box>
              )
            })
          ) : (
            <Text fontSize="xs" color="gray.400" textAlign="center" py={4}>No data available</Text>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export default CustomSmallTable
