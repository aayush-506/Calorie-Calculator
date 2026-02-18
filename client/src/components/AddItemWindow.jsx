import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  HStack,
  Image,
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
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdCloudUpload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewProduct,
  getAllProductToDisplay,
  scanNutritionImage,
} from '../redux/diary/diary.actions'
import DoughnutChart from './chart/DoughnutChart'
import SearchResultTable from './SearchResultTable/SearchResultTable'

const LABELS = {
  food_items: 'Food items',
  calories: 'Calories',
  protein_g: 'Protein (g)',
  total_fat_g: 'Total Fat (g)',
  saturated_fat_g: 'Saturated Fat (g)',
  carbs_g: 'Carbs (g)',
  fiber_g: 'Fiber (g)',
  sugar_g: 'Sugar (g)',
  sodium_mg: 'Sodium (mg)',
  calcium_mg: 'Calcium (mg)',
  iron_mg: 'Iron (mg)',
  potassium_mg: 'Potassium (mg)',
  vitamin_a_mcg: 'Vitamin A (mcg)',
  vitamin_c_mg: 'Vitamin C (mg)',
  vitamin_d_mcg: 'Vitamin D (mcg)',
  cholesterol_mg: 'Cholesterol (mg)',
  serving_size: 'Serving size',
}

const formatKey = (key) => {
  if (LABELS[key]) return LABELS[key]
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const AddItemWindow = ({ toggleVisibility }) => {
  const { allFoodItems } = useSelector((store) => store.diary)
  const {
    data: { token },
  } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const toast = useToast()
  const fileInputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [serving, setServing] = useState(1)
  const [product, setProduct] = useState('')
  const [scanLoading, setScanLoading] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [scanImagePreview, setScanImagePreview] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

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

  const handleScanSubmit = async (e) => {
    const file = e?.target?.files?.[0]
    if (!file) return
    if (scanImagePreview) URL.revokeObjectURL(scanImagePreview)
    setScanImagePreview(URL.createObjectURL(file))
    setScanError('')
    setScanResult(null)
    setScanLoading(true)
    try {
      const data = await dispatch(scanNutritionImage(file))
      if (data?.error) {
        setScanError(data.error)
        setScanResult(null)
      } else {
        setScanResult(data)
        setScanError('')
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Scan failed'
      setScanError(msg)
      setScanResult(null)
      toast({ title: 'Scan failed', description: msg, status: 'error', isClosable: true })
    } finally {
      setScanLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!query) dispatch(getAllProductToDisplay(query))
  }, [dispatch])

  useEffect(() => {
    return () => {
      if (scanImagePreview) URL.revokeObjectURL(scanImagePreview)
    }
  }, [scanImagePreview])
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
      {activeTab !== 2 && (
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
      )}
      <HStack w="full" px={{ base: 3, lg: 5 }} align="stretch">
        <Tabs variant="enclosed" w="full" index={activeTab} onChange={setActiveTab}>
          <TabList borderBottom="none" gap={1}>
            <Tab _selected={{ borderColor: 'orange.400', borderBottomColor: 'white', mb: '-1px' }}>All</Tab>
            <Tab _selected={{ borderColor: 'orange.400', borderBottomColor: 'white', mb: '-1px' }}>Categories</Tab>
            <Tab _selected={{ borderColor: 'orange.400', borderBottomColor: 'white', mb: '-1px' }}>Scan</Tab>
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
            <TabPanel>
              <VStack align="stretch" spacing={4} py={2}>
                <Box
                  as="label"
                  cursor={scanLoading ? 'wait' : 'pointer'}
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={8}
                  textAlign="center"
                  _hover={!scanLoading ? { borderColor: 'orange.300', bg: 'orange.50' } : {}}
                  opacity={scanLoading ? 0.8 : 1}
                  transition="all 0.2s"
                >
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleScanSubmit}
                    disabled={scanLoading}
                  />
                  <MdCloudUpload size={28} style={{ margin: '0 auto 8px', display: 'block', color: '#dd6b20' }} />
                  <Text fontWeight={600} color="gray.700">
                    {scanLoading ? 'Analyzing…' : 'Upload photo of your food or nutrition label'}
                  </Text>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    JPEG, PNG, WebP, GIF · max 5 MB
                  </Text>
                </Box>
                {scanError && (
                  <Box px={1}>
                    <Text color="red.600" fontSize="sm">{scanError}</Text>
                    {scanError.toLowerCase().includes('no nutrition facts found') && (
                      <Text color="gray.500" fontSize="xs" mt={1}>Try a clearer photo of the meal or the product label.</Text>
                    )}
                  </Box>
                )}
                {(scanImagePreview || (scanResult && Object.keys(scanResult).length > 0)) && (
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={4}
                    w="full"
                    align={{ base: 'center', md: 'flex-start' }}
                  >
                    {scanImagePreview && (
                      <Box flexShrink={0}>
                        <Image
                          src={scanImagePreview}
                          alt="Your food"
                          maxH="200px"
                          maxW="260px"
                          objectFit="cover"
                          borderRadius="lg"
                          borderWidth="1px"
                          borderColor="gray.200"
                        />
                      </Box>
                    )}
                    {scanResult && Object.keys(scanResult).length > 0 && (
                      <Box
                        flex={1}
                        borderRadius="lg"
                        p={4}
                        bg="gray.50"
                        w="full"
                        minW={0}
                        borderWidth="1px"
                        borderColor="gray.100"
                      >
                        <Text fontWeight={600} mb={3} color="gray.800" fontSize="sm">
                          Nutrition
                        </Text>
                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
                          {Object.entries(scanResult).map(([key, value]) => {
                            if (value == null || value === '' || key === 'error') return null
                            const displayValue = Array.isArray(value)
                              ? value.join(', ')
                              : typeof value === 'number'
                                ? (Number.isInteger(value) ? value : value.toFixed(1))
                                : String(value)
                            return (
                              <HStack key={key} justify="space-between" bg="white" px={3} py={2} borderRadius="md" borderWidth="1px" borderColor="gray.100">
                                <Text fontSize="sm" color="gray.600">{formatKey(key)}</Text>
                                <Text fontSize="sm" fontWeight={600} color="gray.800">{displayValue}</Text>
                              </HStack>
                            )
                          })}
                        </SimpleGrid>
                      </Box>
                    )}
                  </Flex>
                )}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </VStack>
  )
}

export default AddItemWindow
