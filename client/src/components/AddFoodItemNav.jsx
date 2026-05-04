import { HStack, Icon, Box, Text, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaWalking } from 'react-icons/fa'
import { GiHealthNormal } from 'react-icons/gi'
import { BiNotepad } from 'react-icons/bi'
import { MdRestaurantMenu } from 'react-icons/md'
import { ExerciseModal, BiometricModal, NotesModal } from './HealthModals'

const AddFoodItem = ({ toggleVisibility }) => {
  const exerciseDisc  = useDisclosure()
  const biometricDisc = useDisclosure()
  const notesDisc     = useDisclosure()

  const actions = [
    { label: 'ADD FOOD',       icon: MdRestaurantMenu, color: 'orange', onClick: toggleVisibility },
    { label: 'ADD EXERCISE',   icon: FaWalking,         color: 'green',  onClick: exerciseDisc.onOpen  },
    { label: 'ADD BIOMETRICS', icon: GiHealthNormal,    color: 'red',    onClick: biometricDisc.onOpen },
    { label: 'ADD NOTES',      icon: BiNotepad,          color: 'blue',   onClick: notesDisc.onOpen     },
  ]

  return (
    <>
      <HStack w="full" spacing={3} flexWrap="wrap">
        {actions.map((action, idx) => (
          <Flex
            key={idx}
            as="button"
            onClick={action.onClick}
            align="center"
            px={4}
            py={2.5}
            bg="white"
            borderRadius="full"
            borderWidth="1px"
            borderColor="gray.100"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{
              bg: `${action.color}.50`,
              borderColor: `${action.color}.200`,
              transform: 'translateY(-1px)',
              boxShadow: 'md',
            }}
            _active={{ transform: 'translateY(0)' }}
          >
            <Flex
              w={6}
              h={6}
              bg={`${action.color}.100`}
              borderRadius="full"
              align="center"
              justify="center"
              mr={3}
            >
              <Icon as={action.icon} color={`${action.color}.500`} boxSize={3.5} />
            </Flex>
            <Text fontSize="xs" fontWeight="800" color="gray.700" letterSpacing="0.5px">
              {action.label}
            </Text>
          </Flex>
        ))}
      </HStack>

      {/* Modals */}
      <ExerciseModal  isOpen={exerciseDisc.isOpen}  onClose={exerciseDisc.onClose}  />
      <BiometricModal isOpen={biometricDisc.isOpen} onClose={biometricDisc.onClose} />
      <NotesModal     isOpen={notesDisc.isOpen}     onClose={notesDisc.onClose}     />
    </>
  )
}

export default AddFoodItem
