import React from 'react'
import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from '../slice/CommonSlice';
import SuperAdminSlice from '../slice/SuperAdminSlice';





const store = configureStore({
  reducer: {
   
    CommonSlice:CommonSlice.reducer,
    SuperAdminSlice:SuperAdminSlice.reducer

  },
});

export default store;
