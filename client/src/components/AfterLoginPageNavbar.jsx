import React, { useState, useEffect } from 'react'
import {
  Box, Flex, HStack, Image, Text, Button,
  Icon, Divider, Badge, VStack,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import AfterLoginSideNav from './AfterLoginSideNav'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
  MdDashboard, MdQrCodeScanner, MdMenuBook,
  MdHelp, MdLogout, MdFlashOn, MdAccessTime,
} from 'react-icons/md'
import { RiHeartPulseLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../redux/auth/auth.actions'

const NAV_ITEMS = [
  { to: '/checkCalories',       label: 'Dashboard',  icon: MdDashboard,     key: 'dairy'  },
  { to: '/checkCalories/scan',  label: 'AI Scan',    icon: MdQrCodeScanner, key: 'scan'   },
  { to: '/checkCalories/plan',  label: 'Meal Plans', icon: MdMenuBook,      key: 'plans'  },
  { to: '/checkCalories/help',  label: 'Support',    icon: MdHelp,          key: 'help'   },
]

const CAL_TARGET = 2400

/* ─────────────────────────────────────────── */
const AfterLoginPageNavbar = ({ currentLink }) => {
  const [isActive, setIsActive]   = useState(currentLink)
  const [visible, setVisible]     = useState(false)
  const [now, setNow]             = useState(new Date())
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const { foodItemsInList } = useSelector((s) => s.diary)
  const totalCal  = (foodItemsInList || []).reduce((a, i) => a + (i.totalEnergy || 0), 0)
  const calPct    = Math.min((totalCal / CAL_TARGET) * 100, 100)
  const overBudget = calPct >= 100

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes logo-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(249,115,22,0.25), 0 0 20px rgba(249,115,22,0.1); }
          50%      { box-shadow: 0 0 0 3px rgba(249,115,22,0.55), 0 0 35px rgba(249,115,22,0.25); }
        }
        @keyframes scan-float {
          0%,100% { transform: translateY(0);    }
          50%      { transform: translateY(-2px); }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1);    opacity:1;   }
          14%      { transform: scale(1.25); opacity:0.9; }
          28%      { transform: scale(1);    }
        }
        .navbar-logo-zone { animation: logo-pulse 3s ease-in-out infinite; }
        .heartbeat-icon   { animation: heartbeat 1.8s ease-in-out infinite; }
      `}</style>

      {/* ────────────────── NAVBAR ────────────────── */}
      <Box
        w="full"
        position="sticky"
        top={0}
        zIndex={200}
        bg="rgba(7,10,20,0.94)"
        backdropFilter="blur(28px) saturate(200%)"
        borderBottom="1px solid rgba(249,115,22,0.12)"
        boxShadow="0 4px 60px rgba(0,0,0,0.7)"
      >

        <Flex
          w="full"
          px={{ base: 4, md: 6, xl: 10 }}
          h="70px"
          align="center"
          justify="space-between"
          gap={5}
        >
          {/* ══ 1. LOGO BRAND ZONE ══ */}
          <Box flexShrink={0}>
            <Link to="/">
              <Flex
                className="navbar-logo-zone"
                align="center"
                gap={3}
                px={4}
                py={2}
                borderRadius="14px"
                borderWidth="1.5px"
                borderColor="rgba(249,115,22,0.5)"
                bg="rgba(249,115,22,0.06)"
                position="relative"
                cursor="pointer"
                _hover={{ bg: 'rgba(249,115,22,0.13)', borderColor: 'orange.400' }}
                transition="background 0.3s"
              >
                {/* Color logo — NO filter so brand colors show */}
                <Image
                  src="https://i.postimg.cc/7hV5qrzC/Color-logo-no-background.png"
                  h="26px"
                  alt="Nutrimeter"
                />
                {/* Brand glow divider */}
                <Box w="1px" h="20px" bg="rgba(249,115,22,0.3)" />
                {/* Brand label */}
                <VStack spacing={0} align="start">
                  <Text
                    fontSize="9px"
                    fontWeight="700"
                    color="orange.400"
                    letterSpacing="2px"
                    textTransform="uppercase"
                    lineHeight="1"
                  >
                    Nutrimeter
                  </Text>
                  <Text fontSize="8px" color="whiteAlpha.500" fontWeight="600" letterSpacing="1px">
                    Health OS
                  </Text>
                </VStack>
                {/* PRO badge */}
                <Badge
                  position="absolute"
                  top="-9px"
                  right="-9px"
                  fontSize="7px"
                  fontWeight="900"
                  letterSpacing="0.8px"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  color="white"
                  style={{
                    background: 'linear-gradient(135deg,#F97316,#FBBF24)',
                    boxShadow: '0 2px 10px rgba(249,115,22,0.6)',
                  }}
                >
                  PRO
                </Badge>
              </Flex>
            </Link>
          </Box>

          {/* ══ 2. FLOATING PILL NAV ══ */}
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            align="center"
            gap={1}
            px={2}
            py={2}
            borderRadius="full"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.07)"
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(12px)"
          >
            {NAV_ITEMS.map(({ to, label, icon, key }) => (
              <NavPill
                key={key}
                to={to}
                label={label}
                icon={icon}
                isActive={isActive === key}
                onClick={() => setIsActive(key)}
              />
            ))}
          </Flex>

          {/* ══ 3. RIGHT ZONE ══ */}
          <HStack
            display={{ base: 'none', lg: 'flex' }}
            spacing={3}
            flexShrink={0}
            align="center"
          >
            {/* Live calorie progress widget */}
            <Box
              px={4}
              py={2}
              borderRadius="14px"
              bg="rgba(255,255,255,0.04)"
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.07)"
              minW="130px"
            >
              <Flex align="center" gap={2} mb={1}>
                <Icon
                  as={RiHeartPulseLine}
                  className="heartbeat-icon"
                  color={overBudget ? 'red.400' : 'orange.400'}
                  boxSize="11px"
                />
                <Text
                  fontSize="8px"
                  fontWeight="800"
                  color="whiteAlpha.500"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Today's Intake
                </Text>
              </Flex>
              <Flex align="baseline" gap={1}>
                <Text
                  fontSize="16px"
                  fontWeight="900"
                  color={overBudget ? 'red.400' : 'orange.300'}
                  lineHeight="1"
                  fontFamily="mono"
                >
                  {Math.round(totalCal).toLocaleString()}
                </Text>
                <Text fontSize="9px" color="whiteAlpha.400" fontWeight="700">
                  / {CAL_TARGET.toLocaleString()} kcal
                </Text>
              </Flex>
              {/* Calorie progress bar */}
              <Box mt={1.5} w="full" h="3px" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                <Box
                  h="full"
                  borderRadius="full"
                  style={{
                    width: `${calPct}%`,
                    background: overBudget
                      ? 'linear-gradient(90deg,#F87171,#EF4444)'
                      : 'linear-gradient(90deg,#F97316,#FBBF24)',
                    boxShadow: overBudget
                      ? '0 0 8px rgba(239,68,68,0.7)'
                      : '0 0 8px rgba(249,115,22,0.7)',
                    transition: 'width 0.5s ease',
                  }}
                />
              </Box>
            </Box>

            {/* Live clock */}
            <VStack spacing={0} align="center" px={1}>
              <Icon as={MdAccessTime} color="whiteAlpha.300" boxSize="11px" />
              <Text
                fontSize="13px"
                fontWeight="800"
                color="whiteAlpha.600"
                fontFamily="mono"
                letterSpacing="2px"
              >
                {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text fontSize="8px" color="whiteAlpha.300" fontWeight="600">
                {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Text>
            </VStack>

            <Divider orientation="vertical" h="32px" borderColor="whiteAlpha.100" />

            {/* Logout */}
            <Button
              size="sm"
              leftIcon={<MdLogout style={{ fontSize: '14px' }} />}
              variant="ghost"
              color="whiteAlpha.400"
              fontWeight="600"
              fontSize="12px"
              borderRadius="full"
              px={3}
              _hover={{ color: 'red.400', bg: 'rgba(239,68,68,0.08)' }}
              transition="all 0.2s"
              onClick={() => dispatch(LogOut())}
            >
              Logout
            </Button>
          </HStack>

          {/* Mobile burger */}
          <Box display={{ base: 'block', lg: 'none' }}>
            <GiHamburgerMenu
              cursor="pointer"
              onClick={() => setVisible((p) => !p)}
              fontSize={22}
              color="white"
            />
          </Box>
        </Flex>
      </Box>

      {visible && <AfterLoginSideNav handleVisible={() => setVisible(false)} />}
    </>
  )
}

/* ─── Nav Pill Item ─── */
const NavPill = ({ to, label, icon, isActive, onClick }) => (
  <Link to={to} onClick={onClick}>
    <Flex
      align="center"
      gap={2}
      px="14px"
      py="8px"
      borderRadius="full"
      cursor="pointer"
      position="relative"
      fontSize="12px"
      fontWeight="700"
      letterSpacing="0.3px"
      color={isActive ? 'white' : 'whiteAlpha.500'}
      transition="all 0.25s ease"
      style={
        isActive
          ? {
              background: 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(234,88,12,0.10))',
              border: '1px solid rgba(249,115,22,0.35)',
              boxShadow: '0 2px 16px rgba(249,115,22,0.15), inset 0 1px 0 rgba(249,115,22,0.2)',
            }
          : { border: '1px solid transparent' }
      }
      _hover={
        isActive
          ? {}
          : { color: 'whiteAlpha.800', bg: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.06)' }
      }
    >
      <Icon
        as={icon}
        boxSize="13px"
        color={isActive ? 'orange.400' : 'whiteAlpha.400'}
        transition="color 0.2s"
      />
      {label}
      {/* Active indicator dot */}
      {isActive && (
        <Box
          w="4px"
          h="4px"
          borderRadius="full"
          bg="orange.400"
          style={{ boxShadow: '0 0 6px rgba(249,115,22,1)' }}
        />
      )}
    </Flex>
  </Link>
)

export default AfterLoginPageNavbar
