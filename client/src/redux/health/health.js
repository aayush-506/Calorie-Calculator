import axios from 'axios'
import { API_BASE } from '../../config'

// ── Action Types ─────────────────────────────────────────
export const HEALTH_LOADING  = 'health/LOADING'
export const HEALTH_ERROR    = 'health/ERROR'
export const SET_EXERCISE    = 'health/SET_EXERCISE'
export const ADD_EXERCISE    = 'health/ADD_EXERCISE'
export const DEL_EXERCISE    = 'health/DEL_EXERCISE'
export const SET_BIOMETRICS  = 'health/SET_BIOMETRICS'
export const ADD_BIOMETRIC   = 'health/ADD_BIOMETRIC'
export const SET_NOTES       = 'health/SET_NOTES'
export const ADD_NOTE        = 'health/ADD_NOTE'
export const DEL_NOTE        = 'health/DEL_NOTE'

// ── Reducer ──────────────────────────────────────────────
const init = { loading: false, error: null, exercises: [], biometrics: [], notes: [] }

export const healthReducer = (state = init, { type, payload }) => {
    switch (type) {
        case HEALTH_LOADING:  return { ...state, loading: true,  error: null }
        case HEALTH_ERROR:    return { ...state, loading: false, error: payload }
        case SET_EXERCISE:    return { ...state, loading: false, exercises: payload }
        case ADD_EXERCISE:    return { ...state, loading: false, exercises: [payload, ...state.exercises] }
        case DEL_EXERCISE:    return { ...state, exercises: state.exercises.filter(e => e._id !== payload) }
        case SET_BIOMETRICS:  return { ...state, loading: false, biometrics: payload }
        case ADD_BIOMETRIC:   return { ...state, loading: false, biometrics: [payload, ...state.biometrics] }
        case SET_NOTES:       return { ...state, loading: false, notes: payload }
        case ADD_NOTE:        return { ...state, loading: false, notes: [payload, ...state.notes] }
        case DEL_NOTE:        return { ...state, notes: state.notes.filter(n => n._id !== payload) }
        default:              return state
    }
}

// ── Helpers ───────────────────────────────────────────────
const headers = (token) => ({ headers: { token } })

// ── Exercise Actions ──────────────────────────────────────
export const fetchExercises = (token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.get(`${API_BASE}/health/exercise`, headers(token))
        dispatch({ type: SET_EXERCISE, payload: res.data })
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

export const addExercise = (body, token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.post(`${API_BASE}/health/exercise`, body, headers(token))
        dispatch({ type: ADD_EXERCISE, payload: res.data })
        return res.data
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

export const deleteExercise = (id, token) => async (dispatch) => {
    try {
        await axios.delete(`${API_BASE}/health/exercise/${id}`, headers(token))
        dispatch({ type: DEL_EXERCISE, payload: id })
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

// ── Biometric Actions ─────────────────────────────────────
export const fetchBiometrics = (token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.get(`${API_BASE}/health/biometrics`, headers(token))
        dispatch({ type: SET_BIOMETRICS, payload: res.data })
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

export const addBiometric = (body, token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.post(`${API_BASE}/health/biometrics`, body, headers(token))
        dispatch({ type: ADD_BIOMETRIC, payload: res.data })
        return res.data
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

// ── Notes Actions ─────────────────────────────────────────
export const fetchNotes = (token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.get(`${API_BASE}/health/notes`, headers(token))
        dispatch({ type: SET_NOTES, payload: res.data })
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

export const addNote = (body, token) => async (dispatch) => {
    dispatch({ type: HEALTH_LOADING })
    try {
        const res = await axios.post(`${API_BASE}/health/notes`, body, headers(token))
        dispatch({ type: ADD_NOTE, payload: res.data })
        return res.data
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}

export const deleteNote = (id, token) => async (dispatch) => {
    try {
        await axios.delete(`${API_BASE}/health/notes/${id}`, headers(token))
        dispatch({ type: DEL_NOTE, payload: id })
    } catch (e) {
        dispatch({ type: HEALTH_ERROR, payload: e.message })
    }
}
