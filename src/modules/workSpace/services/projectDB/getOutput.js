import axiosCSPrivateInstance from "../../../../axios/axiosCSPrivateInstance";
import getConfigJSON from "../../../common/helperFunctions/getConfigJSON";
import showNotification from "../../../common/helperFunctions/showNotification";

const getOutput = async ({ mp3Url, projectID, onSuccess, onError }) => {
  let { AI_MUSIC_LENGTH } = await getConfigJSON();
  let outputReqestObj = {
    id: projectID,
    aiMusicUrl: `ffmpeg -i "${mp3Url}" -filter_complex " adelay=0|0[CS]; [CS] amix=1" -t ${AI_MUSIC_LENGTH}`,
  };
  axiosCSPrivateInstance
    .post("/project/output", outputReqestObj)
    .then((res) => {
      onSuccess?.(res);
    })
    .catch((err) => {
      console.log("Error while Creating Project", err);
      showNotification("ERROR", "Something went wrong!");
      onError?.();
    });
};

export default getOutput;
