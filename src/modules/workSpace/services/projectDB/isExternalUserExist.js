import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const isExternalUserExist = ({ email, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .get(`/user/${email}`)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default isExternalUserExist;
