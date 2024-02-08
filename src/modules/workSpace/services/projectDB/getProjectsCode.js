import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const getProjectByCode = ({ code, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .get(`/project/getProjectByAlphanumericCode/${code}`)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default getProjectByCode;
