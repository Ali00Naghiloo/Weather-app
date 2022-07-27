import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: "",
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: false
      })
    }
  })
  
  export { store }