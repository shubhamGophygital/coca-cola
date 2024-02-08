import React, { useState } from "react";
import "./QuestionBlock.css";
import { getGenreTagMeta } from "../../helperFunctions/getBrandTagMeta";
import { useNavigate } from "react-router-dom";

const QuestionBlock = ({ questionMeta }) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="QuestionBlock">
      <p className="header">{questionMeta?.question}</p>
      <div className="selection_container_block">
        {questionMeta?.options?.map((data) => (
          <div
            className="selection_container"
            key={data}
            onClick={() => {
              if (selectedOption === data) {
                setSelectedOption("");
              } else {
                setSelectedOption(data);
              }
            }}
          >
            <div
              className={`selection_icon_container ${
                selectedOption === data
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
    </div>
  );
};

export default QuestionBlock;
