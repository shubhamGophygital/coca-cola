import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../common/components/layout/Layout";
import getConfigJSON from "../../../common/helperFunctions/getConfigJSON";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROJECT_META } from "../../redux/projectMetaSlice";
import "./QuestionsPage.css";

const QuestionsPage = () => {
  const [questionMeta, setQuestionMeta] = useState({});
  const { questions } = useSelector((state) => state.projectMeta);

  const { question_id = 1 } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getQuestion(question_id);
  }, [question_id]);

  const getQuestion = async (question_id) => {
    let questionsArr = [];
    if (questions?.length === 0) {
      let { QUESTIONS } = await getConfigJSON();
      questionsArr = QUESTIONS;
      let selectionOptions = questionsArr.map((question) => ({
        id: question.id,
        option: "",
      }));
      dispatch(
        SET_PROJECT_META({
          questions: questionsArr,
          selectedOptions: selectionOptions,
        })
      );
    } else {
      questionsArr = questions;
    }

    let questionById = questionsArr.find(
      (question) => +question.id === +question_id
    );
    setQuestionMeta(questionById);
  };

  return (
    <Layout>
      <div className="QuestionsPage_wrapper">
        <div className="QuestionsPage_container">
          <QuestionBlock questionMeta={questionMeta} />
        </div>
      </div>
    </Layout>
  );
};

export default QuestionsPage;
