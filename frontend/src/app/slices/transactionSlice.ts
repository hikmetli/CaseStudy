import { createSlice } from "@reduxjs/toolkit";
import type { TransactionParams } from "../models/transaction";

const initialState: TransactionParams = {
    searchTerm: "",
    categories: [],
    orderby: "",
    dateFrom: "",
    dateTo: ""
}

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            console.log(state, action);
            state.categories = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setOrderBy: (state, action) => {
            state.orderby = action.payload;
        },
        setDates: (state, action) => {
            state.dateFrom = action.payload.from ? action.payload.from : "";
            state.dateTo = action.payload.to ? action.payload.to : "";
        },
        resetParams() {
            return initialState;
        }
    }
})

export const { setCategories, setOrderBy, setSearchTerm, setDates, resetParams } = transactionSlice.actions;