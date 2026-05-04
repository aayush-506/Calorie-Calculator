import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Stack,
  Text,
  VStack,
  Flex,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import MacroTargets from '../macroTargets/MacroTargets'
import { useSelector } from 'react-redux'
import { getTotalEnergy } from './energySummeryData'

ChartJS.register(ArcElement, Tooltip, Legend)

const EnergySummery = () => {
  const { foodItemsInList, baseValue = 2000, loading } = useSelector(
    (store) => store.diary,
  )

  const { total, remaining, per } = getTotalEnergy(foodItemsInList || [], baseValue)

  const chartData = {
    labels: ['Consumed', 'Remaining'],
    datasets: [
      {
        data: [total, Math.max(0, remaining)],
        backgroundColor: ['rgba(249, 115, 22, 0.8)', 'rgba(226, 232, 240, 0.4)'],
        borderColor: ['#F97316', '#CBD5E1'],
        borderWidth: 1,
        cutout: '80%',
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  }

  return (
    <Box
      w="full"
      bg="white"
      borderRadius="2xl"
      p={{ base: 4, lg: 6 }}
      boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} align="center">
        {/* Left Side: Energy Gauge */}
        <VStack flex={1} spacing={4} align="center" position="relative">
          <Box w="200px" h="200px" position="relative">
            <Doughnut data={chartData} options={chartOptions} />
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              spacing={0}
            >
              <Text fontSize="4xl" fontWeight="900" color="gray.800" lineHeight="1">
                {total.toFixed(0)}
              </Text>
              <Text fontSize="sm" fontWeight="700" color="gray.400" textTransform="uppercase">
                kcal
              </Text>
            </VStack>
          </Box>
          <VStack spacing={1}>
            <Text fontSize="md" fontWeight="800" color="gray.700">Daily Energy</Text>
            <HStack color="gray.500" fontSize="sm" fontWeight="600">
              <Text color="orange.500">{total.toFixed(0)} kcal in</Text>
              <Box w={1} h={1} bg="gray.300" borderRadius="full" />
              <Text>{remaining.toFixed(0)} kcal left</Text>
            </HStack>
          </VStack>
        </VStack>

        {/* Divider for desktop */}
        <Box display={{ base: 'none', lg: 'block' }} w="1px" h="180px" bg="gray.100" />

        {/* Right Side: Detailed Metrics & Macros */}
        <Box flex={1.5} w="full">
          <MacroTargets />
        </Box>
      </Stack>
    </Box>
  )
}

export default EnergySummery
