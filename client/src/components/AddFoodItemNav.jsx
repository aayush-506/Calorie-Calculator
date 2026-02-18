import { HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaWalking } from 'react-icons/fa'
import { GiHealthNormal } from 'react-icons/gi'
import { BiNotepad } from 'react-icons/bi'

const AddFoodItem = ({ toggleVisibility }) => {
  const buttonProps = {
    padding: '8px 12px',
    borderRadius: 'md',
    fontSize: { base: 'xs', md: 'sm' },
    fontWeight: 'bold',
    color: 'gray.600',
    _hover: { bg: 'gray.100' },
    borderWidth: '1px',
    borderColor: 'gray.200',
    bg: 'white',
  }
  return (
    <HStack w="full" spacing={2} flexWrap="wrap">
      <HStack {...buttonProps} cursor="pointer" onClick={toggleVisibility} as="button" type="button">
        <Image src="/Images/appleImage.png" w="14px" alt="" />
        <Text>ADD ITEM</Text>
      </HStack>
      <HStack {...buttonProps} cursor="pointer" as="button" type="button">
        <FaWalking color="green" fontSize={14} />
        <Text>ADD EXERCISE</Text>
      </HStack>
      <HStack {...buttonProps} cursor="pointer" as="button" type="button">
        <GiHealthNormal color="red" fontSize={14} />
        <Text>ADD BIOMETRICS</Text>
      </HStack>
      <HStack {...buttonProps} cursor="pointer" as="button" type="button">
        <BiNotepad color="blue" fontSize={14} />
        <Text>ADD NOTES</Text>
      </HStack>
    </HStack>
  )
}

export default AddFoodItem
