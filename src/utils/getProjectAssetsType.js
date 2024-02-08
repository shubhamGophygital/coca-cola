const getProjectAssetsType = (isVoicesPresent, isAIMusicPresent, videoURL) => {
  let assetsTypeArr = [];
  if (isAIMusicPresent) {
    assetsTypeArr.push("AI Music");
  }
  if (videoURL) {
    assetsTypeArr.push("Video");
  }
  if (isVoicesPresent) {
    assetsTypeArr.push("Voice");
  }
  return assetsTypeArr.length === 0 ? "" : assetsTypeArr.join(" + ");
};

export default getProjectAssetsType;
