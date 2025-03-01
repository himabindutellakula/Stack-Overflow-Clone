import "./index.css";
import { QuestionBodyProps } from "../../../../types/types";

/**
 * The component to display the Question body in the answer page after the header
 * @param param0 the input props needed to render the question body
 * @returns the question body component
 */
const QuestionBody = ({ views, text, askby, meta }: QuestionBodyProps) => {
  return (
    <div id="questionBody" className="questionBody space_between right_padding">
      <div className="answer_question_view">
        <h2>{views} views</h2>
      </div>
      <div className="answer_question_text">
        <p>{text}</p>
      </div>
      <div className="answer_question_right">
        <p className="question_author">{askby}</p>
        <p className="question_meta">asked {meta}</p>
      </div>
    </div>
  );
};

export default QuestionBody;

