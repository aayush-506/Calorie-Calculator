import {
  Box,
  Button,
  CloseButton,
  FormControl,
  HStack,
  Input,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Flex,
  Icon,
  Heading,
  Divider,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewProduct,
  getAllProductToDisplay,
} from '../redux/diary/diary.actions'
import DoughnutChart from './chart/DoughnutChart'
import SearchResultTable from './SearchResultTable/SearchResultTable'
import { MdSearch, MdClose, MdInfoOutline } from 'react-icons/md'

const AddItemWindow = ({ toggleVisibility }) => {
  const { allFoodItems } = useSelector((store) => store.diary)
  const {
    data: { token },
  } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [serving, setServing] = useState(1)
  const [product, setProduct] = useState('')

  const handleClickProduct = (item) => {
    setProduct(item)
  }
  
  const handleAddItem = () => {
    if (product === '') {
      alert('Search and select a food product first')
      return
    }
    dispatch(addNewProduct({ product: product._id, serving }, token))
    toggleVisibility()
  }

  useEffect(() => {
    if (!query) dispatch(getAllProductToDisplay(''))
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [dispatch])

  return (
    <Box 
      position="fixed" 
      inset={0} 
      zIndex={1000} 
      bg="blackAlpha.700" 
      backdropFilter="blur(8px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack
        w="full"
        maxW="1000px"
        h="full"
        maxH="800px"
        bg="white"
        borderRadius="3xl"
        boxShadow="2xl"
        overflow="hidden"
        spacing={0}
      >
        {/* Modal Header */}
        <Flex w="full" px={8} py={6} align="center" borderBottomWidth="1px" borderColor="gray.100">
          <VStack align="start" spacing={0}>
            <Heading size="md" color="gray.800" fontWeight="900" textTransform="uppercase" letterSpacing="1px">Log Nutrition</Heading>
            <Text fontSize="xs" color="gray.500" fontWeight="700">Daily Diary Recovery & Search</Text>
          </VStack>
          <Spacer />
          <Button 
            onClick={toggleVisibility} 
            variant="ghost" 
            borderRadius="full" 
            w={10} 
            h={10} 
            p={0}
            _hover={{ bg: 'red.50', color: 'red.500' }}
          >
            <Icon as={MdClose} boxSize={6} />
          </Button>
        </Flex>

        <Stack direction={{ base: 'column', lg: 'row' }} flex={1} w="full" overflow="hidden" spacing={0}>
          {/* Left Panel: Search & Results */}
          <VStack flex={1.5} borderRightWidth={{ lg: '1px' }} borderColor="gray.100" p={6} spacing={6} align="stretch" overflowY="auto">
            <HStack spacing={2}>
              <Flex flex={1} bg="gray.50" borderRadius="full" px={4} py={2} align="center" borderWidth="1px" borderColor="gray.100" _focusWithin={{ borderColor: 'orange.400', bg: 'white', boxShadow: '0 0 0 1px #F97316' }} transition="all 0.2s">
                <Icon as={MdSearch} color="gray.400" boxSize={5} mr={2} />
                <Input
                  value={query}
                  onChange={({ target: { value } }) => setQuery(value)}
                  placeholder="Search 10,000+ scientific food entries..."
                  variant="unstyled"
                  fontSize="sm"
                  fontWeight="600"
                />
              </Flex>
              <Button 
                onClick={() => dispatch(getAllProductToDisplay(query))} 
                colorScheme="orange" 
                borderRadius="full"
                px={6}
                fontSize="sm"
                fontWeight="800"
              >
                FIND
              </Button>
            </HStack>

            <Box flex={1}>
              <SearchResultTable
                allFoodItems={allFoodItems}
                handleClickProduct={handleClickProduct}
              />
            </Box>
          </VStack>

          {/* Right Panel: Selection & Macros */}
          <VStack flex={1} bg="gray.50" p={8} spacing={8} align="center" justify="center">
            {product ? (
              <VStack spacing={6} w="full">
                <VStack spacing={1}>
                  <Heading size="sm" textAlign="center" color="gray.800">{product.Description || product.Category}</Heading>
                  <Text fontSize="xs" fontWeight="800" color="orange.500" textTransform="uppercase">{product.Category}</Text>
                </VStack>

                <Box w="220px" h="220px">
                  <DoughnutChart product={product} />
                </Box>

                <Divider borderColor="gray.200" />

                <FormControl>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase">Configure Intake</Text>
                    <HStack w="full">
                      <Input
                        value={serving}
                        onChange={({ target: { value } }) => setServing(+value)}
                        type="number"
                        bg="white"
                        borderRadius="xl"
                        textAlign="center"
                        fontWeight="900"
                        h="50px"
                        fontSize="lg"
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="800" color="gray.700">Servings</Text>
                        <Text fontSize="xs" fontWeight="600" color="gray.400">Standard unit</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </FormControl>

                <Button
                  onClick={handleAddItem}
                  w="full"
                  h="60px"
                  colorScheme="orange"
                  borderRadius="2xl"
                  fontSize="md"
                  fontWeight="900"
                  boxShadow="0 10px 20px -5px rgba(249, 115, 22, 0.4)"
                  _active={{ transform: 'scale(0.98)' }}
                >
                  ADD TO DIARY
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} color="gray.400">
                <Icon as={MdInfoOutline} boxSize={12} />
                <VStack spacing={1}>
                  <Text fontWeight="800">No Food Selected</Text>
                  <Text fontSize="xs" textAlign="center">Select an item from the search results to see nutritional composition</Text>
                </VStack>
              </VStack>
            )}
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default AddItemWindow
