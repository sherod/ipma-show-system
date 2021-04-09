import { configureStore } from "@reduxjs/toolkit";

import entriesReducer from "../features/entries/entriesSlice";
import adminReducer from "../features/admin/adminSlice";

export default configureStore({
  reducer: {
    entries: entriesReducer,
    admin: adminReducer,
  },
});
