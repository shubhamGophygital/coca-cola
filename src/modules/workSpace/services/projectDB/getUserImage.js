import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const getUserImage = ({ path, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .get(`/user/getUserImg/${path}`, { responseType: "blob" })
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default getUserImage;
