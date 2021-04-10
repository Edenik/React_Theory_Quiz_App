import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function QuizButtons(props) {
  let scrollIcon = <i class="fas fa-arrow-up ml-2"></i>;
  if (props.scrollText === "למטה") {
    scrollIcon = <i class="fas fa-arrow-down ml-2"></i>;
  }

  return (
    <>
      <Button variant="dark" onClick={props.checkQuiz}>
        <i class="fas fa-clipboard-check ml-2"></i>
        בדוק
      </Button>

      <Button variant="secondary" onClick={props.getQuestions}>
        <i class="fas fa-retweet ml-2"></i>
        החלף שאלות
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          window.scrollTo({
            top: props.scrollAxis,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        {scrollIcon}
        {props.scrollText}
      </Button>

      <Link to="/">
        <Button variant="secondary">
          <i class="fas fa-home ml-2"></i>
          דף הבית
        </Button>
      </Link>
    </>
  );
}

export default QuizButtons;
