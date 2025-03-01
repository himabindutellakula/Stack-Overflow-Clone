import { AnswerProps } from "../../../../types/types";
import "./index.css";

/**
 * The component to display the answer to a question.
 * @param {AnswerProps} param0 the input props for the Answer component.
 * @param text the text of the answer.
 * @param ansBy the person who answered the question.
 * @param meta the answer metadata.
 * @returns Answer component.
 */
const Answer = ({ text, ansBy, meta }: AnswerProps) => {
  return (
    <div className="answer right_padding">
      <div className="answerText">
        <p>{text}</p>
      </div>
      <div className="answerAuthor">
        <p className="answer_author">{ansBy}</p>
        <p className="answer_meta">{meta}</p>
      </div>
    </div>
  );
};


export default Answer;
