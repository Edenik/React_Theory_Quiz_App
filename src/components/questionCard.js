import Card from "react-bootstrap/Card";

import React from "react";

function QuestionCard(props) {
  return (
    <Card
      style={{ width: "100%" }}
      key={props.questionIndex}
      id={`card:${props.questionIndex}`}
      className="mt-3  mb-3"
    >
      <Card.Body>
        <Card.Title>שאלה: {props.questionIndex + 1}</Card.Title>
        <Card.Title>{props.title}</Card.Title>

        <div onChange={props.onChange}>
          {[].slice.call(props.options).map((option, index) => {
            return (
              <p key={index}>
                <input
                  type="radio"
                  value={index}
                  name={props.questionIndex}
                  id={`question:${props.questionIndex}answer:${index}`}
                  className="ml-2"
                />
                <label
                  style={{ display: "inline" }}
                  htmlFor={`question:${props.questionIndex}answer:${index}`}
                >
                  {option.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")}
                </label>
              </p>
            );
          })}
        </div>

        <div
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: props.image }}
        ></div>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
