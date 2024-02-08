import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdBy: {
    id: "",
    userName: "",
    companyName: "",
    emailAddress: "",
    userImage: "",
  },
  projectID: "",
  questions: [],
  selectedOptions: [],
};

const projectMetaSlice = createSlice({
  name: "PROJECT",
  initialState,
  reducers: {
    SET_PROJECT_META: (state, action) => {
      let projectMetaObj = action.payload;
      for (const key in projectMetaObj) {
        if (Object.hasOwnProperty.call(projectMetaObj, key)) {
          const element = projectMetaObj[key];
          state[key] = element;
        }
      }
    },
    SET_SELECTED_OPTION: (state, action) => {
      let { id, option } = action.payload;
      let selectedOptionIndex = state.selectedOptions.findIndex(
        (option) => option.id === id
      );
      state.selectedOptions[selectedOptionIndex].option = option;
    },
    RESET_PROJECT_META: () => initialState,
  },
});

export default projectMetaSlice.reducer;
export const { SET_PROJECT_META, SET_SELECTED_OPTION, RESET_PROJECT_META } =
  projectMetaSlice.actions;
