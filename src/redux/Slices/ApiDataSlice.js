import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from '../../baseUrl';


 const fetchItems = createAsyncThunk("api/fetchItems", async () => {
    try {
      const fetchData = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const data = await fetchData.json();
      return data;
    } catch (error) {
      return error;
    }
  });

  const dataSlice = createSlice({
    name: "data",
    initialState: {
      data: [],
      loading: false,
      error: null,
      loaded: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.loaded = true;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default dataSlice.reducer;
  export { fetchItems };
  