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
    setLoading(true);
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

      /* Convert Questions objects */
      const questionsArr = randomQuestionsArr.map((quest) => {
        const htmlQuestion = new DOMParser().parseFromString(
          quest.description4,
          "text/html"
        );

        // parse li and img tags from html
        const options = htmlQuestion.getElementsByTagName("li");
        let image = htmlQuestion.getElementsByTagName("img");
        const title = quest.title2;
        image[0] ? (image = image[0].outerHTML) : (image = null);

        // check for correct answer
        let correctAnswer;
        for (let index = 0; index <= 3; index++) {
          const element = [].slice.call(options)[index];
          if (element.innerHTML.includes("correct")) {
            correctAnswer = index;
          }
        }
        return { options, image, title, correctAnswer };
      });
      /* Convert Questions objects */

      setQuestions(questionsArr);

      setLoading(false);

      /* Set answers arr with null values */
      const answersArr = [];
      for (let i = 0; i < questionsArr.length; i++) {
        answersArr.push({
          answer: null,
          correctAnswer: questionsArr[i].correctAnswer,
        });
      }
      setAnswers(answersArr);
      /* Set answers arr with null values */
    });
  }

  function onChangeAnswer(questionIndex, answer, correctAnswer) {
    const answersArr = [...answers];
    answersArr[questionIndex]["answer"] = answer;
    setAnswers(answersArr);
  }

  function onCheckQuiz() {
    let correctCounter = 0;
    let wrongCounter = 0;
    let notAnsweredCounter = 0;

    answers.forEach((answer, index) => {
      if (answer.answer === answer.correctAnswer) {
        document.getElementById(`card:${index}`).style.backgroundColor =
          "greenyellow";
        correctCounter++;
      } else if (!answer.answer) {
        document.getElementById(`card:${index}`).style.backgroundColor = "pink";
        notAnsweredCounter++;
      } else {
        document.getElementById(`card:${index}`).style.backgroundColor = "red";
        wrongCounter++;
      }

      document.getElementById(
        `p-question:${index}answer:${answer.correctAnswer}`
      ).style.backgroundColor = "greenyellow";
    });

    setTimeout(() => {
      alert(
        `?????????? ???????? ${LIMIT} ??????????: \n${correctCounter} ?????????? ???????? ???????? \n${wrongCounter} ?????????? ???????? ???? ???????? \n${notAnsweredCounter} ?????????? ???? ????????`
      );
    }, 100);
  }

  const questionList = questions.map((quest, questionIndex) => {
    return (
      <QuestionCard
        key={quest.title}
        questionIndex={questionIndex}
        title={quest.title}
        image={quest.image}
        options={quest.options}
        onChange={(e) =>
          onChangeAnswer(questionIndex, e.target.value * 1, quest.correctAnswer)
        }
      ></QuestionCard>
    );
  });

  let quiz = (
    <div style={{ textAlign: "center" }}>
      <h1>????????</h1>
      <Spinner animation="border" />
    </div>
  );

  if (!loading) {
    quiz = (
      <div style={{ textAlign: "right" }}>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <QuizButtons
            checkQuiz={() => onCheckQuiz()}
            getQuestions={() => getQuestions()}
            scrollText="????????"
            scrollAxis={document.body.scrollHeight}
          />
        </div>

        {questionList}

        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <QuizButtons
            checkQuiz={() => onCheckQuiz()}
            getQuestions={() => getQuestions()}
            scrollText="??????????"
            scrollAxis="0"
          />
        </div>
      </div>
    );
  }

  return <div className="container">{quiz}</div>;
}

export default Quiz;
