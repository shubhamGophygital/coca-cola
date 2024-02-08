// Mood asstes
import Fun from "../../../assets/images/Mood_And_Genre/Mood/Fun.png";
import Inspirational from "../../../assets/images/Mood_And_Genre/Mood/Inspirational.png";
import Light from "../../../assets/images/Mood_And_Genre/Mood/Light.png";
import Epic from "../../../assets/images/Mood_And_Genre/Mood/Epic.png";
import Dark from "../../../assets/images/Mood_And_Genre/Mood/Dark.png";

// Genre asstes
import HipHop from "../../../assets/images/Mood_And_Genre/Genre/Hip Hop.png";
import ChillOut from "../../../assets/images/Mood_And_Genre/Genre/Chill out.png";
import Cinematic from "../../../assets/images/Mood_And_Genre/Genre/Cinematic.png";
import Electronic from "../../../assets/images/Mood_And_Genre/Genre/Electronic.png";
import Funk from "../../../assets/images/Mood_And_Genre/Genre/Funk.png";
import House from "../../../assets/images/Mood_And_Genre/Genre/House.png";
import LoFi from "../../../assets/images/Mood_And_Genre/Genre/Lo fi.png";
import Pop from "../../../assets/images/Mood_And_Genre/Genre/Pop.png";
import Rock from "../../../assets/images/Mood_And_Genre/Genre/Rock.png";
import Meditation from "../../../assets/images/Mood_And_Genre/Genre/Meditation.png";
import RAndB from "../../../assets/images/Mood_And_Genre/Genre/R and B.png";
import Default from "../../../assets/images/Mood_And_Genre/Genre/Default config.png";
import wordCapitalizer from "../../../utils/wordCapitalizer";

let genreTags = [
  {
    key: "hip-hop",
    label: "Hip Hop",
    icon: HipHop,
  },
  { key: "electronic", label: "Electronic", icon: Electronic },
  { key: "chill out", label: "Chill out", icon: ChillOut },
  { key: "pop", label: "Pop", icon: Pop },
  { key: "lo fi", label: "Lo fi", icon: LoFi },
  { key: "cinematic_sparse", label: "Cinematic", icon: Cinematic },
  { key: "funk", label: "Funk", icon: Funk },
  { key: "house", label: "House", icon: House },
  { key: "rock", label: "Rock", icon: Rock },
  { key: "r&b", label: "R&B", icon: RAndB },
  { key: "meditation", label: "Meditation", icon: Meditation },
];

export const getGenreTagMeta = (genre) => {
  if (!genre) {
    console.log("genre is not there");
    return;
  }

  return (
    genreTags.find((tag) => tag.key === genre) || {
      label: wordCapitalizer(genre),
      icon: Default,
    }
  );
};

let moodTags = [
  {
    key: "fun",
    label: "Fun",
    icon: Fun,
  },
  { key: "inspirational", label: "Inspirational", icon: Inspirational },
  { key: "light", label: "Light", icon: Light },
  { key: "epic", label: "Epic", icon: Epic },
  { key: "dark", label: "Dark", icon: Dark },
];

export const getMoodTagMeta = (mood) => {
  if (!mood) {
    console.log("mood is not there");
    return;
  }
  return (
    moodTags.find((tag) => tag.key === mood) || {
      label: wordCapitalizer(mood),
      icon: Default,
    }
  );
};
