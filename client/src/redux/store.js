import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { diaryReducer } from './diary/diary.reducer';
import { authReducer } from "./auth/auth.reducer";
import { healthReducer } from './health/health';

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    diary: diaryReducer,
    health: healthReducer,
})

export const store = createStore(rootReducer, createComposer(applyMiddleware(thunk)))