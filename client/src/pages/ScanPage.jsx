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
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  Container,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdCloudUpload, MdRestaurant, MdAnalytics, MdChevronRight, MdInfoOutline, MdCameraAlt, MdPhotoLibrary } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { scanNutritionImage } from '../redux/diary/diary.actions'
import AfterLoginPageNavbar from '../components/AfterLoginPageNavbar'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

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

const MACRO_CONFIG = {
  calories: { color: 'orange', label: 'Calories', unit: 'kcal' },
  protein_g: { color: 'green', label: 'Protein', unit: 'g' },
  carbs_g: { color: 'blue', label: 'Carbs', unit: 'g' },
  total_fat_g: { color: 'red', label: 'Fat', unit: 'g' },
}

const ScanPage = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const fileInputRef   = useRef(null)   // gallery upload
  const cameraInputRef = useRef(null)   // camera capture
  const [scanLoading, setScanLoading] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [scanImagePreview, setScanImagePreview] = useState(null)

  const handleFileChange = async (e) => {
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
      if (fileInputRef.current)   fileInputRef.current.value   = ''
      if (cameraInputRef.current) cameraInputRef.current.value = ''
    }
  }

  // Alias for legacy compatibility
  const handleScanSubmit = handleFileChange

  useEffect(() => {
    return () => {
      if (scanImagePreview) URL.revokeObjectURL(scanImagePreview)
    }
  }, [scanImagePreview])

  const hasResults = scanResult && Object.keys(scanResult).filter(k => scanResult[k] != null && scanResult[k] !== '' && k !== 'error').length > 0

  return (
    <Box w="full" minH="100vh" bg="#fafafa" position="relative" overflowX="hidden">
      {/* Mesh Gradient Background */}
      <Box
        position="fixed"
        top="-10%"
        left="-10%"
        w="50%"
        h="50%"
        bg="orange.100"
        filter="blur(120px)"
        opacity={0.4}
        zIndex={0}
        borderRadius="full"
      />
      <Box
        position="fixed"
        bottom="-10%"
        right="-10%"
        w="40%"
        h="40%"
        bg="orange.200"
        filter="blur(120px)"
        opacity={0.3}
        zIndex={0}
        borderRadius="full"
      />

      <VStack w="full" minH="100vh" spacing={0} align="stretch" position="relative" zIndex={1}>
        <AfterLoginPageNavbar currentLink="scan" />

        <Flex 
          flex={1} 
          direction="column" 
          justify={(!scanImagePreview && !scanLoading) ? "center" : "flex-start"}
          align="stretch"
          py={{ base: 4, md: 6 }}
        >
          <Container maxW="1400px" px={{ base: 4, md: 10 }}>
            <VStack spacing={(!scanImagePreview && !scanLoading) ? 8 : 6} align="stretch">
            {/* Header */}
            <VStack spacing={2} textAlign="center">
              <Badge colorScheme="orange" variant="subtle" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="700" letterSpacing="1px">
                AI SCANNER
              </Badge>
              <Heading size="2xl" color="gray.800" fontWeight="900" letterSpacing="-1.5px">
                Snap & Track
              </Heading>
              <Text color="gray.500" fontSize="md" maxW="600px">
                Our AI analyzes your meal instantly. Upload a photo or use your phone camera to get full nutrition facts.
              </Text>
            </VStack>

            {/* Upload Area */}
            <AnimatePresence mode="wait">
              {!scanImagePreview && !scanLoading ? (
                <MotionBox
                  key="upload-zone"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  w="full"
                  bg="white"
                  borderRadius="3xl"
                  p={{ base: 8, md: 12 }}
                  textAlign="center"
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor="orange.200"
                  boxShadow="xl"
                >
                  {/* Hidden file inputs */}
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                  {/* Camera input — triggers rear camera on mobile */}
                  <Input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    hidden
                    onChange={handleFileChange}
                  />

                  <VStack spacing={8}>
                    <MotionBox
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Flex w="20" h="20" borderRadius="2xl" bg="orange.100" align="center" justify="center" shadow="lg">
                        <Icon as={MdAnalytics} boxSize={10} color="orange.500" />
                      </Flex>
                    </MotionBox>

                    <VStack spacing={2}>
                      <Text fontWeight="800" color="gray.800" fontSize="2xl">Identify your food</Text>
                      <Text color="gray.500" fontSize="sm">Choose how you want to scan</Text>
                    </VStack>

                    {/* Two action buttons */}
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="full" maxW="480px">
                      {/* Upload from gallery */}
                      <Flex
                        as="label"
                        htmlFor="gallery-input"
                        cursor="pointer"
                        direction="column"
                        align="center"
                        gap={3}
                        p={6}
                        borderRadius="2xl"
                        borderWidth="1.5px"
                        borderColor="orange.200"
                        bg="orange.50"
                        _hover={{ borderColor: 'orange.400', bg: 'orange.100', transform: 'translateY(-2px)' }}
                        transition="all 0.25s ease"
                        boxShadow="sm"
                      >
                        <Input id="gallery-input" ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
                        <Flex w={12} h={12} borderRadius="xl" bg="orange.200" align="center" justify="center">
                          <Icon as={MdPhotoLibrary} boxSize={6} color="orange.600" />
                        </Flex>
                        <VStack spacing={0.5}>
                          <Text fontWeight="800" color="gray.800" fontSize="sm">Upload Photo</Text>
                          <Text color="gray.500" fontSize="xs">From your gallery</Text>
                        </VStack>
                      </Flex>

                      {/* Take photo with camera */}
                      <Flex
                        as="label"
                        htmlFor="camera-input"
                        cursor="pointer"
                        direction="column"
                        align="center"
                        gap={3}
                        p={6}
                        borderRadius="2xl"
                        borderWidth="1.5px"
                        borderColor="gray.200"
                        bg="gray.50"
                        _hover={{ borderColor: 'gray.400', bg: 'gray.100', transform: 'translateY(-2px)' }}
                        transition="all 0.25s ease"
                        boxShadow="sm"
                      >
                        <Input id="camera-input" ref={cameraInputRef} type="file" accept="image/*" capture="environment" hidden onChange={handleFileChange} />
                        <Flex w={12} h={12} borderRadius="xl" bg="gray.200" align="center" justify="center">
                          <Icon as={MdCameraAlt} boxSize={6} color="gray.600" />
                        </Flex>
                        <VStack spacing={0.5}>
                          <Text fontWeight="800" color="gray.800" fontSize="sm">Take a Photo</Text>
                          <Text color="gray.500" fontSize="xs">Open camera directly</Text>
                        </VStack>
                      </Flex>
                    </SimpleGrid>

                    <Text fontSize="xs" color="gray.400" fontWeight="600">
                      Supports JPEG, PNG, WEBP up to 10MB
                    </Text>
                  </VStack>
                </MotionBox>
              ) : null}
            </AnimatePresence>

            {/* Analysis & Loading State */}
            <AnimatePresence>
              {(scanLoading || scanImagePreview) && (
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  w="full"
                >
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="start">
                    {/* Image Box */}
                    <Box 
                      position="relative" 
                      borderRadius="3xl" 
                      overflow="hidden" 
                      boxShadow="xl" 
                      bg="white" 
                      p={2}
                      h={{ base: "300px", md: "450px" }}
                    >
                      <Image
                        src={scanImagePreview}
                        alt="Preview"
                        w="full"
                        h="full"
                        objectFit="cover"
                        borderRadius="2xl"
                      />
                      {scanLoading && (
                        <>
                          <Box position="absolute" inset={0} bg="blackAlpha.500" backdropFilter="blur(4px)" />
                          <MotionBox
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            h="3px"
                            bgGradient="linear(to-r, transparent, orange.400, transparent)"
                            boxShadow="0 0 20px orange"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            zIndex={2}
                          />
                          <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={4} zIndex={3}>
                            <Spinner size="xl" color="white" thickness="5px" speed="0.7s" />
                            <Text color="white" fontSize="xl" fontWeight="900" letterSpacing="1px">ANALYZING...</Text>
                          </VStack>
                        </>
                      )}
                    </Box>

                    {/* Results Box */}
                    <VStack spacing={6} align="stretch" justify="start">
                      {scanError ? (
                        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} p={6} bg="red.50" borderRadius="3xl" borderLeft="6px solid" borderColor="red.400">
                          <HStack spacing={4}>
                            <Icon as={MdInfoOutline} boxSize={6} color="red.500" />
                            <Text color="red.700" fontWeight="800">{scanError}</Text>
                          </HStack>
                          <Button size="sm" mt={4} colorScheme="red" onClick={() => { setScanImagePreview(null); setScanResult(null); }}>Try Again</Button>
                        </MotionBox>
                      ) : null}

                      {hasResults && (
                        <VStack spacing={6} align="stretch">
                          {/* Food Items Pills */}
                          <Box>
                            <Text fontWeight="900" color="gray.800" mb={3} fontSize="xs" textTransform="uppercase" letterSpacing="1px">Detected Items</Text>
                            <Flex wrap="wrap" gap={2}>
                              {scanResult.food_items?.map((item, idx) => (
                                <Tag key={idx} size="md" py={2} px={4} borderRadius="full" variant="solid" colorScheme="orange">
                                  <TagLeftIcon as={MdRestaurant} />
                                  <TagLabel fontWeight="800">{item}</TagLabel>
                                </Tag>
                              ))}
                            </Flex>
                          </Box>

                          {/* Key Macros Grid */}
                          <SimpleGrid columns={2} spacing={4}>
                            {Object.entries(MACRO_CONFIG).map(([key, config]) => {
                              const val = scanResult[key]
                              if (val == null) return null
                              return (
                                <MotionBox
                                  key={key}
                                  p={4}
                                  bg="white"
                                  borderRadius="2xl"
                                  boxShadow="lg"
                                  border="1px solid"
                                  borderColor="gray.50"
                                >
                                  <Text fontSize="xs" fontWeight="900" color="gray.400" textTransform="uppercase">{config.label}</Text>
                                  <HStack align="baseline" spacing={1}>
                                    <Text fontSize="2xl" fontWeight="900" color={`${config.color}.500`} letterSpacing="-1px">
                                      {typeof val === 'number' ? val.toFixed(0) : val}
                                    </Text>
                                    <Text fontSize="sm" fontWeight="800" color="gray.400">{config.unit}</Text>
                                  </HStack>
                                </MotionBox>
                              )
                            })}
                          </SimpleGrid>

                          {/* Detailed List Glass Card */}
                          <Box
                            bg="rgba(255, 255, 255, 0.8)"
                            backdropFilter="blur(20px)"
                            borderRadius="3xl"
                            p={6}
                            boxShadow="xl"
                            border="1px solid rgba(255, 255, 255, 0.4)"
                          >
                            <VStack spacing={3} align="stretch" maxH="150px" overflowY="auto" pr={2} sx={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { bg: 'orange.200', borderRadius: 'full' } }}>
                              {Object.entries(scanResult).map(([key, value]) => {
                                if (value == null || value === '' || key === 'error' || key === 'food_items' || MACRO_CONFIG[key]) return null
                                return (
                                  <Flex key={key} justify="space-between" align="center" py={1.5} borderBottom="1px solid" borderColor="gray.100">
                                    <Text fontSize="xs" fontWeight="800" color="gray.500">{formatKey(key)}</Text>
                                    <Text fontSize="sm" fontWeight="900" color="gray.800">{value}</Text>
                                  </Flex>
                                )
                              })}
                            </VStack>
                            <Button
                              mt={4}
                              w="full"
                              h="50px"
                              colorScheme="orange"
                              borderRadius="xl"
                              rightIcon={<MdChevronRight />}
                              onClick={() => { setScanImagePreview(null); setScanResult(null); }}
                            >
                              Scan Another
                            </Button>
                          </Box>
                        </VStack>
                      )}
                    </VStack>
                  </SimpleGrid>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </Container>
      </Flex>
    </VStack>
    </Box>
  )
}

export default ScanPage
