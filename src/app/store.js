import { configureStore } from "@reduxjs/toolkit"
import pizzaData from "../features/createSlice"
export const store = configureStore({
    reducer: {
        app :pizzaData
    }
})