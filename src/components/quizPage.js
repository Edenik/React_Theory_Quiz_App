import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import QuestionCard from "./questionCard";
import QuizButtons from "./quizButtons";

const LIMIT = 10;
const API_URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=bf7cb748-f220-474b-a4d5-2d59f93db28d`;

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions();
  }, []);

  function getQuestions() {
    axios(API_URL).then((res) => {
      /* Random questions */
      const arr = [];
      const randomQuestionsArr = [];

      while (arr.length < LIMIT) {
        const r = Math.floor(Math.random() * 100);
        if (arr.indexOf(r) === -1) {
          arr.push(r);
          randomQuestionsArr.push(res.data.result.records[r]);
        }
      }
      /* Random questions */

      setQuestions(randomQuestionsArr);

      setLoading(false);

      /* Set answers arr with null values */
      const answersArr = [];
      for (let index = 0; index < randomQuestionsArr.length; index++) {
        answersArr.push(null);
      }
      setAnswers(answersArr);
      /* Set answers arr with null values */
    });
  }

  function onChangeAnswer(questionIndex, answer, correctAnswer) {
    const answersArr = [...answers];
    answersArr[questionIndex] = { answer, correctAnswer };
    setAnswers(answersArr);
  }

  function onCheckQuiz() {
    let correctCounter = 0;
    let wrongCounter = 0;
    let notAnsweredCounter = 0;

    answers.forEach((answer, index) => {
      if (!answer) {
        document.getElementById(`card:${index}`).style.backgroundColor = "pink";
        notAnsweredCounter++;
      } else if (answer.answer !== answer.correctAnswer) {
        document.getElementById(`card:${index}`).style.backgroundColor = "red";
        wrongCounter++;
      } else {
        document.getElementById(`card:${index}`).style.backgroundColor =
          "green";
        correctCounter++;
      }
    });

    setTimeout(() => {
      alert(
        `המבחן כולל ${LIMIT} שאלות: \n${correctCounter} שאלות נענו נכון \n${wrongCounter} שאלות נענו לא נכון \n${notAnsweredCounter} שאלות לא נענו`
      );
    }, 100);
  }

  const questionList = questions.map((quest, questionIndex) => {
    const question = new DOMParser().parseFromString(
      quest.description4,
      "text/html"
    );

    const options = question.getElementsByTagName("li");
    let image = question.getElementsByTagName("img");
    image[0] ? (image = image[0].outerHTML) : (image = null);
    let correctAnswer;

    for (let index = 0; index <= 3; index++) {
      const element = [].slice.call(options)[index];
      if (element.innerHTML.includes("correct")) {
        correctAnswer = index;
      }
    }

    return (
      <QuestionCard
        key={quest.title2}
        questionIndex={questionIndex}
        title={quest.title2}
        image={image}
        options={options}
        onChange={(e) =>
          onChangeAnswer(questionIndex, e.target.value * 1, correctAnswer)
        }
      ></QuestionCard>
    );
  });

  let quiz = (
    <div style={{ textAlign: "right" }}>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <QuizButtons
          checkQuiz={() => onCheckQuiz()}
          getQuestions={() => getQuestions()}
          scrollText="למטה"
          scrollAxis={document.body.scrollHeight}
        />
      </div>

      {questionList}

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <QuizButtons
          checkQuiz={() => onCheckQuiz()}
          getQuestions={() => getQuestions()}
          scrollText="למעלה"
          scrollAxis="0"
        />
      </div>
    </div>
  );

  if (loading) {
    quiz = (
      <div style={{ textAlign: "center" }}>
        <h1>טוען</h1>
        <Spinner animation="border" />
      </div>
    );
  }

  return <div className="container">{quiz}</div>;
}

export default Quiz;
