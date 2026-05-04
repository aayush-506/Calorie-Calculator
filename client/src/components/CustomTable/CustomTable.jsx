import { Box, Image, Text, Flex, Badge, Icon, VStack, HStack, Button } from '@chakra-ui/react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../../redux/diary/diary.actions'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdRestaurantMenu, MdOutlineFastfood } from 'react-icons/md'

const CustomTable = ({ limit }) => {
  const { foodItemsInList, loading, error } = useSelector(
    (store) => store.diary,
  )
  const {
    data: { token },
  } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  // Reverse items to show newest first, then limit if requested
  const items = foodItemsInList ? [...foodItemsInList].reverse() : []
  const displayedItems = limit ? items.slice(0, limit) : items

  if (items.length === 0) {
    return (
      <Box 
        w="full" 
        py={16} 
        bg="white" 
        borderRadius="2xl" 
        borderWidth="1px" 
        borderColor="gray.100" 
        textAlign="center"
        boxShadow="sm"
      >
        <VStack spacing={4}>
          <Flex w={20} h={20} bg="orange.50" borderRadius="full" align="center" justify="center">
            <Icon as={MdOutlineFastfood} boxSize={10} color="orange.400" />
          </Flex>
          <VStack spacing={1}>
            <Text fontWeight="800" fontSize="xl" color="gray.800">Your diary is empty</Text>
            <Text color="gray.500" fontWeight="600">Start logging your meals to see nutrition analysis</Text>
          </VStack>
        </VStack>
      </Box>
    )
  }

  return (
    <Box w="full" bg="white" borderRadius="2xl" overflow="hidden" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
      <Box overflowX="auto">
        <Box as="table" w="full">
          <Box as="thead" bg="gray.50" borderBottomWidth="1px" borderColor="gray.100">
            <Box as="tr">
              <Box as="th" px={6} py={4} textAlign="left" fontSize="xs" fontWeight="900" color="gray.500" textTransform="uppercase" letterSpacing="1px">Description</Box>
              <Box as="th" px={6} py={4} textAlign="center" fontSize="xs" fontWeight="900" color="gray.500" textTransform="uppercase" letterSpacing="1px">Servings</Box>
              <Box as="th" px={6} py={4} textAlign="right" fontSize="xs" fontWeight="900" color="gray.500" textTransform="uppercase" letterSpacing="1px">Energy</Box>
              <Box as="th" px={6} py={4} textAlign="right"></Box>
            </Box>
          </Box>
          <Box as="tbody">
            {displayedItems.map((item, ind) => {
              const { totalEnergy, _id, servings, product } = item
              const Description = product?.Description ?? '—'
              return (
                <Box as="tr" key={_id || ind} _hover={{ bg: 'orange.50' }} borderBottomWidth="1px" borderColor="gray.50" transition="background 0.2s">
                  <Box as="td" px={6} py={4}>
                    <HStack spacing={4}>
                      <Flex w={10} h={10} bg="gray.50" borderRadius="xl" align="center" justify="center">
                        <Icon as={MdRestaurantMenu} color="orange.400" />
                      </Flex>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="800" color="gray.800" fontSize="sm">{Description}</Text>
                        <Badge colorScheme="orange" variant="subtle" fontSize="9px" borderRadius="full">Logged</Badge>
                      </VStack>
                    </HStack>
                  </Box>
                  <Box as="td" px={6} py={4} textAlign="center">
                    <Text fontWeight="700" color="gray.600" fontSize="sm">{servings}</Text>
                  </Box>
                  <Box as="td" px={6} py={4} textAlign="right">
                    <Text fontWeight="900" color="gray.800" fontSize="sm">{totalEnergy.toFixed(1)} <Text as="span" color="gray.400" fontSize="xs" fontWeight="700">kcal</Text></Text>
                  </Box>
                  <Box as="td" px={6} py={4} textAlign="right">
                    <Button 
                      variant="ghost" 
                      colorScheme="red" 
                      size="sm" 
                      onClick={() => dispatch(deleteItem(_id, token))}
                      _hover={{ bg: 'red.50' }}
                    >
                      <Icon as={RiDeleteBin6Line} />
                    </Button>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
      <Box bg="gray.50" p={4} borderTopWidth="1px" borderColor="gray.100">
        <HStack justify="space-between">
          <Text fontSize="xs" fontWeight="700" color="gray.500">
            {limit ? `Showing latest ${displayedItems.length} of ${items.length} items` : `${items.length} items logged today`}
          </Text>
          <Text fontSize="sm" fontWeight="900" color="gray.800">
            {limit ? `Today's Total: ${items.reduce((acc, curr) => acc + curr.totalEnergy, 0).toFixed(0)} kcal` : `Total: ${items.reduce((acc, curr) => acc + curr.totalEnergy, 0).toFixed(0)} kcal`}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default CustomTable
