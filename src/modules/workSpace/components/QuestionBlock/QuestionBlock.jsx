import React, { useState } from "react";
import "./QuestionBlock.css";
import { getGenreTagMeta } from "../../helperFunctions/getBrandTagMeta";
import { useNavigate } from "react-router-dom";
import { SET_SELECTED_OPTION } from "../../redux/projectMetaSlice";
import { useDispatch, useSelector } from "react-redux";
import navigationConstants from "../../../../routes/navigationConstants";

const QuestionBlock = ({ questionMeta }) => {
  //   const [selectedOption, setSelectedOption] = useState("");
  const { questions } = useSelector((state) => state.projectMeta);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="QuestionBlock">
      <p className="header">{questionMeta?.question}</p>
      <div className="selection_container_block">
        {questionMeta?.options?.map((data) => (
          <div
            className="selection_container"
            key={data}
            onClick={() => {
              //   if (selectedOption === data) {
              //     setSelectedOption("");
              //   } else {
              //     setSelectedOption(data);
              //   }
              dispatch(
                SET_SELECTED_OPTION({ id: questionMeta.id, option: data })
              );
              if (questions.length < questionMeta.id + 1) {
                navigate(navigationConstants.BRAND_TAGS);
              } else {
                navigate(
                  `${navigationConstants.QUESTION}/${questionMeta.id + 1}`
                );
              }
            }}
          >
            <div
              //   className={`selection_icon_container ${
              //     selectedOption === data
              //       ? "activeSelection"
              //       : "deactiveSelection"
              //   }`}

              className={`selection_icon_container`}
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
    </div>
  );
};

export default QuestionBlock;
