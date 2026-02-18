import { ERROR_STATE, GET_ALL_PRODUCTS, GET_FOOD_PRODUCT_LIST, LOADING_STATE, SUCCESS_STATE } from "./diary.types"

const initialState = {
    loading: false,
    error: false,
    foodItemsInList: [],
    usersAlItems: [],
    allFoodItems: [],
    baseValue: 2200,
}

export const diaryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_FOOD_PRODUCT_LIST: {
            const products = Array.isArray(payload?.products) ? payload.products : []
            const today = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
            const foodItemsInList = products.filter(ele => ele.time === today)
            return {
                ...state,
                foodItemsInList,
                usersAlItems: products,
            }
        }
        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                allFoodItems: payload
            }
        }

        case LOADING_STATE: {
            return {
                ...state,
                loading: true,
            }
        }
        case SUCCESS_STATE: {
            return {
                ...state,
                loading: false,
            }
        }
        case ERROR_STATE: {
            return {
                ...state,
                error: true,
            }
        }

        default:
            return state;
    }
}


