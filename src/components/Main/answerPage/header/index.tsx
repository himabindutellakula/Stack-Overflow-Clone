import { AnswerHeaderProps } from "../../../../types/types";
import "./index.css";

/**
 * The component that displays the header of the answer page.
 * @param {AnswerHeaderProps} param0 input props for the component
 * @returns the header of the answer page
 */
const AnswerHeader = ({ ansCount, title, handleNewQuestion }: AnswerHeaderProps) => {
    return (
        <div id="answersHeader" className="space_between right_padding answerHeader">
            <h2>{ansCount} answers</h2>
            <h1 className="answer_question_title">{title}</h1>
            {handleNewQuestion && (
                <button className="submit-btn" onClick={handleNewQuestion}>Ask a Question</button>
            )}
        </div>
    ); 
};

export default AnswerHeader;
