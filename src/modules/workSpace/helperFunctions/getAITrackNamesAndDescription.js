import { Configuration, OpenAIApi } from "openai";
import { store } from "../../../reduxStore";
import { useConfig } from "../../../customHooks/useConfig";
import getConfigJSON from "../../common/helperFunctions/getConfigJSON";

function getSubstring(str, char1, char2) {
  return str.substring(str.indexOf(char1), str.lastIndexOf(char2) + 1);
}

let apiCallCount = 0;

const getAITrackNamesAndDescription = async (
  trackNamesCount,
  mood,
  genre,
  tempo
) => {
  let { BRAND_NAME } = await getConfigJSON();
  // console.log("getAITrackNamesAndDescription : config", {
  //   trackNamesCount,
  //   mood,
  //   genre,
  //   tempo,
  //   // config,
  // });
  try {
    apiCallCount += 1;
    console.log("apiCallCount", apiCallCount);
    if (apiCallCount > 4) {
      apiCallCount = 0;
      console.warn("too many api calls");
      return null;
    }
    const openAi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
      })
    );
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          // content: `return json array of ${trackNamesCount} objects, each object has 2 properties "name" and "description", "name" key contains track name string which has ${genre} genre,${mood} mood and tempo is ${tempo}, track name should contain 3 words and "description" key as its respective track name's 30 words description. remove extra spaces from that array of object`,
          content: `create json array of ${trackNamesCount} objects, each object has 2 properties "name" and "description", "name" key contains 3 words instrumental track name that sounds ${mood} and ${genre} with a ${tempo} tempo and "description" key contains 75 words description that sounds ${mood} and ${genre} which is ${tempo} tempo and uses the melody from the brand ${BRAND_NAME} as the main melody. remove extra spaces from that array of object.`,
        },
      ],
    });

    const trackNamesStr = getSubstring(
      response?.data?.choices?.[0]?.message?.content
        ?.replace(/\s+/g, " ")
        .trim(),
      "[",
      "]"
    );
    // console.log("response", response?.data?.choices?.[0]?.message?.content);
    const trackNamesResponse = JSON.parse(trackNamesStr);
    console.log("trackNamesResponse", trackNamesResponse);
    apiCallCount = 0;
    return trackNamesResponse;
  } catch (error) {
    console.log("something went wrong with openai ", error);
    return await getAITrackNamesAndDescription(
      trackNamesCount,
      mood,
      genre,
      tempo
    );
  }
};

export default getAITrackNamesAndDescription;
