import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isLoading: false,
        darkmode: true
    },
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        setDark: (state) => {
            state.darkmode = true;
        },
        resetDark: (state) => {
            state.darkmode = false;
        },
        toggleDark: (state) => {
            state.darkmode = !state.darkmode;
        }
    }
})

export const { setDark, startLoading, stopLoading, resetDark, toggleDark } = uiSlice.actions;