import { Box, Stack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/CustomTable/CustomTable'
import CustomSmallTable from '../../components/CustomSmallTable/CustomSmallTable'
import CircularProgressDisplayer from '../../components/CircularProgessDiv/CircularProgressDisplayer'
import EnergySummery from '../../components/energySummery/EnergySummery'
import { useDispatch, useSelector } from 'react-redux'
import { getfoodProducts } from '../../redux/diary/diary.actions'
import { data } from './diary.data'
import Chart from '../../components/chart/Chart'
import LineChart from '../../components/chart/LineChart'
import AddFoodItem from '../../components/AddFoodItemNav'
import AddItemWindow from '../../components/AddItemWindow'
import AfterLoginPageNavbar from '../../components/AfterLoginPageNavbar'

const Diarypage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { foodItemsInList } = useSelector((store) => store.diary)
  const { data:{token} } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getfoodProducts(token))
  }, [token])
  if (foodItemsInList) {
    var { main, micro, vitamins, Major, Fat } = data(foodItemsInList)
  }

  const toggleVisibility = () => setIsOpen((prev) => (prev = !prev))

  return (
    <VStack w="full" minH="100vh" bg="gray.50" spacing={0} align="stretch">
      <AfterLoginPageNavbar currentLink="dairy" />
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        maxW="1200px"
        margin="auto"
        p={{ base: 3, lg: 5 }}
        gap={{ base: 4, lg: 6 }}
        align="flex-start"
        flex={1}
      >
        <Box
          w={{ base: '100%', lg: '380px' }}
          flexShrink={0}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          p={4}
          boxShadow="sm"
        >
          <Stack spacing={4}>
            <Chart title="Bar Representation" />
            <LineChart title="Line Representation" />
          </Stack>
        </Box>
        <Box
          flex={1}
          minW={0}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          p={4}
          boxShadow="sm"
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <AddFoodItem toggleVisibility={toggleVisibility} />
          <CustomTable />
          <CircularProgressDisplayer />
          <EnergySummery />
          <Stack direction={{ base: 'column', md: 'row' }} gap={4} flexWrap="wrap">
            <CustomSmallTable title="Lipid" data={Fat} />
            <CustomSmallTable title="Major" data={Major} />
            <CustomSmallTable title="Vitamins" data={vitamins} />
            <CustomSmallTable title="Micro" data={micro} />
            <CustomSmallTable title="Main" data={main} />
          </Stack>
          {isOpen && <AddItemWindow toggleVisibility={toggleVisibility} />}
        </Box>
      </Stack>
    </VStack>
  )
}

export default Diarypage
