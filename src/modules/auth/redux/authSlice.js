import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authMeta: { username: "", id: 0, status: false },
  authToken: "",
};

const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    SET_AUTH_META: (state, action) => {
      let authObj = action.payload;
      for (const key in authObj) {
        if (Object.hasOwnProperty.call(authObj, key)) {
          const element = authObj[key];
          state[key] = element;
        }
      }
    },
    RESET_AUTH_STATE: () => initialState,
  },
});

export default authSlice.reducer;
export const { SET_AUTH_META, RESET_AUTH_STATE } = authSlice.actions;
