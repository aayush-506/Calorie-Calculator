import { HStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ProgressCircle from '../ProgressCircle'
import { nutrientsData } from './data'

const CircularProgressDisplayer = () => {
  const { foodItemsInList } = useSelector((store) => store.diary)
  const items = nutrientsData(foodItemsInList)
  return (
    <HStack
      w="full"
      py={3}
      px={2}
      flexWrap="wrap"
      justify="space-evenly"
      gap={2}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      bg="gray.50"
    >
      <ProgressCircle value={items.calcium} name="Calcium" />
      <ProgressCircle value={items.iron} name="Iron" />
      <ProgressCircle value={items.magnesium} name="Magnesium" />
      <ProgressCircle value={items.sodium} name="Sodium" />
      <ProgressCircle value={items.vitaminA} name="VitaminA" />
      <ProgressCircle value={items.fiber} name="Fiber" />
      <ProgressCircle value={items.protein} name="Protein" />
      <ProgressCircle value={items.cholesterol} name="Cholesterol" />
    </HStack>
  )
}

export default CircularProgressDisplayer
