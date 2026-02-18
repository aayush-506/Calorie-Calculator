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
import { AiOutlineSearch, AiTwotoneSetting } from 'react-icons/ai'
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
  calories: 'Calories',
  protein_g: 'Protein (g)',
  total_fat_g: 'Total Fat (g)',
  saturated_fat_g: 'Saturated Fat (g)',
  carbs_g: 'Carbohydrates (g)',
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
      <HStack
        w="full"
        px="12px"
        h="45px"
        boxShadow=" rgba(69, 69, 69, 0.09) 0px 3px 8px, rgba(66, 65, 65, 0.09) 0px 2px 16px"
      >
        <Text fontWeight={600}>Add Food to Diary</Text>
        <Spacer />
        <CloseButton onClick={toggleVisibility} />
      </HStack>
      <HStack
        w="full"
        px={{ base: '10px', lg: '20px' }}
        justifyContent="space-between"
        py="5px"
      >
        <HStack
          w="600px"
          pl="8px"
          h="31px"
          rounded={5}
          spacing={1}
          boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        >
          <AiOutlineSearch />
          <FormControl>
            <Input
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
              h="31px"
              outline="none"
              border="none"
              variant="unstyled"
            />
          </FormControl>
        </HStack>
        <Button
          onClick={() => dispatch(getAllProductToDisplay(query))}
          variant="outline"
          outline="1px solid #e49e60ff"
          h="35px"
        >
          Search
        </Button>
        <AiTwotoneSetting color="grey" fontSize={19} />
      </HStack>
      <HStack w="full" px={{ base: '10px', lg: '20px' }}>
        <Tabs variant="enclosed" w="full">
          <TabList
            boxShadow="rgba(138, 138, 138, 0.24) 0px -3px 4px"
            pt="10px"
            pl="5px"
            h="40px"
          >
            <Tab>All</Tab>
            <Tab>Categories</Tab>
            <Tab>Scan</Tab>
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
              <SearchResultTable />
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={4} py={2}>
                <Box
                  as="label"
                  cursor="pointer"
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  _hover={{ borderColor: 'orange.400', bg: 'gray.50' }}
                  opacity={scanLoading ? 0.7 : 1}
                >
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleScanSubmit}
                    disabled={scanLoading}
                  />
                  <MdCloudUpload size={32} style={{ margin: '0 auto 8px', display: 'block', color: '#c4a574' }} />
                  <Text fontWeight={600} color="gray.600">
                    {scanLoading ? 'Analyzing image…' : 'Upload nutrition label or food image'}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    JPEG, PNG, WebP or GIF (max 5 MB)
                  </Text>
                </Box>
                {scanError && (
                  <Box>
                    <Text color="red.500" fontSize="sm">
                      {scanError}
                    </Text>
                    {scanError.toLowerCase().includes('no nutrition facts found') && (
                      <Text color="gray.500" fontSize="xs" mt={2}>
                        Tip: Use a clear photo of a nutrition label (package or bottle), or a photo of your meal—the app will try to identify the food and estimate nutrition.
                      </Text>
                    )}
                  </Box>
                )}
                {scanImagePreview && (
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={4}
                    w="full"
                    align={{ base: 'center', md: 'flex-start' }}
                  >
                    <Box flexShrink={0}>
                      <Image
                        src={scanImagePreview}
                        alt="Uploaded food"
                        maxH="220px"
                        maxW="280px"
                        objectFit="cover"
                        borderRadius="md"
                        borderWidth={1}
                        borderColor="gray.200"
                        shadow="sm"
                      />
                    </Box>
                    {scanResult && Object.keys(scanResult).length > 0 && (
                      <Box
                        flex={1}
                        borderWidth={1}
                        borderColor="gray.200"
                        borderRadius="md"
                        p={4}
                        bg="gray.50"
                        w="full"
                        minW={0}
                      >
                        <Text fontWeight={700} mb={3} color="gray.700">
                          Extracted nutrition facts
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
                              <HStack key={key} justify="space-between" bg="white" px={3} py={2} borderRadius="md" borderWidth={1} borderColor="gray.100">
                                <Text fontSize="sm" color="gray.600">
                                  {formatKey(key)}
                                </Text>
                                <Text fontSize="sm" fontWeight={600}>
                                  {displayValue}
                                </Text>
                              </HStack>
                            )
                          })}
                        </SimpleGrid>
                      </Box>
                    )}
                  </Flex>
                )}
                {scanResult && Object.keys(scanResult).length > 0 && !scanImagePreview && (
                  <Box
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    p={4}
                    bg="gray.50"
                    w="full"
                  >
                    <Text fontWeight={700} mb={3} color="gray.700">
                      Extracted nutrition facts
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
                          <HStack key={key} justify="space-between" bg="white" px={3} py={2} borderRadius="md" borderWidth={1} borderColor="gray.100">
                            <Text fontSize="sm" color="gray.600">
                              {formatKey(key)}
                            </Text>
                            <Text fontSize="sm" fontWeight={600}>
                              {displayValue}
                            </Text>
                          </HStack>
                        )
                      })}
                    </SimpleGrid>
                  </Box>
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
