import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, actions) => {
      const { loading } = actions.payload;
      state.loading = loading;
    }

  }
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;