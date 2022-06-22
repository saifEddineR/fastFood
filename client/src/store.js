import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import customizationReducer from './slices/templateSlice';
export default configureStore({
  reducer: { user: userReducer, customization: customizationReducer },
});
