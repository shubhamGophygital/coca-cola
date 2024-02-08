import axios from "axios";

const getConfigJSON = async () => {
  let brandName = process.env.REACT_APP_BRANDING;
  let baseURL = document.location.origin;

  try {
    let configMeta = await axios(
      `${baseURL}/branding/${brandName}.json?t=${Date.now()}`
    );
    return configMeta?.data;
  } catch (error) {
    console.log("// error", error);
  }
};

export default getConfigJSON;
