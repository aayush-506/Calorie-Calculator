import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box } from '@chakra-ui/react'
import { singleProductData } from './chartData'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ product }) => {
  const data = singleProductData(product)
  
  const options = {
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 10,
        cornerRadius: 8,
      }
    },
    maintainAspectRatio: false,
  }

  return (
    <Box h="full" w="full" minH="180px">
      <Doughnut data={data} options={options} />
    </Box>
  )
}

export default DoughnutChart
