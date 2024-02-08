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
  projectName: "",
  projectDescription: "",
  assetsType: "",
  projectDurationInsec: 0,
  cueID: "",
  selectedCSOption: "Voice",
  activeWSTab: "Voice",
  isVideoPlaying: false,
  isVideoLoading: false,
  isThumbnailsLoading: false,
  timelineSeekTime: 0,
  alphanumericCode: "",
  isTimelineOpen: true,
};

const projectMetaSlice = createSlice({
  name: "PROJECT",
  initialState,
  reducers: {
    SET_SELECTED_CS_OPTION: (state, action) => {
      state.selectedCSOption = action.payload;
    },
    SET_PROJECT_META: (state, action) => {
      let projectMetaObj = action.payload;
      for (const key in projectMetaObj) {
        if (Object.hasOwnProperty.call(projectMetaObj, key)) {
          const element = projectMetaObj[key];
          state[key] = element;
        }
      }
    },
    RESET_PROJECT_META: () => initialState,
  },
});

export default projectMetaSlice.reducer;
export const { SET_SELECTED_CS_OPTION, SET_PROJECT_META, RESET_PROJECT_META } =
  projectMetaSlice.actions;
