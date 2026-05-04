import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { chartData, dateWiseData } from './chartData'
import { useSelector } from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Chart = () => {
  const { usersAlItems } = useSelector((store) => store.diary)
  const dataArray = usersAlItems ? dateWiseData(usersAlItems) : []
  const data = chartData(dataArray)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)', drawBorder: false },
        ticks: { color: '#64748B', font: { size: 10, weight: '600' } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { size: 10, weight: '600' } },
      },
    },
  }

  return (
    <Box w="full" bg="white" p={6} borderRadius="2xl" borderWidth="1px" borderColor="gray.100" boxShadow="sm">
      <VStack align="start" spacing={4} w="full">
        <VStack align="start" spacing={0}>
          <Heading size="xs" color="gray.800" fontWeight="900" textTransform="uppercase" letterSpacing="1px">
            Monthly Calorie Distribution
          </Heading>
          <Text fontSize="10px" color="gray.500" fontWeight="700">Daily intake variations (kcal)</Text>
        </VStack>
        <Box w="full" h="250px">
          <Bar data={data} options={options} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Chart
