import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { TableWrapper } from './cumstomTable.styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../../redux/diary/diary.actions'
import { RiDeleteBack2Fill } from 'react-icons/ri'

const CustomTable = () => {
  const { foodItemsInList, loading, error } = useSelector(
    (store) => store.diary,
  )
  const {
    data: { token },
  } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const items = foodItemsInList || []

  return (
    <Box w="full" borderRadius="md" borderWidth="1px" borderColor="gray.200" overflow="hidden">
      <TableWrapper>
        <thead>
          <tr>
            <th>Description</th>
            <th>Servings</th>
            <th>Energy (kcal)</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '24px', color: '#718096' }}>
                No items yet. Click ADD ITEM to log food.
              </td>
            </tr>
          ) : items.map(
            (item, ind) => {
              const { totalEnergy, _id, servings, product } = item
              const Description = product?.Description ?? '—'
              if (loading) {
                return (
                  <tr key={ind}><td colSpan={3} style={{ textAlign: 'center', padding: '12px' }}>Loading…</td></tr>
                )
              }
              if (error) {
                return (
                  <tr key={ind}><td colSpan={3} style={{ textAlign: 'center', padding: '12px', color: '#e53e3e' }}>Error loading items.</td></tr>
                )
              }
              return (
                <tr key={ind}>
                  <td style={{ display: 'flex', gap: '5px' }}>
                    <Image w="14px" h="15px" src="/Images/appleImage.png" />
                    <Text mr="10px">{Description}</Text>
                    <RiDeleteBack2Fill
                      color="#b55c5c"
                      size={19}
                      cursor="pointer"
                      onClick={() => {
                        dispatch(deleteItem(_id, token))
                      }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>{servings}</td>
                  <td style={{ textAlign: 'right' }}>
                    {totalEnergy.toFixed(2)}
                  </td>
                </tr>
              )
            },
          )}
        </tbody>
      </TableWrapper>
    </Box>
  )
}

export default CustomTable
