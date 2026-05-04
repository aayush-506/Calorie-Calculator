import { Box, Stack, VStack, HStack, Text, Flex, Heading, Spacer, Container, SimpleGrid, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../components/CustomTable/CustomTable'
import CustomSmallTable from '../../components/CustomSmallTable/CustomSmallTable'
import CircularProgressDisplayer from '../../components/CircularProgessDiv/CircularProgressDisplayer'
import EnergySummery from '../../components/energySummery/EnergySummery'
import { useDispatch, useSelector } from 'react-redux'
import { getfoodProducts } from '../../redux/diary/diary.actions'
import { data } from './diary.data'
import Chart from '../../components/chart/Chart'
import LineChart from '../../components/chart/LineChart'
import CalNetChart from '../../components/chart/CalNetChart'
import AddFoodItem from '../../components/AddFoodItemNav'
import AddItemWindow from '../../components/AddItemWindow'
import AfterLoginPageNavbar from '../../components/AfterLoginPageNavbar'

const Diarypage = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { foodItemsInList } = useSelector((store) => store.diary)
  const { data: { token } } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getfoodProducts(token))
  }, [token, dispatch])

  const { main = [], micro = [], vitamins = [], Major = [], Fat = [] } = foodItemsInList ? data(foodItemsInList) : {}

  const toggleVisibility = () => setIsOpen((prev) => !prev)

  return (
    <VStack w="full" minH="100vh" bg="gray.50" spacing={0} align="stretch" pb={10}>
      <AfterLoginPageNavbar currentLink="dairy" />
      
      <Box w="full" px={{ base: 4, xl: 10 }} pt={8}>
        <VStack spacing={8} align="stretch" w="full">
          
          {/* Header & Main Actions */}
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={6}>
            <VStack align="start" spacing={1}>
              <Heading size="lg" fontWeight="900" color="gray.800">Health Dashboard</Heading>
              <Text fontSize="sm" fontWeight="700" color="gray.500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Text>
            </VStack>
            <AddFoodItem toggleVisibility={toggleVisibility} />
          </Flex>

          {/* Top Hero Row: Primary Metrics (Always visible at top) */}
          <EnergySummery />

          {/* Section: Latest Logs (Full Width) */}
          <Box bg="white" borderRadius="2xl" shadow="sm" borderWidth="1px" borderColor="gray.100" overflow="hidden" w="full">
             <Box p={6} borderBottomWidth="1px" borderColor="gray.50">
               <Flex justify="space-between" align="center">
                 <Heading size="xs" color="gray.800" textTransform="uppercase" letterSpacing="1px">Latest Food Logs</Heading>
                 <Button 
                   size="xs" 
                   variant="ghost" 
                   colorScheme="orange" 
                   onClick={() => navigate('/checkCalories/history')}
                   fontWeight="700"
                 >
                   View All Logs →
                 </Button>
               </Flex>
             </Box>
             <CustomTable limit={3} />
          </Box>

          {/* Section: Core Analysis Row (Equal Heights) */}
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} align="stretch" w="full">
            <Box flex={{ base: 'none', lg: 2 }}>
              <CircularProgressDisplayer h="full" />
            </Box>
            <Box flex={{ base: 'none', lg: 1 }}>
              <LineChart h="full" />
            </Box>
          </Stack>

          {/* Section: Intake vs Burned Chart */}
          <CalNetChart />

          {/* Section: Secondary Analytics Trend */}
          <Box w="full">
            <VStack align="stretch" spacing={6} bg="white" p={6} borderRadius="2xl" shadow="sm" borderWidth="1px" borderColor="gray.100">
               <Heading size="xs" color="gray.800" textTransform="uppercase" letterSpacing="1px">Macronutrient Distribution</Heading>
               <Chart />
            </VStack>
          </Box>

          {/* Detailed Targets: Consolidated 3-Pillar Audit Row (Equal Heights with Sub-sections) */}
          <Box w="full" pt={4}>
            <VStack align="start" spacing={6} w="full">
              <Heading size="xs" color="gray.500" textTransform="uppercase" letterSpacing="1px" px={2}>Detailed Nutrient Audit</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full" align="stretch">
                
                {/* Pillar 1: Main & Major Minerals */}
                <VStack spacing={6} align="stretch" flex={1}>
                  <CustomSmallTable title="Main Composition" data={main || []} />
                  <CustomSmallTable title="Major Minerals" data={Major || []} />
                </VStack>

                {/* Pillar 2: Lipids & Vitamins */}
                <VStack spacing={6} align="stretch" flex={1}>
                  <CustomSmallTable title="Lipid Profile" data={Fat || []} />
                  <CustomSmallTable title="Vitamins" data={vitamins || []} />
                </VStack>

                {/* Pillar 3: Micro Minerals (The tall pillar) */}
                <Box flex={1}>
                  <CustomSmallTable title="Micro Minerals" data={micro || []} />
                </Box>
                
              </SimpleGrid>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {isOpen && <AddItemWindow toggleVisibility={toggleVisibility} />}
    </VStack>
  )
}

export default Diarypage
