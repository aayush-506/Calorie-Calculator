import React, { useEffect } from 'react'
import { Box, Flex, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend,
} from 'chart.js'
import { useSelector, useDispatch } from 'react-redux'
import { fetchExercises } from '../../redux/health/health'
import { daysInMonth, dateWiseData } from './chartData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/* Parse DD/MM/YYYY → { day, month (0-indexed), year } */
const parseDate = (str) => {
  if (!str) return null
  const parts = str.split('/')
  if (parts.length !== 3) return null
  return {
    day:   parseInt(parts[0], 10),
    month: parseInt(parts[1], 10) - 1,
    year:  parseInt(parts[2], 10),
  }
}

/* Aggregate exercise calories burned per day of current month */
const exerciseWiseData = (exercises) => {
  const now = new Date()
  const cm  = now.getMonth()
  const cy  = now.getFullYear()

  return Array.from({ length: 31 }, (_, i) => {
    const day = i + 1
    const burned = exercises.reduce((acc, ex) => {
      const d = parseDate(ex.date)
      if (!d) return acc
      if (d.day === day && d.month === cm && d.year === cy) {
        return acc + (ex.caloriesBurned || 0)
      }
      return acc
    }, 0)
    return [day, burned]
  })
}

const CalNetChart = () => {
  const dispatch   = useDispatch()
  const token      = useSelector(s => s.auth.data.token)
  const { usersAlItems }  = useSelector(s => s.diary)
  const { exercises }     = useSelector(s => s.health)

  useEffect(() => {
    dispatch(fetchExercises(token))
  }, [token, dispatch])

  const days         = daysInMonth(new Date().getMonth() + 1)
  const intakeArr    = dateWiseData(usersAlItems || [])
  const burnedArr    = exerciseWiseData(exercises || [])

  const intakeVals   = intakeArr.map(d => d[1])
  const burnedVals   = burnedArr.map(d => d[1])
  const netVals      = intakeVals.map((v, i) => Math.max(0, v - burnedVals[i]))

  const today     = new Date().getDate()
  const todayIntake  = intakeVals[today - 1] || 0
  const todayBurned  = burnedVals[today - 1] || 0
  const todayNet     = Math.max(0, todayIntake - todayBurned)

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Calories Intake',
        data: intakeVals,
        backgroundColor: 'rgba(249, 115, 22, 0.75)',
        hoverBackgroundColor: '#EA580C',
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.75,
      },
      {
        label: 'Calories Burned',
        data: burnedVals,
        backgroundColor: 'rgba(16, 185, 129, 0.75)',
        hoverBackgroundColor: '#059669',
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.75,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 11, weight: '700' },
          color: '#64748B',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          afterBody: (items) => {
            const intake  = items.find(i => i.dataset.label === 'Calories Intake')?.raw || 0
            const burned  = items.find(i => i.dataset.label === 'Calories Burned')?.raw || 0
            const net = Math.max(0, intake - burned)
            return `\nNet: ${net.toFixed(0)} kcal`
          },
        },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
        ticks: { color: '#94A3B8', font: { size: 10, weight: '600' } },
        title: { display: true, text: 'kcal', color: '#94A3B8', font: { size: 11, weight: '700' } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8', font: { size: 9, weight: '600' } },
      },
    },
  }

  return (
    <Box w="full" bg="white" p={6} borderRadius="2xl" borderWidth="1px" borderColor="gray.100" boxShadow="sm">
      <VStack align="stretch" spacing={5} w="full">

        {/* Header */}
        <Flex justify="space-between" align="flex-start">
          <VStack align="start" spacing={0}>
            <Heading size="xs" color="gray.800" fontWeight="900" textTransform="uppercase" letterSpacing="1px">
              Intake vs Burned
            </Heading>
            <Text fontSize="10px" color="gray.500" fontWeight="700">Daily calorie balance — current month</Text>
          </VStack>

          {/* Today's snapshot chips */}
          <HStack spacing={2} flexWrap="wrap" justify="flex-end">
            <Badge colorScheme="orange" borderRadius="full" px={3} py={1} fontSize="10px" fontWeight="800">
              🍽 Eaten: {Math.round(todayIntake)} kcal
            </Badge>
            <Badge colorScheme="green" borderRadius="full" px={3} py={1} fontSize="10px" fontWeight="800">
              🔥 Burned: {Math.round(todayBurned)} kcal
            </Badge>
            <Badge
              colorScheme={todayNet < 500 ? 'green' : todayNet < 1500 ? 'yellow' : 'red'}
              borderRadius="full" px={3} py={1} fontSize="10px" fontWeight="800"
            >
              ⚖ Net: {Math.round(todayNet)} kcal
            </Badge>
          </HStack>
        </Flex>

        {/* Chart */}
        <Box h="260px" w="full">
          <Bar data={data} options={options} />
        </Box>

      </VStack>
    </Box>
  )
}

export default CalNetChart
