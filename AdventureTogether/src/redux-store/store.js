import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../methods/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
