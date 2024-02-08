import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const createExternalUser = ({ externalUserMeta, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .post("/user/create", externalUserMeta)
    .then((res) => {
      // showNotification(
      //   "SUCCESS",
      //   `User : ${externalUserMeta.userName} created succesfully!`
      // );
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default createExternalUser;
