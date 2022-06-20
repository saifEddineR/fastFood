import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerNewUser = createAsyncThunk(
  'user/register',
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/v1/users/register', input);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.msg ? error.response.data.msg : error.response.data.errors
      );
    }
  }
);
export const LoginUser = createAsyncThunk(
  'user/LoginUser',
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/v1/users/login', input);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.msg ? error.response.data.msg : error.response.data.errors
      );
    }
  }
);
export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/v1/users', {
        headers: { token: localStorage.getItem('token') },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.msg ? error.response.data.msg : error.response.data.errors
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    token: localStorage.getItem('token') || null,
    isAuth: Boolean(localStorage.getItem('isAuth')) || null,
    errors: null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      state.token = null;
      state.isAuth = false;
      state.userInfo = {};
      state.errors = null;
    },
  },
  extraReducers: {
    [registerNewUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.errors = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('isAuth', true);
      state.userInfo = action.payload.userInfo;
    },
    [registerNewUser.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.errors = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('isAuth', true);
      state.userInfo = action.payload.userInfo;
    },
    [LoginUser.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.errors = null;
    },
    [getUserData.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
