import { Box, VStack, Flex, Heading, Text, Button, Icon, Container } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getfoodProducts } from '../../redux/diary/diary.actions'
import CustomTable from '../../components/CustomTable/CustomTable'
import AfterLoginPageNavbar from '../../components/AfterLoginPageNavbar'
import { MdArrowBack } from 'react-icons/md'

const LogHistoryPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: { token } } = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(getfoodProducts(token))
  }, [token, dispatch])

  return (
    <VStack w="full" minH="100vh" bg="gray.50" spacing={0} align="stretch" pb={10}>
      <AfterLoginPageNavbar currentLink="dairy" />
      
      <Container maxW="1200px" pt={8} px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="stretch">
          
          {/* Header Section */}
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
            <VStack align="start" spacing={1}>
              <Button 
                leftIcon={<MdArrowBack />} 
                variant="link" 
                color="gray.500" 
                fontSize="sm" 
                onClick={() => navigate('/checkCalories')}
                mb={2}
              >
                Back to Dashboard
              </Button>
              <Heading size="lg" fontWeight="900" color="gray.800">Complete Log History</Heading>
              <Text fontSize="sm" fontWeight="700" color="gray.500">
                A full record of your nutrition entries for today.
              </Text>
            </VStack>
          </Flex>

          {/* Main Content: Full Table */}
          <Box bg="white" borderRadius="2xl" shadow="sm" borderWidth="1px" borderColor="gray.100" overflow="hidden">
            <Box p={6} borderBottomWidth="1px" borderColor="gray.50" bg="white">
              <Heading size="xs" color="gray.800" textTransform="uppercase" letterSpacing="1px">All History Entries</Heading>
            </Box>
            <CustomTable />
          </Box>

        </VStack>
      </Container>
    </VStack>
  )
}

export default LogHistoryPage
