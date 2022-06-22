import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'dashboard',
  initialState: {
    borderRadius: 12,
    opened: false,
    fontFamily: "'Roboto', sans-serif",
    isOpen: [],
  },
  reducers: {
    SET_MENU: (state, action) => {
      state.opened = !state.opened;
    },
  },
});
export default userSlice.reducer;
export const { SET_MENU } = userSlice.actions;
