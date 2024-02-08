import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const saveAvatarImage = ({ avatarFormData, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .post("/user/uploadUserImage?Default=false", avatarFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default saveAvatarImage;
