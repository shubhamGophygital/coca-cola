import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../common/components/layout/Layout";
import getConfigJSON from "../../../common/helperFunctions/getConfigJSON";
import QuestionBlock from "../../components/QuestionBlock/QuestionBlock";

const QuestionsPage = () => {
  const [questionMeta, setQuestionMeta] = useState({});

  const { question_id = 1 } = useParams();

  useEffect(() => {
    getQuestion(question_id);
  }, [question_id]);

  const getQuestion = async (question_id) => {
    let { QUESTIONS } = await getConfigJSON();
    let selectionOptions = QUESTIONS.map((question) => ({
      id: question.id,
      option: "",
    }));
    console.log("selectionOptions", selectionOptions);
    let questionById = QUESTIONS.find(
      (question) => +question.id === +question_id
    );
    console.log("questionById", questionById);
    setQuestionMeta(questionById);
  };

  return (
    <Layout>
      <QuestionBlock questionMeta={questionMeta} />
    </Layout>
  );
};

export default QuestionsPage;
