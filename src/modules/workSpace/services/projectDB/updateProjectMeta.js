import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import showNotification from "../../../common/helperFunctions/showNotification";

const updateProjectMeta = ({ projectID, projectMeta, onSuccess, onError }) => {
  axiosCSPrivateInstance
    .patch(`/project/update/${projectID}`, projectMeta)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default updateProjectMeta;
