import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  SimpleGrid,
  useToast,
  Icon,
  Divider,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdCloudUpload, MdRestaurant } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { scanNutritionImage } from '../redux/diary/diary.actions'
import AfterLoginPageNavbar from '../components/AfterLoginPageNavbar'

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

const HIGHLIGHT_KEYS = ['calories', 'protein_g', 'carbs_g', 'total_fat_g']

const ScanPage = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const fileInputRef = useRef(null)
  const [scanLoading, setScanLoading] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [scanImagePreview, setScanImagePreview] = useState(null)

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
    return () => {
      if (scanImagePreview) URL.revokeObjectURL(scanImagePreview)
    }
  }, [scanImagePreview])

  const hasResults = scanResult && Object.keys(scanResult).filter(k => scanResult[k] != null && scanResult[k] !== '' && k !== 'error').length > 0

  return (
    <VStack w="full" minH="100vh" bg="gray.50" spacing={0} align="stretch">
      <AfterLoginPageNavbar currentLink="scan" />

      <Box w="full" bg="white" borderBottomWidth="1px" borderColor="gray.100" py={8} px={4}>
        <Box maxW="800px" mx="auto" textAlign="center">
          <HStack justify="center" spacing={3} mb={2}>
            <Icon as={MdRestaurant} boxSize={8} color="orange.400" />
            <Heading size="lg" color="gray.800" fontWeight="700">
              Scan food
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="md">
            Upload a photo of your meal or a nutrition label to see calories and nutrients
          </Text>
        </Box>
      </Box>

      <Box maxW="800px" w="full" mx="auto" p={6}>
        <VStack align="stretch" spacing={6}>
          <Box
            as="label"
            cursor={scanLoading ? 'wait' : 'pointer'}
            w="full"
            borderRadius="2xl"
            p={12}
            textAlign="center"
            bg="white"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="gray.200"
            boxShadow="sm"
            transition="all 0.25s ease"
            _hover={!scanLoading ? {
              borderColor: 'orange.300',
              bg: 'orange.50',
              boxShadow: 'md',
              transform: 'translateY(-2px)',
            } : {}}
            opacity={scanLoading ? 0.85 : 1}
          >
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleScanSubmit}
              disabled={scanLoading}
            />
            {scanLoading ? (
              <VStack spacing={4}>
                <Spinner size="xl" color="orange.400" thickness="3px" />
                <Text fontWeight="600" color="gray.700" fontSize="lg">
                  Analyzing your image…
                </Text>
                <Text fontSize="sm" color="gray.500">
                  This usually takes a few seconds
                </Text>
              </VStack>
            ) : (
              <VStack spacing={3}>
                <Flex
                  w="20"
                  h="20"
                  borderRadius="full"
                  bg="orange.50"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdCloudUpload} boxSize={10} color="orange.400" />
                </Flex>
                <Text fontWeight="600" color="gray.800" fontSize="lg">
                  Drop your image here or click to upload
                </Text>
                <Text fontSize="sm" color="gray.500">
                  JPEG, PNG, WebP or GIF · max 5 MB
                </Text>
              </VStack>
            )}
          </Box>

          {scanError && (
            <Box
              w="full"
              p={4}
              borderRadius="xl"
              bg="red.50"
              borderWidth="1px"
              borderColor="red.100"
            >
              <Text color="red.700" fontSize="sm" fontWeight="500">
                {scanError}
              </Text>
              {scanError.toLowerCase().includes('no nutrition facts found') && (
                <Text color="red.600" fontSize="xs" mt={2} opacity={0.9}>
                  Try a clearer photo of your meal or the product&apos;s nutrition label.
                </Text>
              )}
            </Box>
          )}

          {(scanImagePreview || hasResults) && (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={8}
              w="full"
              align={{ base: 'center', md: 'flex-start' }}
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.100"
            >
              {scanImagePreview && (
                <Box flexShrink={0} position="relative">
                  <Box
                    position="absolute"
                    top={2}
                    left={2}
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg="blackAlpha.600"
                    color="white"
                    fontSize="xs"
                    fontWeight="500"
                  >
                    Your photo
                  </Box>
                  <Image
                    src={scanImagePreview}
                    alt="Your food"
                    maxH="300px"
                    maxW="340px"
                    objectFit="cover"
                    borderRadius="xl"
                    boxShadow="lg"
                  />
                </Box>
              )}
              {hasResults && (
                <Box flex={1} minW={0} w="full">
                  <Heading size="sm" mb={4} color="gray.800" fontWeight="700">
                    Nutrition facts
                  </Heading>
                  <Divider borderColor="gray.200" mb={4} />
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                    {Object.entries(scanResult).map(([key, value]) => {
                      if (value == null || value === '' || key === 'error') return null
                      const displayValue = Array.isArray(value)
                        ? value.join(', ')
                        : typeof value === 'number'
                          ? (Number.isInteger(value) ? value : value.toFixed(1))
                          : String(value)
                      const isHighlight = HIGHLIGHT_KEYS.includes(key)
                      return (
                        <HStack
                          key={key}
                          justify="space-between"
                          px={4}
                          py={3}
                          borderRadius="xl"
                          bg={isHighlight ? 'orange.50' : 'gray.50'}
                          borderWidth="1px"
                          borderColor={isHighlight ? 'orange.100' : 'gray.100'}
                          _hover={{ bg: isHighlight ? 'orange.100' : 'gray.100' }}
                          transition="background 0.2s"
                        >
                          <Text
                            fontSize="sm"
                            color={isHighlight ? 'gray.700' : 'gray.600'}
                            fontWeight={isHighlight ? 600 : 500}
                          >
                            {formatKey(key)}
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="700"
                            color={isHighlight ? 'orange.700' : 'gray.800'}
                          >
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
        </VStack>
      </Box>
    </VStack>
  )
}

export default ScanPage
