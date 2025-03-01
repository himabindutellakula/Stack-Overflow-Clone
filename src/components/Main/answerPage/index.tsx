import { AnswerPageProps } from "../../../types/types";
import "./index.css";
import Answer from "./answer";
import AnswerHeader from "./header";
import QuestionBody from "./questionBody";

/**
 * The container component for the AnswerPage
 * @param {AnswerPageProps} param0 the props for the AnswerPage component
 * the data and the functions to set the pageInstance
 * @returns the AnswerPage component
 */
const AnswerPage = ({ question, ans, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
    return (
        <div className="answer-page">
            <AnswerHeader 
                ansCount={question.getAnswerCount()} 
                title={question.title} 
                handleNewQuestion={handleNewQuestion} 
            />
            <QuestionBody 
                views={question.getQuestionViews()} 
                text={question.text} 
                askby={question.askedBy} 
                meta={question.calculateTimeElapsed()} 
            />
            <div className="answers-section">
                {ans.map((answer, index) => (
                    <Answer key={index} text={answer.text} ansBy={answer.ansBy} meta={answer.calculateTimeElapsed()} />
                ))}
            </div>
            {handleNewAnswer && (
                <button className="ansButton" onClick={handleNewAnswer}>Answer Question</button>
            )}
        </div>
    );
};

export default AnswerPage;
