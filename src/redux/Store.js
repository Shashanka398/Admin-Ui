import { configureStore } from "@reduxjs/toolkit";
import ApiDataSlice from "./Slices/ApiDataSlice";
import DeleteSlice from "./Slices/DeleteSlice"


export const store=configureStore({
    reducer:{
        data:ApiDataSlice,
        delete:DeleteSlice

    }      
})