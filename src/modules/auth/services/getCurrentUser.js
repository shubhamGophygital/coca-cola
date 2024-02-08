import axiosCSPrivateInstance from "../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const getCurrentUser = ({ authToken, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .get(`api/current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(async (response) => {
      onSuccess?.(response);
    })
    .catch(() => {
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default getCurrentUser;
