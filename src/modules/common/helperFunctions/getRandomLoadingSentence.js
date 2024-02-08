import randomIntFromInterval from "../../../utils/randomIntFromInterval";
import getConfigJSON from "./getConfigJSON";

const getRandomLoadingSentence = async () => {
  let { AI_LOADING_SENTENCES } = await getConfigJSON();
  let randomInt = randomIntFromInterval(0, AI_LOADING_SENTENCES?.length - 1);
  return AI_LOADING_SENTENCES?.[randomInt] || "";
};

export default getRandomLoadingSentence;
