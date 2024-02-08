import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const getAllProjects = ({ onSuccess, onError }) => {
  axiosCSPrivateInstance
    .get(`/project/getAllProject`)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default getAllProjects;
