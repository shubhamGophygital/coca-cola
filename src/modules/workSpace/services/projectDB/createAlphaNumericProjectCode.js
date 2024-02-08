import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import { store } from "../../../../reduxStore";
import showNotification from "../../../common/helperFunctions/showNotification";

const createAlphaNumericProjectCode = ({ onSuccess, onError }) => {
  const { projectID } = store.getState()?.projectMeta;
  axiosCSPrivateInstance
    .get(`/project/alphanumericCode/${projectID}`)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default createAlphaNumericProjectCode;
