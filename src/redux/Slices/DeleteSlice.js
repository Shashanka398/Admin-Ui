import { createSlice } from "@reduxjs/toolkit";

export const deleteSlice=createSlice({
    name:"delete",
    initialState:{
        selectedItem:[]

    },
    reducers:{
        selectCheckItem:(state,action)=>{
            state.selectedItem.push(action.payload);
        }
        ,
        unselectCheckItem:(state,action)=>{
            state.selectedItem = state.selectedItem.filter(item => item !== action.payload);
        }
    }
})

export default deleteSlice.reducer;
export const { selectCheckItem, unselectCheckItem} = deleteSlice.actions;