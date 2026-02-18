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
      alert('select any product')
      return
    }
    dispatch(addNewProduct({ product: product._id, serving }, token))
    toggleVisibility()
  }

  useEffect(() => {
    if (!query) dispatch(getAllProductToDisplay(query))
  }, [dispatch])

  return (
    <VStack
      w={{ base: '99%', lg: '835px' }}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius={5}
      position="absolute"
      bg="white"
      top="3%"
      left={{ base: '0', lg: '18%' }}
    >
      <HStack w="full" px={4} py={3} borderBottomWidth="1px" borderColor="gray.200" bg="white">
        <Text fontWeight={600} color="gray.800">Add Food to Diary</Text>
        <Spacer />
        <CloseButton onClick={toggleVisibility} size="sm" />
      </HStack>
      <HStack
        w="full"
        px={{ base: 3, lg: 5 }}
        py={2}
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderColor="gray.100"
      >
        <HStack flex={1} maxW="400px" px={2} py={1} rounded="md" borderWidth="1px" borderColor="gray.200" bg="gray.50">
          <AiOutlineSearch color="gray.500" />
          <FormControl>
            <Input
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
              size="sm"
              placeholder="Search food..."
              variant="unstyled"
            />
          </FormControl>
        </HStack>
        <Button
          size="sm"
          onClick={() => dispatch(getAllProductToDisplay(query))}
          colorScheme="orange"
          variant="outline"
        >
          Search
        </Button>
      </HStack>
      <HStack w="full" px={{ base: 3, lg: 5 }} align="stretch">
        <Tabs variant="enclosed" w="full">
          <TabList borderBottom="none" gap={1}>
            <Tab _selected={{ borderColor: 'orange.400', borderBottomColor: 'white', mb: '-1px' }}>All</Tab>
            <Tab _selected={{ borderColor: 'orange.400', borderBottomColor: 'white', mb: '-1px' }}>Categories</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SearchResultTable
                allFoodItems={allFoodItems}
                handleClickProduct={handleClickProduct}
              />
              <Stack
                m="auto"
                w="full"
                align="center"
                justify="center"
                mt="9px"
                spacing={7}
                direction={{ base: 'column', lg: 'row' }}
              >
                <Box>{product && <DoughnutChart product={product} />}</Box>
                <Text
                  textAlign="center"
                  w="full"
                  h="30px"
                  fontWeight="600"
                  color="orange.500"
                >
                  {product.Category || 'Add Product'}
                </Text>
                <HStack w="full" justifyContent="center" align="center">
                  <Text w="60px" fontSize={11}>
                    Enter servings
                  </Text>
                  <FormControl w="60px" h="30px">
                    <Input
                      value={serving}
                      onChange={({ target: { value } }) => setServing(+value)}
                      type="number"
                    />
                  </FormControl>
                </HStack>
                <Button
                  onClick={handleAddItem}
                  h="40px"
                  variant="outline"
                  borderColor="orange.700"
                  w="160px"
                >
                  Add Item
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <SearchResultTable
                allFoodItems={allFoodItems}
                handleClickProduct={handleClickProduct}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </VStack>
  )
}

export default AddItemWindow
