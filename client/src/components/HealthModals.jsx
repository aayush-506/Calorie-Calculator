import React, { useState, useEffect } from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Box, VStack, HStack, Text, Button, Input, Select, SimpleGrid,
  Icon, Flex, Badge, Heading, Textarea, Divider, useToast,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react'
import {
  MdFitnessCenter, MdDirectionsRun, MdPool, MdDirectionsBike,
  MdSelfImprovement, MdSportsBasketball, MdDelete, MdAdd,
} from 'react-icons/md'
import { GiWeightScale, GiBodyHeight } from 'react-icons/gi'
import { RiHeartPulseLine, RiMentalHealthLine } from 'react-icons/ri'
import { BiNotepad, BiHappy, BiMeh, BiSad } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import {
  addExercise, deleteExercise, fetchExercises,
  addBiometric, fetchBiometrics,
  addNote, deleteNote, fetchNotes,
} from '../redux/health/health'

/* ─── CalMET lookup table (calories burned per min per kg for 70kg avg) ─── */
const EXERCISES = [
  { name: 'Running',       icon: MdDirectionsRun,    met: 9.8  },
  { name: 'Walking',       icon: MdDirectionsRun,    met: 3.5  },
  { name: 'Cycling',       icon: MdDirectionsBike,   met: 7.5  },
  { name: 'Swimming',      icon: MdPool,              met: 8.0  },
  { name: 'Weight Training', icon: MdFitnessCenter,  met: 5.0  },
  { name: 'Yoga',          icon: MdSelfImprovement,  met: 3.0  },
  { name: 'Basketball',    icon: MdSportsBasketball,  met: 8.0  },
  { name: 'HIIT',          icon: MdFitnessCenter,    met: 12.0 },
]

const calcCalories = (met, mins, weight = 70) =>
  Math.round((met * weight * mins) / 60)

const MOODS = [
  { label: 'great', icon: BiHappy,  color: 'green'  },
  { label: 'good',  icon: BiHappy,  color: 'teal'   },
  { label: 'okay',  icon: BiMeh,    color: 'yellow' },
  { label: 'bad',   icon: BiSad,    color: 'red'    },
]

/* ════════════════════════════════════════════════════════ */

// ── 1. ADD EXERCISE MODAL ─────────────────────────────────
export const ExerciseModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const token = useSelector(s => s.auth.data.token)
  const { exercises, loading } = useSelector(s => s.health)

  const [selected, setSelected] = useState(null)
  const [duration, setDuration] = useState(30)
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    if (isOpen) dispatch(fetchExercises(token))
  }, [isOpen])

  const calories = selected ? calcCalories(selected.met, duration) : 0

  const handleAdd = async () => {
    if (!selected) return toast({ title: 'Pick an exercise first', status: 'warning' })
    setSaving(true)
    await dispatch(addExercise({
      exercise: selected.name,
      durationMins: duration,
      caloriesBurned: calories,
    }, token))
    setSaving(false)
    setSelected(null)
    setDuration(30)
    toast({ title: `${selected.name} logged!`, description: `~${calories} kcal burned`, status: 'success', duration: 3000 })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.100">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.50">
          <HStack spacing={3}>
            <Flex w={9} h={9} bg="green.100" borderRadius="xl" align="center" justify="center">
              <Icon as={MdFitnessCenter} color="green.600" boxSize={5} />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontWeight="900" fontSize="md" color="gray.800">Log Exercise</Text>
              <Text fontSize="xs" color="gray.500" fontWeight="600">Track your workout to offset calories</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Exercise grid */}
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={3}>
                Select Exercise
              </Text>
              <SimpleGrid columns={4} spacing={3}>
                {EXERCISES.map(ex => (
                  <Flex
                    key={ex.name}
                    direction="column"
                    align="center"
                    gap={2}
                    p={3}
                    borderRadius="xl"
                    borderWidth="1.5px"
                    borderColor={selected?.name === ex.name ? 'green.400' : 'gray.100'}
                    bg={selected?.name === ex.name ? 'green.50' : 'white'}
                    cursor="pointer"
                    onClick={() => setSelected(ex)}
                    _hover={{ borderColor: 'green.300', bg: 'green.50' }}
                    transition="all 0.2s"
                  >
                    <Flex w={10} h={10} borderRadius="xl" bg={selected?.name === ex.name ? 'green.100' : 'gray.50'} align="center" justify="center">
                      <Icon as={ex.icon} color={selected?.name === ex.name ? 'green.600' : 'gray.400'} boxSize={5} />
                    </Flex>
                    <Text fontSize="10px" fontWeight="800" color="gray.700" textAlign="center">{ex.name}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            {/* Duration slider */}
            <Box>
              <HStack justify="space-between" mb={3}>
                <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px">Duration</Text>
                <Badge colorScheme="green" borderRadius="full" px={3}>{duration} mins</Badge>
              </HStack>
              <Slider value={duration} min={5} max={120} step={5} onChange={setDuration}>
                <SliderTrack bg="gray.100"><SliderFilledTrack bg="green.400" /></SliderTrack>
                <SliderThumb boxSize={5} borderColor="green.400" />
              </Slider>
            </Box>

            {/* Calorie preview */}
            {selected && (
              <HStack bg="green.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="green.100">
                <Icon as={RiHeartPulseLine} color="green.500" boxSize={6} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="green.700" fontWeight="700">{selected.name} for {duration} mins</Text>
                  <Text fontSize="xl" fontWeight="900" color="green.700">≈ {calories} kcal burned</Text>
                </VStack>
              </HStack>
            )}

            <Button colorScheme="green" borderRadius="full" isLoading={saving} onClick={handleAdd} leftIcon={<MdAdd />}>
              Log Exercise
            </Button>

            <Divider />

            {/* Exercise history */}
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={3}>Today's Activity</Text>
              <VStack spacing={2} align="stretch">
                {exercises.length === 0 ? (
                  <Text fontSize="sm" color="gray.400" textAlign="center" py={4}>No exercises logged yet today</Text>
                ) : exercises.slice(0, 5).map(ex => (
                  <HStack key={ex._id} justify="space-between" p={3} bg="gray.50" borderRadius="xl">
                    <HStack>
                      <Badge colorScheme="green" borderRadius="full">{ex.exercise}</Badge>
                      <Text fontSize="xs" color="gray.500">{ex.durationMins} mins</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="800" color="green.600" fontSize="sm">-{ex.caloriesBurned} kcal</Text>
                      <Button size="xs" variant="ghost" colorScheme="red" onClick={() => dispatch(deleteExercise(ex._id, token))}>
                        <Icon as={MdDelete} />
                      </Button>
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

/* ════════════════════════════════════════════════════════ */

// ── 2. BIOMETRICS MODAL ───────────────────────────────────
export const BiometricModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const token = useSelector(s => s.auth.data.token)
  const { biometrics, loading } = useSelector(s => s.health)

  const [form, setForm] = useState({ weight: '', height: '', systolic: '', diastolic: '', heartRate: '', bodyFat: '', waist: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) dispatch(fetchBiometrics(token))
  }, [isOpen])

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const bmi = form.weight && form.height
    ? ((form.weight / Math.pow(form.height / 100, 2)).toFixed(1))
    : null

  const handleSave = async () => {
    setSaving(true)
    await dispatch(addBiometric({ ...form, bmi }, token))
    setSaving(false)
    setForm({ weight: '', height: '', systolic: '', diastolic: '', heartRate: '', bodyFat: '', waist: '' })
    toast({ title: 'Biometrics saved!', status: 'success', duration: 2000 })
  }

  const FIELDS = [
    { key: 'weight',    label: 'Weight (kg)',         icon: GiWeightScale,    color: 'blue'   },
    { key: 'height',    label: 'Height (cm)',          icon: GiBodyHeight,     color: 'purple' },
    { key: 'systolic',  label: 'Systolic BP (mmHg)',   icon: RiHeartPulseLine, color: 'red'    },
    { key: 'diastolic', label: 'Diastolic BP (mmHg)',  icon: RiHeartPulseLine, color: 'red'    },
    { key: 'heartRate', label: 'Heart Rate (bpm)',      icon: RiHeartPulseLine, color: 'orange' },
    { key: 'bodyFat',   label: 'Body Fat (%)',          icon: RiMentalHealthLine, color: 'teal' },
    { key: 'waist',     label: 'Waist (cm)',            icon: GiBodyHeight,     color: 'pink'   },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.100">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.50">
          <HStack spacing={3}>
            <Flex w={9} h={9} bg="red.100" borderRadius="xl" align="center" justify="center">
              <Icon as={RiHeartPulseLine} color="red.600" boxSize={5} />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontWeight="900" fontSize="md" color="gray.800">Log Biometrics</Text>
              <Text fontSize="xs" color="gray.500" fontWeight="600">Track your body measurements & vitals</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={2} spacing={4}>
              {FIELDS.map(f => (
                <Box key={f.key}>
                  <HStack mb={1}>
                    <Icon as={f.icon} color={`${f.color}.400`} boxSize={4} />
                    <Text fontSize="xs" fontWeight="700" color="gray.600">{f.label}</Text>
                  </HStack>
                  <Input
                    type="number"
                    placeholder="—"
                    value={form[f.key]}
                    onChange={set(f.key)}
                    borderRadius="xl"
                    size="sm"
                    focusBorderColor={`${f.color}.400`}
                  />
                </Box>
              ))}
            </SimpleGrid>

            {bmi && (
              <HStack bg="blue.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="blue.100" justify="space-between">
                <Text fontWeight="700" color="blue.700">Calculated BMI</Text>
                <Badge
                  colorScheme={bmi < 18.5 ? 'blue' : bmi < 25 ? 'green' : bmi < 30 ? 'yellow' : 'red'}
                  fontSize="lg" px={4} py={1} borderRadius="full"
                >
                  {bmi} — {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
                </Badge>
              </HStack>
            )}

            <Button colorScheme="red" borderRadius="full" isLoading={saving} onClick={handleSave} leftIcon={<MdAdd />}>
              Save Biometrics
            </Button>

            <Divider />

            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={3}>Recent Entries</Text>
              <VStack spacing={2} align="stretch">
                {biometrics.length === 0 ? (
                  <Text fontSize="sm" color="gray.400" textAlign="center" py={4}>No biometric data yet</Text>
                ) : biometrics.slice(0, 3).map(b => (
                  <SimpleGrid key={b._id} columns={4} spacing={2} p={3} bg="gray.50" borderRadius="xl">
                    <Box><Text fontSize="9px" color="gray.400">Date</Text><Text fontSize="sm" fontWeight="700">{b.date}</Text></Box>
                    {b.weight  && <Box><Text fontSize="9px" color="gray.400">Weight</Text><Text fontSize="sm" fontWeight="700">{b.weight} kg</Text></Box>}
                    {b.bmi     && <Box><Text fontSize="9px" color="gray.400">BMI</Text><Text fontSize="sm" fontWeight="700">{b.bmi}</Text></Box>}
                    {b.heartRate && <Box><Text fontSize="9px" color="gray.400">HR</Text><Text fontSize="sm" fontWeight="700">{b.heartRate} bpm</Text></Box>}
                  </SimpleGrid>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

/* ════════════════════════════════════════════════════════ */

// ── 3. NOTES MODAL ────────────────────────────────────────
export const NotesModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const token = useSelector(s => s.auth.data.token)
  const { notes } = useSelector(s => s.health)

  const [text, setText]   = useState('')
  const [mood, setMood]   = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen) dispatch(fetchNotes(token))
  }, [isOpen])

  const handleSave = async () => {
    if (!text.trim()) return toast({ title: 'Write a note first', status: 'warning' })
    setSaving(true)
    await dispatch(addNote({ text, mood }, token))
    setSaving(false)
    setText('')
    setMood('')
    toast({ title: 'Note saved!', status: 'success', duration: 2000 })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent borderRadius="2xl" border="1px solid" borderColor="gray.100">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.50">
          <HStack spacing={3}>
            <Flex w={9} h={9} bg="blue.100" borderRadius="xl" align="center" justify="center">
              <Icon as={BiNotepad} color="blue.600" boxSize={5} />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontWeight="900" fontSize="md" color="gray.800">Daily Notes</Text>
              <Text fontSize="xs" color="gray.500" fontWeight="600">Log how you feel, meals, or health observations</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={5} align="stretch">
            {/* Mood selector */}
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={3}>How do you feel today?</Text>
              <HStack spacing={3}>
                {MOODS.map(m => (
                  <Flex
                    key={m.label}
                    direction="column"
                    align="center"
                    gap={1}
                    p={3}
                    flex={1}
                    borderRadius="xl"
                    borderWidth="1.5px"
                    borderColor={mood === m.label ? `${m.color}.400` : 'gray.100'}
                    bg={mood === m.label ? `${m.color}.50` : 'white'}
                    cursor="pointer"
                    onClick={() => setMood(mood === m.label ? '' : m.label)}
                    _hover={{ borderColor: `${m.color}.300`, bg: `${m.color}.50` }}
                    transition="all 0.2s"
                  >
                    <Icon as={m.icon} color={mood === m.label ? `${m.color}.500` : 'gray.400'} boxSize={6} />
                    <Text fontSize="10px" fontWeight="800" color="gray.600" textTransform="capitalize">{m.label}</Text>
                  </Flex>
                ))}
              </HStack>
            </Box>

            {/* Text area */}
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={2}>Your Note</Text>
              <Textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="E.g. Felt tired today, drank 2L water, had a great workout..."
                rows={5}
                borderRadius="xl"
                focusBorderColor="blue.400"
                resize="none"
              />
            </Box>

            <Button colorScheme="blue" borderRadius="full" isLoading={saving} onClick={handleSave} leftIcon={<MdAdd />}>
              Save Note
            </Button>

            <Divider />

            {/* Notes history */}
            <Box>
              <Text fontSize="xs" fontWeight="800" color="gray.500" textTransform="uppercase" letterSpacing="1px" mb={3}>Previous Notes</Text>
              <VStack spacing={3} align="stretch">
                {notes.length === 0 ? (
                  <Text fontSize="sm" color="gray.400" textAlign="center" py={4}>No notes yet</Text>
                ) : notes.slice(0, 5).map(n => (
                  <Box key={n._id} p={4} bg="gray.50" borderRadius="xl" borderLeft="4px solid" borderColor="blue.300">
                    <HStack justify="space-between" mb={1}>
                      <HStack>
                        <Text fontSize="xs" color="gray.400" fontWeight="700">{n.date}</Text>
                        {n.mood && <Badge colorScheme={MOODS.find(m => m.label === n.mood)?.color || 'gray'} borderRadius="full" fontSize="9px" textTransform="capitalize">{n.mood}</Badge>}
                      </HStack>
                      <Button size="xs" variant="ghost" colorScheme="red" onClick={() => dispatch(deleteNote(n._id, token))}>
                        <Icon as={MdDelete} />
                      </Button>
                    </HStack>
                    <Text fontSize="sm" color="gray.700" fontWeight="600" noOfLines={3}>{n.text}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
