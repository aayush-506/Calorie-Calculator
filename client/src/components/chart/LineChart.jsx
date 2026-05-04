import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { lineChartData, dateWiseData } from './chartData'
import { useSelector } from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const LineChart = ({ h = '420px' }) => {
  const { usersAlItems } = useSelector((store) => store.diary)
  const dataArray = usersAlItems ? dateWiseData(usersAlItems) : []
  const data = lineChartData(dataArray)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 12,
        cornerRadius: 8,
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
    <Box w="full" h={h} bg="white" p={6} borderRadius="2xl" borderWidth="1px" borderColor="gray.100" boxShadow="sm">
      <VStack align="start" spacing={6} w="full" h="full">
        <VStack align="start" spacing={0}>
          <Heading size="xs" color="gray.800" fontWeight="900" textTransform="uppercase" letterSpacing="1px">
            Nutrition Trends
          </Heading>
          <Text fontSize="10px" color="gray.500" fontWeight="700">7-day performance analysis</Text>
        </VStack>
        <Box w="full" flex={1}>
          <Line data={data} options={options} />
        </Box>
      </VStack>
    </Box>
  )
}

export default LineChart
