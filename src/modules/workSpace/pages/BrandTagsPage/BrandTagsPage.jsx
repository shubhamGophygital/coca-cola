import React, { useEffect, useState } from "react";
import "./BrandTagsPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenreTagMeta,
  getMoodTagMeta,
} from "../../helperFunctions/getBrandTagMeta";
import CustomButton from "../../../common/components/customButton/CustomButton";
import getConfigJSON from "../../../common/helperFunctions/getConfigJSON";
import CustomLoader from "../../../common/components/customLoader/CustomLoader";
import Layout from "../../../common/components/layout/Layout";

const BrandTagsPage = () => {
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [mood, setMood] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [tempo, setTempo] = useState([]);
  const [selectedTempo, setSelectedTempo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [processStatus, setProcessStatus] = useState(false);

  useEffect(() => {
    getBrandConfigData();
  }, []);

  const getBrandConfigData = async () => {
    let { MOOD_TAGS, GENRE_TAGS, TEMPO } = await getConfigJSON();
    setGenre(GENRE_TAGS);
    setMood(MOOD_TAGS);
    setTempo(TEMPO);
    setLoadingConfig(false);
  };

  if (loadingConfig) {
    return <CustomLoader />;
  }

  return (
    <Layout>
      {processStatus && <CustomLoader />}
      <div className="MG_wrapper">
        <div className="MG_container">
          <p className="header">Choose Genre</p>
          <div className="selection_container_block">
            {genre.map((data) => (
              <div
                className="selection_container"
                key={data}
                onClick={() => {
                  if (selectedGenre === data) {
                    setSelectedGenre("");
                  } else {
                    setSelectedGenre(data);
                  }
                }}
              >
                <div
                  className={`selection_icon_container ${
                    selectedGenre === data
                      ? "activeSelection"
                      : "deactiveSelection"
                  }`}
                >
                  <img
                    className={`selection_icon`}
                    src={getGenreTagMeta(data).icon}
                    alt={data}
                  />
                </div>
                <p className="selection_label">{getGenreTagMeta(data).label}</p>
              </div>
            ))}
          </div>
          <p className="header">Choose Mood</p>
          <div className="selection_container_block">
            {mood.map((data) => (
              <div
                className="selection_container"
                key={data}
                onClick={() => {
                  if (selectedMood === data) {
                    setSelectedMood("");
                  } else {
                    setSelectedMood(data);
                  }
                }}
              >
                <div
                  className={`selection_icon_container ${
                    selectedMood === data
                      ? "activeSelection"
                      : "deactiveSelection"
                  }`}
                >
                  <img
                    className={`selection_icon `}
                    src={getMoodTagMeta(data).icon}
                    alt={data}
                  />
                </div>
                <p className="selection_label">{getMoodTagMeta(data).label}</p>
              </div>
            ))}
          </div>
          <p className="header">Choose Tempo</p>
          <div className="selection_container_block tempo_block">
            {tempo?.map((tempo) => (
              <CustomButton
                key={tempo}
                onClick={() => {
                  if (selectedTempo === tempo) {
                    setSelectedTempo(null);
                  } else {
                    setSelectedTempo(tempo);
                  }
                }}
                className={`tempo_btn ${
                  selectedTempo === tempo ? "selected_tempo" : ""
                }`}
              >
                {tempo}
              </CustomButton>
            ))}
          </div>
          <div className="MG_btn_container">
            <CustomButton
              variant="filled"
              disabled={!(!!selectedGenre && !!selectedMood && !!selectedTempo)}
              onClick={() => {}}
            >
              Next
            </CustomButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandTagsPage;
